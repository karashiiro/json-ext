<div class="tabs">
  <slot />
</div>

<style>
  .tabs {
    display: flex;
    background-color: #0e0e0e;
    border-bottom: 1px solid #38383d;
    height: calc(var(--tabs-height) - 1px /* border */);
  }
</style>
