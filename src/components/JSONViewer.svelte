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
  <div class="tab">
    <span class={`tab-line ${mode === "json" ? "active" : ""}`} />
    <a
      title="JSON"
      class="tab-label"
      on:click={() => (mode = "json")}
      tabindex={0}
      role="tab">JSON</a
    >
  </div>
  <div class="tab">
    <span class={`tab-line ${mode === "raw" ? "active" : ""}`} />
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

{#if mode === "json"}
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
{:else}
  <pre class="json-raw">{raw}</pre>
{/if}

<div bind:this={saveContainer} />

<style>
  .toolbar {
    padding: 1px;
    padding-inline-start: 2px;
    background-color: #18181a;
    height: 22px;
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
  }

  .tab {
    cursor: default;
    position: relative;
    padding-top: 6px;
    padding-bottom: 6px;
  }

  .tab:hover {
    background-color: #232327;
  }

  .tab:hover .tab-line:not(.active) {
    background-color: #4f4f52;
  }

  .tab-line {
    position: absolute;
    top: 0;
    width: 100%;
    height: 2px;
  }

  .tab-line.active {
    background-color: #0a84ff;
  }

  .tab-label {
    padding-top: 5px;
    padding-bottom: 5px;
    padding-right: 10px;
    padding-left: 10px;
    line-height: 16px;
    font-size: 12px;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }

  .json-raw {
    word-wrap: break-word;
    white-space: pre-wrap;
    font-size: 11px;
    font-family: Consolas, monospace;
  }
</style>
