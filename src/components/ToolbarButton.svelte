<script lang="ts">
  export let onClick: () => void;
</script>

<button class="toolbar-btn" on:click={onClick}><slot /></button>

<style>
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
</style>
