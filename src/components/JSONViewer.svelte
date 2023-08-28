<script lang="ts">
  import JSONTree from "svelte-json-tree";
  import { getJSONFileNameFromPath, getObjectMaxDepth } from "../json";
  import Tabs from "./Tabs.svelte";
  import Tab from "./Tab.svelte";

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

<Tabs>
  <Tab
    label="JSON"
    active={mode === "json"}
    tabIndex={0}
    onClick={() => (mode = "json")}
  />
  <Tab
    label="Raw Data"
    active={mode === "raw"}
    tabIndex={1}
    onClick={() => (mode = "raw")}
  />
</Tabs>

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
    display: flex;
    padding: 1px;
    padding-inline-start: 2px;
    background-color: #18181a;
    height: calc(var(--toolbar-height) - 2px /* padding */ - 1px /* border */);
    border-bottom: 1px solid #38383d;
  }

  .toolbar-btn {
    height: 22px;
    margin-inline-start: 5px;
    padding: 0 3px;
    cursor: pointer;
    user-select: none;
    color: #b1b1b3;
    background-color: #38383d;
    border: none;
    border-radius: 2px;
    font-size: 11px;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
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
