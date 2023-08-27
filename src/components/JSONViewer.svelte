<script lang="ts">
  import JSONTree from "svelte-json-tree";
  import { getJSONFileNameFromPath, getObjectMaxDepth } from "../json";

  export let data: unknown;
  export let raw: string;

  let saveContainer: HTMLElement;

  const maxExpandedLevel = getObjectMaxDepth(data);
  const fileName = getJSONFileNameFromPath(document.location.pathname);

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

<div>
  <div class="controls">
    <button on:click={() => download(saveContainer)}>Save</button>
    <button on:click={() => copy()}>Copy</button>
  </div>

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

<div bind:this={saveContainer} />

<style>
  .controls {
    width: 100%;
    padding-top: 8px;
    padding-bottom: 8px;
  }
</style>
