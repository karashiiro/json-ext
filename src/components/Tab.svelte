<script lang="ts">
  export let active: boolean;
  export let label: string;
  export let onClick: () => void;
</script>

<div class={`tab ${active ? "active" : ""}`}>
  <span class="tab-line" />
  <button on:click={onClick} title={label} class="tab-button" role="tab"
    >{label}
  </button>
</div>

<style>
  .tab {
    cursor: default;
    user-select: none;
    position: relative;
  }

  .tab:hover {
    background-color: #232327;
  }

  .tab:not(.active):hover .tab-line {
    background-color: #4f4f52;
    opacity: 1;
    transform: scaleX(1);
  }

  .tab.active .tab-line {
    background-color: #0a84ff;
    opacity: 1;
    transform: scaleX(1);
  }

  .tab-line {
    background-color: transparent;
    position: absolute;
    top: 0;
    width: 100%;
    height: 2px;
    transition:
      transform 250ms cubic-bezier(0.07, 0.95, 0, 1),
      opacity 250ms cubic-bezier(0.07, 0.95, 0, 1);
    opacity: 0;
    transform: scaleX(0);
  }

  .tab-button {
    border: 1px solid transparent;
    background-color: transparent;
    color: #b1b1b3;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-right: 10px;
    padding-left: 10px;
    line-height: 16px;
    font-size: 12px;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }

  .tab.active .tab-button {
    color: #ffffff;
  }
</style>
