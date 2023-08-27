<script lang="ts">
  import JSONTree from "svelte-json-tree";
  import { getJSONFileNameFromPath, getObjectMaxDepth } from "../json";

  export let data: unknown;
  export let raw: string;

  let saveContainer: HTMLElement;

  const maxExpandedLevel = getObjectMaxDepth(data);
  const fileName = getJSONFileNameFromPath(document.location.pathname);

  let mode: "json" | "raw" = "json";

  // https://stackoverflow.com/a/18197341
  const download = (node: HTMLElement) => {
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(raw),
    );
    element.setAttribute("download", fileName);

    element.style.display = "none";
    node.appendChild(element);

    element.click();

    node.removeChild(element);
  };

  const copy = () => {
    return navigator.clipboard.writeText(raw);
  };
</script>

<div class="tabs">
  <div class={`tab ${mode === "json" ? "active" : ""}`}>
    <span class="tab-line" />
    <a
      title="JSON"
      class="tab-label"
      on:click={() => (mode = "json")}
      tabindex={0}
      role="tab">JSON</a
    >
  </div>
  <div class={`tab ${mode === "raw" ? "active" : ""}`}>
    <span class="tab-line" />
    <a
      title="Raw Data"
      class="tab-label"
      on:click={() => (mode = "raw")}
      tabindex={1}
      role="tab">Raw Data</a
    >
  </div>
</div>

<div class="toolbar">
  <button class="toolbar-btn" on:click={() => download(saveContainer)}
    >Save</button
  >
  <button class="toolbar-btn" on:click={() => copy()}>Copy</button>
</div>

<div class="json-structured" hidden={mode !== "json"}>
  <JSONTree
    value={data}
    --json-tree-label-color="rgb(117, 191, 255)"
    --json-tree-property-color="rgb(117, 191, 255)"
    --json-tree-string-color="rgb(255, 125, 233)"
    --json-tree-number-color="rgb(134, 222, 116)"
    --json-tree-boolean-color="rgb(134, 222, 116)"
    --json-tree-null-color="rgb(147, 147, 149)"
    --json-tree-li-identation="16px"
    --json-tree-li-line-height="20px"
    --json-tree-font-size="11px"
    --json-tree-font-family="Consolas, monospace"
    defaultExpandedLevel={maxExpandedLevel}
  />
</div>

<div hidden={mode !== "raw"}><pre class="json-raw">{raw}</pre></div>

<div bind:this={saveContainer} />

<style>
  :root {
    --tabs-height: 28px;
    --toolbar-height: 25px;
  }

  .toolbar {
    padding: 1px;
    padding-inline-start: 2px;
    background-color: #18181a;
    height: calc(var(--toolbar-height) - 2px /* padding */ - 1px /* border */);
    border-bottom: 1px solid #38383d;
  }

  .toolbar-btn {
    /* For some reason, setting "color: #b1b1b3" and "background-color: #38383d" causes "appearance" to be set to "none"??? */
    cursor: pointer;
    font-size: 11px;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }

  .tabs {
    display: flex;
    background-color: #0e0e0e;
    border-bottom: 1px solid #38383d;
    height: calc(var(--tabs-height) - 1px /* border */);
  }

  .tab {
    cursor: default;
    position: relative;
    padding-top: 5px;
    padding-bottom: 5px;
  }

  .tab:hover {
    background-color: #232327;
  }

  .tab:not(.active):hover .tab-line {
    background-color: #4f4f52;
    opacity: 1;
    transform: scaleX(1);
  }

  .tab.active .tab-line {
    background-color: #0a84ff;
    opacity: 1;
    transform: scaleX(1);
  }

  .tab-line {
    background-color: transparent;
    position: absolute;
    top: 0;
    width: 100%;
    height: 2px;
    transition:
      transform 250ms cubic-bezier(0.07, 0.95, 0, 1),
      opacity 250ms cubic-bezier(0.07, 0.95, 0, 1);
    opacity: 0;
    transform: scaleX(0);
  }

  .tab-label {
    color: #b1b1b3;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-right: 10px;
    padding-left: 10px;
    line-height: 16px;
    font-size: 12px;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }

  .tab.active .tab-label {
    color: #ffffff;
  }

  .json-structured {
    direction: ltr;
    overflow-y: auto;
    height: calc(100vh - var(--tabs-height) - var(--toolbar-height));
  }

  .json-raw {
    word-wrap: break-word;
    white-space: pre-wrap;
    font-size: 11px;
    font-family: Consolas, monospace;
  }
</style>
