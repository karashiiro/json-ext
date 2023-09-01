<script>
  import { faCircleXmark, faFilter } from "@fortawesome/free-solid-svg-icons";
  import Fa from "svelte-fa";

  export let value = "";
</script>

<div class="searchbar">
  <Fa
    icon={faFilter}
    color="rgba(147, 147, 149, 0.9)"
    scale={0.7}
    translateX={0.25}
    translateY={0.15}
    style="position: absolute; pointer-events: none;"
  />
  <input class="searchbar-field" placeholder="Filter JSON" bind:value />
  <button
    class="searchbar-clear"
    on:click={() => (value = "")}
    hidden={value === ""}
  >
    <Fa icon={faCircleXmark} scale={1.2} />
  </button>
</div>

<style>
  .searchbar {
    display: inline-flex;
    flex-grow: 1;
    position: relative;
    border: 1px solid transparent;
    height: 100%;
    box-sizing: border-box;
    background-color: rgb(35, 35, 39);
  }

  .searchbar-clear {
    background-color: transparent;
    border: none;
    color: rgba(185, 185, 187, 0.8);
  }

  .searchbar-clear:hover {
    color: rgba(185, 185, 187, 1);
  }

  .searchbar-field {
    border: none;
    flex-grow: 1;
    min-width: 0;
    width: 100%;
    margin-inline-start: auto;
    padding-inline-start: 22px;
    background-color: rgb(24, 29, 32);
    color: rgb(184, 200, 217);
    font-size: 11px;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }
</style>
