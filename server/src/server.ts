import {
	Range,
	SymbolKind,
	HoverParams,
	MarkupKind,
	SignatureHelp,
	TextDocuments,
	InsertTextMode,
	CompletionItem,
	DocumentSymbol,
	InsertTextFormat,
	ProposedFeatures,
	InitializeParams,
	InitializeResult,
	createConnection,
	CancellationToken,
	CompletionItemKind,
	DocumentColorParams,
	SignatureHelpParams,
	DocumentSymbolParams,
	TextDocumentSyncKind,
	ParameterInformation,
	SignatureInformation,
	TextDocumentPositionParams,
	DidChangeConfigurationNotification,
	MarkupContent
} from "vscode-languageserver/node";
import { TextDocument } from "vscode-languageserver-textdocument";

import Token from "./language/Token";
import { steps } from "./language/steps";
import { getTokens } from "./language/parser";
import { predicates } from "./language/predicates";
import GremlinLanguageSettings from "./GremlinLanguageSettings";
import { parameterTypeToSymbolKind } from "./features/SemanticTokens";
import { PredicateMethods, TraversalMethods } from "./language/types";
import { getActiveParameter, getSignatureDescription } from "./language/utilities";

// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.
let connection = createConnection(ProposedFeatures.all);

let documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

let hasConfigurationCapability: boolean = false;
let hasWorkspaceFolderCapability: boolean = false;

connection.onInitialize((params: InitializeParams) => {
	let capabilities = params.capabilities;

	// Does the client support the `workspace/configuration` request?
	// If not, we fall back using global settings.
	hasConfigurationCapability = !!(
		capabilities.workspace && !!capabilities.workspace.configuration
	);

	hasWorkspaceFolderCapability = !!(
		capabilities.workspace && !!capabilities.workspace.workspaceFolders
	);

	const result: InitializeResult = {
		capabilities: {
			textDocumentSync: TextDocumentSyncKind.Incremental,
			completionProvider: {
				resolveProvider: true,
				// triggerCharacters: ["."]
			},
			colorProvider: {
				documentSelector: [{
					scheme: 'file',
					language: 'gremlin'
				}]
			},
			documentSymbolProvider: {
			},
			hoverProvider: {
			},
			signatureHelpProvider: {
				triggerCharacters: ["(", ","],
			}
		}
	};

	if (hasWorkspaceFolderCapability) {
		result.capabilities.workspace = {
			workspaceFolders: {
				supported: true
			}
		};
	}

	return result;
});

connection.onInitialized(() => {
	if (hasConfigurationCapability) {
		// Register for all configuration changes.
		connection.client.register(DidChangeConfigurationNotification.type, undefined);
	}

	if (hasWorkspaceFolderCapability) {
		connection.workspace.onDidChangeWorkspaceFolders(_event => {
			connection.console.log('Workspace folder change event received.');
		});
	}
});

// The global settings, used when the `workspace/configuration` request is not supported by the client.
// Please note that this is not the case when using this server with the client provided in this example
// but could happen with other clients.
const defaultSettings: GremlinLanguageSettings = {};

let globalSettings: GremlinLanguageSettings = defaultSettings;

// Cache the settings of all open documents
let documentTokens: Map<string, Thenable<Token[]>> = new Map();
let documentSettings: Map<string, Thenable<GremlinLanguageSettings>> = new Map();

const getDocumentSettings = (uri: string): Thenable<GremlinLanguageSettings> => {
	if (!hasConfigurationCapability) {
		return Promise.resolve(globalSettings);
	}

	let result = documentSettings.get(uri);

	if (!result) {
		result = connection.workspace.getConfiguration({
			scopeUri: uri,
			section: 'gremlinLanguageServer'
		});

		documentSettings.set(uri, result);
	}

	return result;
}

const getDocumentTokens = (uri: string, cancellationToken: CancellationToken): Thenable<Token[]> => {
	if (!documentTokens.has(uri)) {
		return updateDocumentTokens(uri, cancellationToken);
	}

	return documentTokens.get(uri)!;
};

const updateDocumentTokens = (uri: string, cancellationToken: CancellationToken): Thenable<Token[]> => {
	const result = getTokens(documents.get(uri)!, cancellationToken);

	documentTokens.set(uri, result);

	return result;
};

connection.onDidChangeConfiguration(change => {
	if (hasConfigurationCapability) {
		// Reset all cached document settings
		documentSettings.clear();
	} else {
		globalSettings = <GremlinLanguageSettings>(
			(change.settings.gremlinLanguageServer || defaultSettings)
		);
	}

	// Revalidate all open text documents
	// documents.all().forEach(validateTextDocument);
});

// Only keep settings for open documents
documents.onDidClose(event => {
	documentTokens.delete(event.document.uri);
	documentSettings.delete(event.document.uri);
});

// The content of a text document has changed. This event is emitted
// when the text document first opened or when its content has changed.
documents.onDidChangeContent(async (change) => {
	let textDocument = change.document;

	// In this simple example we get the settings for every validate run.
	let settings = await getDocumentSettings(textDocument.uri);

	await updateDocumentTokens(textDocument.uri, CancellationToken.None);
});

documents.onDidOpen(async (event) => {
	await updateDocumentTokens(event.document.uri, CancellationToken.None);
});

/*connection.onDidChangeWatchedFiles(_change => {
	// Monitored files have change in VSCode
	connection.console.log('We received an file change event');
});*/

// This handler provides the initial list of the completion items.
connection.onCompletion((textDocumentPosition: TextDocumentPositionParams, token: CancellationToken): CompletionItem[] => {
	// The pass parameter contains the position of the text document in
	// which code complete got requested. For the example we ignore this
	// info and always provide the same completion items.
	// const document = documents.get(textDocumentPosition.textDocument.uri);
	// const position = textDocumentPosition.position;

	// TODO: Find the current token and determine what should be suggested

	const suggestions: CompletionItem[] = [];

	Object.keys(steps).forEach((key: string) => {
		const signature = steps[key as TraversalMethods][0];

		suggestions.push({
			data: key,
			label: key,
			kind: CompletionItemKind.Method,
			insertTextMode: InsertTextMode.asIs,
			insertTextFormat: InsertTextFormat.Snippet,
			detail: `(traversal) ${key}(${signature.parameters.map((parameter) => `${parameter.name}${(parameter.multiple ? "[]" : "")}`).join(", ")})`,
			// insertText: `${key}(${signature.parameters.map((parameter, parameterIndex) => `\${${parameterIndex + 1}:${parameter.name}}`).join(", ")}$0)`,
			documentation: {
				kind: "markdown",
				value: signature.description
			}
		} as CompletionItem);
	});

	Object.keys(predicates).forEach((key: string) => {
		const signature = predicates[key as PredicateMethods][0];

		suggestions.push({
			data: key,
			label: key,
			kind: CompletionItemKind.Method,
			insertTextMode: InsertTextMode.asIs,
			insertTextFormat: InsertTextFormat.Snippet,
			detail: `(predicate) ${key}(${signature.parameters.map((parameter) => `${parameter.name}${(parameter.multiple ? "[]" : "")}`).join(", ")})`,
			// insertText: `${key}(${signature.parameters.map((parameter, parameterIndex) => `\${${parameterIndex + 1}:${parameter.name}}`).join(", ")}$0)`,
			documentation: {
				kind: "markdown",
				value: signature.description
			}
		} as CompletionItem);
	});

	return suggestions;
});

connection.onSignatureHelp(async (params: SignatureHelpParams, token: CancellationToken): Promise<SignatureHelp | undefined> => {
	const documentTokens = await getDocumentTokens(params.textDocument.uri, token);
	const document = documents.get(params.textDocument.uri);

	if (!document) {
		return;
	}

	let offset = document.offsetAt(params.position);

	// if (params.context?.triggerKind === SignatureHelpTriggerKind.TriggerCharacter && params.context.triggerCharacter === "(") {}

	let bestMatch: Token | undefined;
	let closestMatch: Token | undefined;

	const searchRecursive = (tokens: Token[]) => {
		tokens.forEach((token: Token) => {
			if (token.range.start <= offset && token.range.end >= offset) {
				bestMatch = token;
			}

			if (token.range.end < offset) {
				closestMatch = token;
			}

			if (Array.isArray(token.arguments)) {
				searchRecursive(token.arguments);
			}

			let next: Token | undefined = token.next;

			while (!!next) {
				searchRecursive([next]);

				next = next.next;
			}
		});
	};

	searchRecursive(documentTokens);

	if (!bestMatch) {
		bestMatch = closestMatch;
	}

	if (!bestMatch) {
		return;
	}

	if (bestMatch.type !== "traversal" && bestMatch.type !== "predicate" && !!bestMatch.parent) {
		bestMatch = bestMatch.parent;
	}

	if (bestMatch.type !== "traversal" && bestMatch.type !== "predicate") {
		return;
	}

	let activeParameter: number | null = null;
	let activeSignature: number | null = bestMatch.signatureIndex || null;

	if (typeof bestMatch.arguments !== "undefined") {
		activeParameter = getActiveParameter(bestMatch, offset);
	}

	if (bestMatch.type === "traversal") {
		return {
			activeParameter,
			activeSignature,
			signatures: steps[bestMatch.label as TraversalMethods].map((signature) => {
				const parameters = signature.parameters.map((parameter) => {
					return ParameterInformation.create(parameter.name, parameter.description);
				});

				return {
					parameters,
					activeParameter,
					label: `${bestMatch!.label}(${signature.parameters.map((parameter) => `${parameter.name}${(parameter.multiple ? "[]" : "")}: ${parameter.type}`).join(", ")})`,
					documentation: {
						kind: "markdown",
						value: getSignatureDescription(signature).value
					} as MarkupContent
				} as SignatureInformation;
			})
		} as SignatureHelp;
	}

	if (bestMatch.type === "predicate") {
		return {
			activeParameter,
			activeSignature,
			signatures: predicates[bestMatch.label as PredicateMethods].map((signature) => {
				const parameters = signature.parameters.map((parameter) => {
					return ParameterInformation.create(parameter.name, parameter.description);
				});

				return {
					parameters,
					activeParameter,
					label: `${bestMatch!.label}(${signature.parameters.map((parameter) => `${parameter.name}${(parameter.multiple ? "[]" : "")}: ${parameter.type}`).join(", ")})`,
					documentation: {
						kind: "markdown",
						value: getSignatureDescription(signature).value
					} as MarkupContent
				} as SignatureInformation;
			})
		} as SignatureHelp;
	}
});

// This handler resolves additional information for the item selected in
// the completion list.
connection.onCompletionResolve((item: CompletionItem, token: CancellationToken): CompletionItem => {
	if (item.data === 1) {
		item.detail = 'TypeScript details';
		item.documentation = 'TypeScript documentation';
	} else if (item.data === 2) {
		item.detail = 'JavaScript details';
		item.documentation = 'JavaScript documentation';
	}

	return item;
});

connection.onHover(async (params: HoverParams, token: CancellationToken) => {
	const documentTokens = await getDocumentTokens(params.textDocument.uri, token);
	const document = documents.get(params.textDocument.uri);

	if (!document) {
		return;
	}

	const offset = document.offsetAt(params.position);

	let bestMatch: Token | undefined;

	const searchRecursive = (tokens: Token[]) => {
		tokens.forEach((token: Token) => {
			if (token.range.start <= offset && token.range.end >= offset) {
				bestMatch = token;
			}

			if (Array.isArray(token.arguments)) {
				searchRecursive(token.arguments);
			}

			let next: Token | undefined = token.next;

			while (!!next) {
				searchRecursive([next]);

				next = next.next;
			}
		});
	};

	searchRecursive(documentTokens);

	if (!bestMatch) {
		return;
	}

	let content = bestMatch.label;

	if (bestMatch.type === "traversal" && typeof bestMatch.signatureIndex === "number") {
		const signature = steps[bestMatch.label as TraversalMethods][bestMatch.signatureIndex];

		let parameterString = "";

		if (signature.parameters.length > 0) {
			parameterString = `
**Parameter**
${signature.parameters.map(parameter => `- ${parameter.name}${(parameter.multiple ? "[]" : "")}${(!!parameter.description) ? ` *${parameter.description}*` : ""}`).join("\n")}

`;
		}

		content = `**${bestMatch.label}**

${signature.description}
${parameterString}
**Returns**\n
${signature.returns}
`;
	}

	if (bestMatch.type === "predicate" && typeof bestMatch.signatureIndex === "number") {
		const signature = predicates[bestMatch.label as PredicateMethods][bestMatch.signatureIndex];

		let parameterString = "";

		if (signature.parameters.length > 0) {
			parameterString = `
**parameter**
${signature.parameters.map(parameter => `- ${parameter.name}${(parameter.multiple ? "[]" : "")}${(!!parameter.description) ? ` *${parameter.description}*` : ""}`).join("\n")}
`;
		}

		content = `**${bestMatch.label}**

${signature.description}
${parameterString}
`;
	}

	return {
		// TODO: Die Docs für die Methode raussuchen
		contents: {
			value: content,
			kind: MarkupKind.Markdown
		},
		range: Range.create(
			document.positionAt(bestMatch.range.start),
			document.positionAt(bestMatch.range.end)
		)
	};
});

connection.onDocumentColor((params: DocumentColorParams, token: CancellationToken) => {
	return null;
});

connection.onDocumentSymbol(async (params: DocumentSymbolParams, token: CancellationToken) => {
	const documentTokens = await getDocumentTokens(params.textDocument.uri, token);

	const results: DocumentSymbol[] = [];

	const document = documents.get(params.textDocument.uri);

	if (!document) {
		return results;
	}

	const addTokens = (tokens: Token[]) => {
		tokens.forEach((token: Token) => {
			const range = Range.create(
				document.positionAt(token.labelRange.start),
				document.positionAt(token.labelRange.end)
			);

			// TODO: Split multiline symbols
			/*const selectionRange = Range.create(
				document.positionAt(token.range.start),
				document.positionAt(token.range.end)
			);*/

			let kind = parameterTypeToSymbolKind(token.type);

			if (token.label === "g") {
				kind = SymbolKind.Module;
			}

			let detail = token.type as string;

			if (token.type === "traversal" || token.type === "predicate") {
				detail = token.body;
			}

			/*if (token.type === "traversal" && typeof token.signatureIndex === "number") {
				const signature = steps[token.label as TraversalMethods][token.signatureIndex];

				detail = `${token.label}(${signature.parameters.map(parameter => `${(parameter.multiple ? "..." : "")}${parameter.name}: ${parameter.type}`).join(", ")})`;
			}

			if (token.type === "predicate" && typeof token.signatureIndex === "number") {
				const signature = predicates[token.label as PredicateMethods][token.signatureIndex];

				detail = `${token.label}(${signature.parameters.map(parameter => `${(parameter.multiple ? "..." : "")}${parameter.name}: ${parameter.type}`).join(", ")})`;
			}*/

			results.push(DocumentSymbol.create(
				token.label || "*empty-value*",
				detail,
				kind,
				range,
				range
			));

			if (Array.isArray(token.arguments)) {
				addTokens(token.arguments);
			}

			let next = token.next;

			while (!!next) {
				addTokens([next]);

				next = next.next;
			}
		});
	};

	addTokens(documentTokens);

	return results;
});

// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

// Listen on the connection
connection.listen();
