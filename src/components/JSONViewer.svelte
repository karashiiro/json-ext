<script lang="ts">
  import { getJSONFileNameFromPath, getObjectMaxDepth } from "../json";
  import Tabs from "./Tabs.svelte";
  import Tab from "./Tab.svelte";
  import Toolbar from "./Toolbar.svelte";
  import ToolbarButton from "./ToolbarButton.svelte";
  import StructuredJSONViewer from "./StructuredJSONViewer.svelte";
  import RawJSONViewer from "./RawJSONViewer.svelte";

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

<Toolbar>
  <ToolbarButton onClick={() => download(saveContainer)}>Save</ToolbarButton>
  <ToolbarButton onClick={copy}>Copy</ToolbarButton>
</Toolbar>

<div hidden={mode !== "json"}>
  <StructuredJSONViewer value={data} defaultExpandedLevel={maxExpandedLevel} />
</div>

<div hidden={mode !== "raw"}><RawJSONViewer data={raw} /></div>

<div bind:this={saveContainer} />

<style>
  :root {
    --tabs-height: 28px;
    --toolbar-height: 25px;
  }
</style>
