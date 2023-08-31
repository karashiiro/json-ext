<script lang="ts">
  import {
    getJSONFileNameFromPath,
    getSortedJSONPaths,
    jsonPathToQuery,
    jsonPathToRowId,
    searchJSONPaths,
  } from "../json";
  import Tabs from "./Tabs.svelte";
  import Tab from "./Tab.svelte";
  import Toolbar from "./Toolbar.svelte";
  import ToolbarButton from "./ToolbarButton.svelte";
  import StructuredJSONViewer from "./StructuredJSONViewer.svelte";
  import RawJSONViewer from "./RawJSONViewer.svelte";
  import SearchBar from "./SearchBar.svelte";
  import Slot from "./Slot.svelte";

  export let data: unknown;
  export let raw: string;

  let saveContainer: HTMLElement;
  let collapsedProperties = new Set<string>();
  let mode: "json" | "raw" = "json";
  let pretty = false;
  let search = "";

  const fileName = getJSONFileNameFromPath(document.location.pathname);

  const allPaths = getSortedJSONPaths(data);

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
    collapsedProperties = new Set(allPaths.map(jsonPathToRowId));
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
  <Slot>
    {@const searchResults = new Set(
      searchJSONPaths(data, search).map(jsonPathToQuery),
    )}
    {@const paths = allPaths.filter((path) =>
      searchResults.has(jsonPathToQuery(path)),
    )}
    <Toolbar>
      <ToolbarButton onClick={() => download(saveContainer)}>Save</ToolbarButton
      >
      <ToolbarButton onClick={copy}>Copy</ToolbarButton>
      <ToolbarButton onClick={collapseAll}>Collapse All</ToolbarButton>
      <ToolbarButton onClick={expandAll}>Expand All</ToolbarButton>
      <div class="separator" />
      <SearchBar bind:value={search} />
    </Toolbar>
    <StructuredJSONViewer value={data} {paths} bind:collapsedProperties /></Slot
  >
</div>

<div hidden={mode !== "raw"}>
  <Toolbar>
    <ToolbarButton onClick={() => download(saveContainer)}>Save</ToolbarButton>
    <ToolbarButton onClick={copy}>Copy</ToolbarButton>
    <ToolbarButton onClick={() => (pretty = !pretty)}
      >Pretty Print</ToolbarButton
    >
  </Toolbar>
  <RawJSONViewer data={raw} {pretty} />
</div>

<div bind:this={saveContainer} />

<style>
  :root {
    --tabs-height: 28px;
    --toolbar-height: 25px;
  }

  .separator {
    border-inline-start: 1px solid #454547;
    height: calc(100% - 8px);
    margin: 4px 1px;
  }
</style>
