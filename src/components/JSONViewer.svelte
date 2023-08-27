<script lang="ts">
  import JSONTree from "svelte-json-tree";
  import { getObjectMaxDepth } from "../json";

  export let data: unknown;

  const maxExpandedLevel = getObjectMaxDepth(data);
</script>

<div>
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
