<script lang="ts">
  export let data: string;
  export let pretty: boolean;
</script>

<div class="json-view">
  <pre class="json-raw" class:pretty>{pretty
      ? JSON.stringify(JSON.parse(data), undefined, 2)
      : data}</pre>
</div>

<style>
  .json-raw {
    word-wrap: break-word;
    white-space: pre-wrap;
    font-size: 11px;
    font-family: Consolas, monospace;
  }

  .json-raw.pretty {
    margin: 8px;
  }

  .json-view {
    direction: ltr;
    overflow-y: auto;
    height: calc(100vh - var(--tabs-height) - var(--toolbar-height));
  }
</style>
