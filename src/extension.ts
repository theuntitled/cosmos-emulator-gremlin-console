import * as path from "path";
import * as vscode from "vscode";

import {
	TransportKind,
	ServerOptions,
	LanguageClient,
	DocumentFilter,
	LanguageClientOptions,
} from 'vscode-languageclient/node';

import { Commands, GremlinResultScheme } from "./constants";

import { CosmosProvider, IElement } from "./CosmosProvider";
import { QueryHistoryProvider } from "./QueryHistoryProvider";
import { ResultDocumentProvider } from "./ResultDocumentProvider";

import { GremlinDocumentSemanticTokensProvider, legend } from './GremlinDocumentSemanticTokensProvider';

let client: LanguageClient;

export function activate(context: vscode.ExtensionContext) {
	// The server is implemented in node
	const serverModule = context.asAbsolutePath(
		path.join('server', 'out', 'server.js')
	);
	// The debug options for the server
	// --inspect=6009: runs the server in Node's Inspector mode so VS Code can attach to the server for debugging
	const debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] };

	// If the extension is launched in debug mode then the debug server options are used
	// Otherwise the run options are used
	const serverOptions: ServerOptions = {
		run: { module: serverModule, transport: TransportKind.ipc },
		debug: {
			module: serverModule,
			transport: TransportKind.ipc,
			options: debugOptions
		}
	};

	const documentSelector: DocumentFilter[] = [{
		scheme: 'file',
		language: 'gremlin'
	}];

	// Options to control the language client
	const clientOptions: LanguageClientOptions = {
		// Register the server for plain text documents
		documentSelector: documentSelector,
		synchronize: {
			// Notify the server about file changes to '.clientrc files contained in the workspace
			fileEvents: vscode.workspace.createFileSystemWatcher('**/.clientrc')
		}
	};

	// Create the language client and start the client.
	client = new LanguageClient(
		"gremlinLanguageServer",
		"Gremlin Language Server",
		serverOptions,
		clientOptions
	);

	// Start the client. This will also launch the server
	client.start();

	vscode.languages.registerDocumentSemanticTokensProvider(documentSelector, new GremlinDocumentSemanticTokensProvider(client), legend);

	const cosmosProvider = new CosmosProvider(context);

	context.subscriptions.push(cosmosProvider);
	context.subscriptions.push(vscode.window.registerTreeDataProvider("cosmosExplorer.Collections", cosmosProvider));

	const queryHistoryProvider = new QueryHistoryProvider(context);

	context.subscriptions.push(queryHistoryProvider);
	context.subscriptions.push(vscode.window.registerWebviewViewProvider("cosmosExplorer.queryHistory", queryHistoryProvider));

	context.subscriptions.push(vscode.commands.registerCommand(Commands.clearHistory, queryHistoryProvider.clear))

	const resultDocumentProvider = new ResultDocumentProvider(context);

	context.subscriptions.push(resultDocumentProvider);
	context.subscriptions.push(vscode.workspace.registerTextDocumentContentProvider(GremlinResultScheme, resultDocumentProvider));

	context.subscriptions.push(vscode.commands.registerCommand(Commands.void, () => { }));

	context.subscriptions.push(vscode.commands.registerCommand(Commands.execute, queryHistoryProvider.executeQuery));

	context.subscriptions.push(vscode.commands.registerCommand(Commands.activateCollection, async (element: IElement) => {
		await cosmosProvider.activateCollection(element);
		
		await queryHistoryProvider.connect(element.path);
	}));
}

export function deactivate() {
	client?.stop();
}
