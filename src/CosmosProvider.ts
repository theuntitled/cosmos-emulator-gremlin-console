import * as path from "path";
import * as https from "https";
import * as vscode from "vscode";

import { ContainerDefinition, CosmosClient, DatabaseDefinition, Resource } from "@azure/cosmos";

import { ActiveCollectionKey, CosmosDbEmulatorEndpoint, CosmosDbEmulatorPrimaryKey } from "./constants";

type ElementType = "collection" | "database";

export interface IElement {
	name: string;
	path: string;
	type: ElementType;
}

export class CosmosProvider implements vscode.TreeDataProvider<IElement>, vscode.Disposable {

	private _activeItem: string;
	private _client: CosmosClient;
	private _globalState: vscode.Memento;
	private _cache: Record<string, { database: IElement, collections: string[] }>;
	private _changeEventEmitter: vscode.EventEmitter<IElement>;

	constructor(globalState: vscode.Memento) {
		this._client = new CosmosClient({
			agent: new https.Agent({
				rejectUnauthorized: false
			}),
			key: CosmosDbEmulatorPrimaryKey,
			endpoint: CosmosDbEmulatorEndpoint
		});;

		this._globalState = globalState;

		this._cache = {};

		this._changeEventEmitter = new vscode.EventEmitter<IElement>();

		this.onDidChangeTreeData = this._changeEventEmitter.event;

		this._activeItem = this._globalState.get(ActiveCollectionKey, "");
	}
	
	public onDidChangeTreeData: vscode.Event<IElement>;

	public getTreeItem(element: IElement): vscode.TreeItem | Thenable<vscode.TreeItem> {
		const treeItem = new vscode.TreeItem(element.name, element.type === "database" ? vscode.TreeItemCollapsibleState.Expanded : vscode.TreeItemCollapsibleState.None);

		treeItem.tooltip = element.path;

		if (element.type === "collection") {
			if (this._activeItem !== element.path) {
				treeItem.contextValue = "collection";
			} else {
				treeItem.description = "connected";
				treeItem.contextValue = "active-collection";
			}

			treeItem.iconPath = {
				dark: path.join(__filename, "..", "..", "resources", "dark", "tree-collection.svg"),
				light: path.join(__filename, "..", "..", "resources", "light", "tree-collection.svg")
			};
		} else {
			treeItem.iconPath = {
				dark: path.join(__filename, "..", "..", "resources", "Azure-Cosmos-DB.svg"),
				light: path.join(__filename, "..", "..", "resources", "Azure-Cosmos-DB.svg")
			};
		}

		return treeItem;
	}

	public getChildren(element?: IElement): vscode.ProviderResult<IElement[]> {
		if (!element) {
			return this.loadDatabases();
		}

		if (element.type === "database") {
			return this.loadContainers(element);
		}

		return [];
	}

	public getParent(element: IElement): vscode.ProviderResult<IElement> {
		const parentKey = Object.keys(this._cache).find((key: string) => {
			return this._cache[key].collections.includes(element.path);
		});

		if (!!parentKey) {
			return this._cache[parentKey].database;
		}

		return null;
	}

	public async activateCollection(element: IElement) {
		const nextActiveParent = this.findCollectionParentKey(element.path);
		const currentActiveParent = this.findCollectionParentKey(this._activeItem);

		this._activeItem = element.path;

		await this._globalState.update(ActiveCollectionKey, element.path);

		vscode.window.setStatusBarMessage(`Switched gremlin query target to: ${element.path}`, 5000);

		this.refreshDatabase(currentActiveParent);

		if (nextActiveParent !== currentActiveParent) {
			this.refreshDatabase(nextActiveParent);
		}
	}

	public dispose() {
		this._client.dispose();
		this,this._changeEventEmitter.dispose();
	}

	private refreshDatabase(key: string | undefined) {
		const database = this._cache[key || ""]?.database;

		if (!!database) {
			this._changeEventEmitter.fire(database);
		}
	}

	private findCollectionParentKey(collectionPath: string): string | undefined {
		return Object.keys(this._cache).find((key: string) => {
			return this._cache[key].collections.includes(collectionPath);
		});
	}

	private async loadDatabases(): Promise<IElement[]> {
		var query = this._client.databases.readAll();

		try {
			const databases = await query.fetchAll();

			const results: IElement[] = [];

			databases.resources.forEach((resource: DatabaseDefinition & Resource) => {
				const database: IElement = {
					type: "database",
					name: resource.id,
					path: `/dbs/${resource.id}`
				};

				this._cache[resource.id] = {
					database,
					collections: []
				};

				results.push(database);
			});

			return results;
		} catch (exception: Error | any) {
			vscode.window.showErrorMessage(exception.message);
		}

		return [];
	}

	private async loadContainers(element: IElement): Promise<IElement[]> {
		var query = this._client.database(element.name).containers.readAll();

		try {
			const containers = await query.fetchAll();

			var results: IElement[] = [];

			containers.resources.forEach((resource: ContainerDefinition & Resource) => {
				const path = `${element.path}/colls/${resource.id}`;

				this._cache[element.name].collections.push(path);

				results.push({
					path,
					name: resource.id,
					type: "collection"
				});
			});

			return results;
		} catch (exception: Error | any) {
			vscode.window.showErrorMessage(exception.message);
		}

		return [];
	}

}
