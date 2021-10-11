//@ts-check

// This script will be run within the webview itself
// It cannot access the main VS Code APIs directly.
(function () {
	// @ts-ignore
	const vscode = acquireVsCodeApi();

	const historyRoot = document.querySelector("#query-history");

	window.addEventListener("message", function (event) {
		if (event.data.type !== "add-history") {
			return;
		}

		const data = event.data;

		const historyEntry = document.createElement("div");

		historyEntry.innerHTML = `
<div class="text" title="${data.result.query}">
	<div class="title top">
		${data.result.when}
		<span class="description">${data.result.target}</span>
	</div>
	<div class="title spaced">
		<div class="label">
			Request Units:
		</div>
		<div class="value">
			${data.result.requestCharge} (${data.result.totalRequestCharge} total)
		</div>
	</div>
	<div class="title aside spaced">
		<div class="label">
		Time taken:
		</div>
		<div class="value">
		${data.result.serverTimeMilliseconds} ms (${data.result.totalServerTimeMilliseconds} total)
		</div>
	</div>
	<div class="title aside spaced">
		<div class="label">
		Activity Id:
		</div>
		<div class="value">
		${data.result.activityId}
		</div>
	</div>
</div>
<div class="actions">
	<i class="codicon codicon-run"></i>
	<i class="codicon codicon-open-preview"></i>
</div>
`;

		historyEntry.className = "item";

		historyRoot.prepend(historyEntry);

		historyEntry.querySelector(".codicon-run").addEventListener("click", function () {
			vscode.postMessage({
				type: "rerun-query",
				query: data.result.query,
				target: data.result.target
			});
		});

		historyEntry.querySelector(".codicon-open-preview").addEventListener("click", function () {
			vscode.postMessage({
				type: "open-result",
				fileName: data.fileName
			});
		});
	});
})();
