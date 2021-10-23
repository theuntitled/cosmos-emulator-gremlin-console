import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";
import { ActiveCollectionKey, Commands, CosmosDbEmulatorPrimaryKey, GremlinResultScheme } from "./constants";

const Gremlin = require("gremlin");

import { IElement } from "./CosmosProvider";
import { IExecutionResult, IHistoryMessage } from "./QueryHistoryProvider.models";

export class QueryHistoryProvider implements vscode.WebviewViewProvider, vscode.Disposable {

	private _client: any = null;

	private _storageUri: vscode.Uri;
	private _extensionUri: vscode.Uri;
	private _globalState: vscode.Memento;

	private _view?: vscode.WebviewView;

	constructor(context: vscode.ExtensionContext) {
		this._globalState = context.globalState;
		this._storageUri = context.storageUri || context.globalStorageUri;

		this._extensionUri = context.extensionUri;

		this.clear = this.clear.bind(this);
		this.executeQuery = this.executeQuery.bind(this);
	}

	resolveWebviewView(webviewView: vscode.WebviewView, _context: vscode.WebviewViewResolveContext, _token: vscode.CancellationToken): void | Thenable<void> {
		this._view = webviewView;

		webviewView.webview.options = {
			enableScripts: true,
			localResourceRoots: [
				this._extensionUri
			]
		};

		webviewView.show(true);

		webviewView.webview.html = this.getHtml(webviewView.webview);

		webviewView.webview.onDidReceiveMessage(this.receiveMessage.bind(this));

		webviewView.onDidChangeVisibility(() => {
			if (!webviewView.visible) {
				return;
			}

			this.populateHistory();
		});

		this.populateHistory();

		const initialCollection = this.getCurrentCollection();

		if (!!initialCollection) {
			this.connect(initialCollection);
		}
	}

	public async executeQuery(element: IElement) {
		const selection = vscode.window.activeTextEditor?.selection;

		const queryText = vscode.window.activeTextEditor?.document.getText(!selection?.isEmpty ? selection : undefined)?.trim();

		if (!queryText) {
			vscode.window.showWarningMessage("No query text found");

			return;
		}

		return await this.executeQueryText(element?.path || this.getCurrentCollection(), queryText);
	}

	public async executeQueryText(target: string, queryText: string) {
		if (!this._client) {
			await this.connect(target);
		}

		if (!this._client) {
			vscode.window.showWarningMessage("No query target selected, please select a collection to run the query on.");

			return;
		}

		const when = new Date();

		const fileName = [
			"gremlin-result",
			when.getFullYear().toFixed(0),
			(when.getMonth() + 1).toFixed(0).padStart(2, "0"),
			when.getDate().toFixed(0).padStart(2, "0"),
			when.getHours().toFixed(0).padStart(2, "0"),
			when.getMinutes().toFixed(0).padStart(2, "0"),
			when.getSeconds().toFixed(0).padStart(2, "0"),
			when.getMilliseconds().toFixed(0).padStart(3, "0")
		].join("-") + ".json";

		try {
			const result = await this._client.submit(queryText);

			const executionResult: IExecutionResult = {
				when: [
					[
						when.getFullYear().toFixed(0),
						(when.getMonth() + 1).toFixed(0).padStart(2, "0"),
						when.getDate().toFixed(0).padStart(2, "0"),
					].join("."),
					[
						when.getHours().toFixed(0).padStart(2, "0"),
						when.getMinutes().toFixed(0).padStart(2, "0"),
						`${when.getSeconds().toFixed(0).padStart(2, "0")}.${when.getMilliseconds().toFixed(0).padStart(3, "0")}`,
					].join(":")
				].join(" - "),

				target: target,

				activityId: result.attributes["x-ms-activity-id"],
				statusCode: result.attributes["x-ms-status-code"],

				requestCharge: result.attributes["x-ms-request-charge"],
				totalRequestCharge: result.attributes["x-ms-total-request-charge"],

				serverTimeMilliseconds: result.attributes["x-ms-server-time-ms"],
				totalServerTimeMilliseconds: result.attributes["x-ms-total-server-time-ms"],

				query: queryText,

				items: result._items
			};

			vscode.window.setStatusBarMessage(`Total RUs used: ${executionResult.totalRequestCharge}`, 4000);

			await this.addToHistory(executionResult, fileName, true);
		} catch (exception: Error | any) {
			vscode.window.showErrorMessage(exception.message);
		}
	}

	public async addToHistory(result: IExecutionResult, fileName: string, openFile: boolean) {
		if (!fs.existsSync(this._storageUri.fsPath)) {
			fs.mkdirSync(this._storageUri.fsPath);
		}

		fs.writeFileSync(path.join(this._storageUri.fsPath, fileName), JSON.stringify(result, null, "\t"));

		await this._view?.webview.postMessage({
			result,
			fileName,
			type: "add-history"
		} as IHistoryMessage);

		if (openFile) {
			await this.openResult(fileName);
		}
	}

	public async clear() {
		if (!fs.existsSync(this._storageUri.fsPath)) {
			fs.mkdirSync(this._storageUri.fsPath);
		}
		
		const fileList = fs.readdirSync(this._storageUri.fsPath);

		fileList.sort().forEach((fileName: string) => {
			if (!fileName.startsWith("gremlin-")) {
				return;
			}

			fs.rmSync(path.join(this._storageUri.fsPath, fileName));

			this._view?.webview.postMessage({
				fileName,
				type: "remove-history"
			} as IHistoryMessage);
		});
	}

	public async connect(collectionUri: string) {
		this._client?.close();

		const authenticator = new Gremlin.driver.auth.PlainTextSaslAuthenticator(collectionUri, CosmosDbEmulatorPrimaryKey);

		this._client = new Gremlin.driver.Client(
			"ws://localhost:8901",
			{
				authenticator,
				traversalsource: "g",
				rejectUnauthorized: true,
				mimeType: "application/vnd.gremlin-v2.0+json"
			}
		);

		try {
			await this._client.open();
		} catch (exception: Error | any) {
			vscode.window.showErrorMessage(exception.message);
		}
	}

	public dispose() {
		this._client?.close();
	}

	private populateHistory() {
		try {
			if (!fs.existsSync(this._storageUri.fsPath)) {
				fs.mkdirSync(this._storageUri.fsPath);
			}

			const fileList = fs.readdirSync(this._storageUri.fsPath);

			fileList.sort().forEach((fileName: string) => {
				if (!fileName.startsWith("gremlin-")) {
					return;
				}

				const fullName = path.join(this._storageUri.fsPath, fileName);

				const content = fs.readFileSync(fullName, { encoding: "utf8" });

				this.addToHistory(JSON.parse(content), fileName, false);
			});
		} catch (exception: Error | any) {
			vscode.window.showErrorMessage(exception.message);
		}
	}

	private async receiveMessage(message: IHistoryMessage) {
		if (message.type === "open-result" && !!message.fileName) {
			await this.openResult(message.fileName);
		}

		if (message.type === "rerun-query" && !!message.target && !!message.query) {
			this.executeQueryText(message.target, message.query);
		}
	}

	private getHtml(webview: vscode.Webview): string {
		const nonce = getNonce();

		const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "resources", "history.css"));
		const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "resources", "history.js"));
		const codiconsUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "node_modules", "@vscode", "codicons", "dist", "codicon.css"));

		return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; font-src ${webview.cspSource}; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<link href="${styleUri}" rel="stylesheet">
				<link href="${codiconsUri}" rel="stylesheet">
				<title>Query History</title>
			</head>
			<body>
				<div id="query-history"></div>
				<script nonce="${nonce}" src="${scriptUri}"></script>
			</body>
			</html>`;
	}

	private getCurrentCollection() {
		return this._globalState.get(ActiveCollectionKey, "");
	}

	private async openResult(fileName: string) {
		const uri = vscode.Uri.parse(`${GremlinResultScheme}:${fileName}`);

		const textDocument = await vscode.workspace.openTextDocument(uri);

		await vscode.window.showTextDocument(textDocument, { preview: false, viewColumn: vscode.ViewColumn.Two });
	}

}

function getNonce() {
	let text = "";

	const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (let i = 0; i < 32; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}

	return text;
}