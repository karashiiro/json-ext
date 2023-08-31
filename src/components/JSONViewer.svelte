<script lang="ts">
  import {
    getJSONFileNameFromPath,
    getSortedJSONPaths,
    jsonPathToRowId,
  } from "../json";
  import Tabs from "./Tabs.svelte";
  import Tab from "./Tab.svelte";
  import Toolbar from "./Toolbar.svelte";
  import ToolbarButton from "./ToolbarButton.svelte";
  import StructuredJSONViewer from "./StructuredJSONViewer.svelte";
  import RawJSONViewer from "./RawJSONViewer.svelte";

  export let data: unknown;
  export let raw: string;

  let saveContainer: HTMLElement;
  let collapsedProperties = new Set<string>();
  let mode: "json" | "raw" = "json";

  const fileName = getJSONFileNameFromPath(document.location.pathname);

  const paths = getSortedJSONPaths(data);

  console.log(paths);

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

  const expandAll = () => {
    collapsedProperties = new Set();
  };

  const collapseAll = () => {
    collapsedProperties = new Set(paths.map(jsonPathToRowId));
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

<div hidden={mode !== "json"}>
  <Toolbar>
    <ToolbarButton onClick={() => download(saveContainer)}>Save</ToolbarButton>
    <ToolbarButton onClick={copy}>Copy</ToolbarButton>
    <ToolbarButton onClick={collapseAll}>Collapse All</ToolbarButton>
    <ToolbarButton onClick={expandAll}>Expand All</ToolbarButton>
  </Toolbar>
  <StructuredJSONViewer value={data} {paths} bind:collapsedProperties />
</div>

<div hidden={mode !== "raw"}>
  <Toolbar>
    <ToolbarButton onClick={() => download(saveContainer)}>Save</ToolbarButton>
    <ToolbarButton onClick={copy}>Copy</ToolbarButton>
  </Toolbar>
  <RawJSONViewer data={raw} />
</div>

<div bind:this={saveContainer} />

<style>
  :root {
    --tabs-height: 28px;
    --toolbar-height: 25px;
  }
</style>
