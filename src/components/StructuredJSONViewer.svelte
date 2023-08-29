<script lang="ts">
  import JSONTable from "./JSONTable.svelte";

  export let value: unknown;
</script>

<div class="json-structured">
  <JSONTable {value} />
</div>

<style>
  .json-structured {
    direction: ltr;
    overflow-y: auto;
    height: calc(100vh - var(--tabs-height) - var(--toolbar-height));
  }
</style>
