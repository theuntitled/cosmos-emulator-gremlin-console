import {
	TextDocument,
	SemanticTokens,
	DocumentSymbol,
	CancellationToken,
	SymbolInformation,
	SemanticTokensLegend,
	SemanticTokensBuilder,
	DocumentSymbolProvider,
	DocumentSemanticTokensProvider
} from "vscode";

import { SemanticTokenTypes } from "vscode-languageserver-protocol";
import { DynamicFeature, LanguageClient, TextDocumentProviderFeature, TextDocumentRegistrationOptions } from "vscode-languageclient/node";

export class GremlinDocumentSemanticTokensProvider implements DocumentSemanticTokensProvider {

	private readonly _client: LanguageClient;
	private readonly _documentSymbolFeature: DynamicFeature<TextDocumentRegistrationOptions> & TextDocumentProviderFeature<DocumentSymbolProvider>;

	constructor(client: LanguageClient) {
		this._client = client;

		this._documentSymbolFeature = this._client.getFeature("textDocument/documentSymbol");
	}

	async provideDocumentSemanticTokens(document: TextDocument, token: CancellationToken): Promise<SemanticTokens> {
		const builder = new SemanticTokensBuilder(legend);

		var provider = this._documentSymbolFeature.getProvider(document);

		if (!provider) {
			return builder.build();
		}

		try {
			var symbols = await provider.provideDocumentSymbols(document, token) as (SymbolInformation & DocumentSymbol)[];

			if (!symbols) {
				return builder.build();
			}

			symbols.forEach((symbol: SymbolInformation & DocumentSymbol) => {
				if (!symbol.range.isSingleLine) {
					return;
				}

				try {
					builder.push(symbol.range, tokenTypes[symbol.kind], ["declaration"]);
				} catch (ei) {
					console.log(ei);
				}
			});
		} catch (e) {
			console.log(e);
		}

		return builder.build();
	}

}

enum DefaultTokenType {
	comment = 21,
	string = 15,
	keyword = 20,
	number = 16,
	regexp = 23,
	operator = 25,
	namespace = 3,
	type = 26,
	struct = 23,
	class = 5,
	interface = 11,
	enum = 10,
	enumMember = 22,
	typeParameter = 26,
	function = 12,
	macro = 23,
	variable = 13,
	parameter = 7,
	property = 7,
}

enum DefaultTokenModifier {
	declaration,
	static,
	abstract,
	deprecated,
	modification,
	async,
	readonly,
}

const tokenTypes: string[] = [];
tokenTypes[1] = SemanticTokenTypes.string;
tokenTypes[2] = SemanticTokenTypes.string;
tokenTypes[3] = SemanticTokenTypes.namespace;
tokenTypes[4] = SemanticTokenTypes.namespace;
tokenTypes[5] = SemanticTokenTypes.class;
tokenTypes[6] = SemanticTokenTypes.method;
tokenTypes[7] = SemanticTokenTypes.property;
tokenTypes[8] = SemanticTokenTypes.keyword;
tokenTypes[9] = SemanticTokenTypes.class;
tokenTypes[10] = SemanticTokenTypes.enum;
tokenTypes[11] = SemanticTokenTypes.interface;
tokenTypes[12] = SemanticTokenTypes.function;
tokenTypes[13] = SemanticTokenTypes.variable;
tokenTypes[14] = SemanticTokenTypes.keyword;
tokenTypes[15] = SemanticTokenTypes.string;
tokenTypes[16] = SemanticTokenTypes.number;
tokenTypes[17] = SemanticTokenTypes.keyword;
tokenTypes[18] = SemanticTokenTypes.struct;
tokenTypes[19] = SemanticTokenTypes.struct;
tokenTypes[20] = SemanticTokenTypes.keyword;
tokenTypes[21] = SemanticTokenTypes.keyword;
tokenTypes[22] = SemanticTokenTypes.enumMember;
tokenTypes[23] = SemanticTokenTypes.struct;
tokenTypes[24] = SemanticTokenTypes.macro;
tokenTypes[25] = SemanticTokenTypes.operator;
tokenTypes[26] = SemanticTokenTypes.typeParameter;

const tokenModifiers: string[] = [];
tokenModifiers[DefaultTokenModifier.declaration] = "declaration";
tokenModifiers[DefaultTokenModifier.static] = "static";
tokenModifiers[DefaultTokenModifier.abstract] = "abstract";
tokenModifiers[DefaultTokenModifier.deprecated] = "deprecated";
tokenModifiers[DefaultTokenModifier.modification] = "modification";
tokenModifiers[DefaultTokenModifier.async] = "async";
tokenModifiers[DefaultTokenModifier.readonly] = "readonly";

export const legend = new SemanticTokensLegend(tokenTypes, tokenModifiers);
