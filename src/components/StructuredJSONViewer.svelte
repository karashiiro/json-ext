<script lang="ts">
  import JSONTree from "svelte-json-tree";

  export let value: unknown;
  export let defaultExpandedLevel: number;
</script>

<div class="json-structured">
  <JSONTree
    {value}
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
    {defaultExpandedLevel}
  />
</div>

<style>
  .json-structured {
    direction: ltr;
    overflow-y: auto;
    height: calc(100vh - var(--tabs-height) - var(--toolbar-height));
  }
</style>
