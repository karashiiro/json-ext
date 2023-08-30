<script lang="ts">
  import * as jp from "jsonpath";
  import JSONTable from "./JSONTable.svelte";

  export let value: unknown;
  export let paths: jp.PathComponent[][];
  export let collapsedProperties: Set<string>;
</script>

<div class="json-structured">
  <JSONTable {value} {paths} bind:collapsedProperties />
</div>

<style>
  .json-structured {
    direction: ltr;
    overflow-y: auto;
    height: calc(100vh - var(--tabs-height) - var(--toolbar-height));
  }
</style>
