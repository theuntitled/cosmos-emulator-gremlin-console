import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

export class ResultDocumentProvider implements vscode.TextDocumentContentProvider, vscode.Disposable {

    private _storageUri: vscode.Uri;
    private _onDidChangeEmitter: vscode.EventEmitter<vscode.Uri>;

    constructor(context: vscode.ExtensionContext) {
        this._storageUri = context.storageUri || context.globalStorageUri;

        this._onDidChangeEmitter = new vscode.EventEmitter<vscode.Uri>();

        this.onDidChange = this._onDidChangeEmitter.event;
    }

    onDidChange?: vscode.Event<vscode.Uri> | undefined;

    provideTextDocumentContent(uri: vscode.Uri, _token: vscode.CancellationToken): vscode.ProviderResult<string> {
        const fullPath = path.join(this._storageUri.fsPath, uri.path);

        return fs.readFileSync(fullPath, { encoding: "utf8" });
    }

    dispose() {
        this._onDidChangeEmitter.dispose();
    }

}
