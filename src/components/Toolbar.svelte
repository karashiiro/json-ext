<div class="toolbar">
  <slot />
</div>

<style>
  .toolbar {
    display: flex;
    padding: 1px;
    padding-inline-start: 2px;
    background-color: #18181a;
    height: calc(var(--toolbar-height) - 2px /* padding */ - 1px /* border */);
    border-bottom: 1px solid #38383d;
  }
</style>
