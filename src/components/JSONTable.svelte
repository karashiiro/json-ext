<script lang="ts">
  import Fa from "svelte-fa";
  import { faCaretDown, faCaretRight } from "@fortawesome/free-solid-svg-icons";
  import * as jp from "jsonpath";
  import { compareJSONPaths, jsonPathToQuery } from "../json";

  export let value: unknown;

  const jsonPathToRowId = (path: jp.PathComponent[]): string => {
    return ["", ...path.slice(1)].join("/");
  };

  const paths = jp
    .paths(value, "$..*")
    .sort(compareJSONPaths(new Intl.Collator("en")));

  let collapsedProperties = new Set<string>();

  const toggleProperty = (id: string) => {
    if (collapsedProperties.has(id)) {
      collapsedProperties.delete(id);
    } else {
      collapsedProperties.add(id);
    }

    // Trigger state update
    collapsedProperties = new Set(collapsedProperties);
  };

  let selectedRowId: string | null = null;
</script>

<table class="json-content" cellspacing={0} cellpadding={0}>
  <thead>
    <tr>
      <td></td>
      <td class="json-value-column"></td>
    </tr>
  </thead>
  <tbody>
    {#each paths as path}
      {@const elementValue = jp.query(value, jsonPathToQuery(path))[0]}
      {@const elementType = typeof elementValue}
      {@const hasChildren = elementValue != null && elementType === "object"}
      {@const rowId = jsonPathToRowId(path)}
      {@const rowSelected = rowId === selectedRowId}
      {@const rowHidden = Array.from(collapsedProperties).some((prop) =>
        rowId.startsWith(`${prop}/`),
      )}
      <tr
        id={rowId}
        on:click={(ev) => (selectedRowId = ev.currentTarget.id)}
        class:selected={rowSelected}
        class:gone={!hasChildren && rowHidden}
      >
        <td
          class="json-content-cell json-content-label-cell"
          style:--tree-label-cell-indent={`${16 * (path.length - 2)}px`}
          on:click={() => toggleProperty(rowId)}
        >
          <span class="inner">
            <span
              class="json-content-arrow"
              class:hidden={!hasChildren}
              class:linky={hasChildren}
            >
              <Fa
                icon={collapsedProperties.has(rowId)
                  ? faCaretRight
                  : faCaretDown}
                color={rowSelected ? "#ffffff" : "rgb(147, 147, 149)"}
                scale={1.2}
                translateX={0.4}
              />
            </span>
            <span class="json-content-label" class:linky={hasChildren}
              >{path[path.length - 1]}</span
            >
            <span class="json-content-label">:</span>
          </span>
        </td>
        <td class="json-content-cell">
          {#if !hasChildren}
            <span
              class:json-value-string={elementType === "string"}
              class:json-value-number={elementType === "number"}
              class:json-value-boolean={elementType === "boolean"}
              class:json-value-nullish={elementValue == null}
            >
              {#if elementType === "string"}
                "{elementValue}"
              {:else}
                {elementValue}
              {/if}
            </span>
          {:else if collapsedProperties.has(rowId)}
            <span style:display="flex">
              {#if Array.isArray(elementValue)}
                <span style:color="rgb(117, 191, 255)">[</span>
                <span style:color="rgb(147, 147, 149)">…</span>
                <span style:color="rgb(117, 191, 255)">]</span>
              {:else if elementValue != null && elementType === "object"}
                <span style:color="rgb(117, 191, 255)">{"{"}</span>
                <span style:color="rgb(147, 147, 149)">…</span>
                <span style:color="rgb(117, 191, 255)">{"}"}</span>
              {/if}
            </span>
          {/if}
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  tr.selected {
    background-color: rgb(32, 78, 138);
  }

  tr.selected * {
    color: #ffffff !important;
  }

  tr.selected ::selection {
    color: rgb(32, 78, 138) !important;
    background-color: #ffffff;
  }

  tr:not(.selected):hover {
    background-color: rgb(53, 59, 72);
  }

  .linky {
    cursor: pointer;
  }

  .linky:hover {
    text-decoration: underline;
  }

  .json-value-column {
    width: 100%;
  }

  .json-content {
    font-size: 11px;
    font-family: Consolas, monospace;
  }

  .json-content-label {
    color: rgb(117, 191, 255);
  }

  .json-content-label-cell {
    cursor: default;
    white-space: nowrap;
  }

  .json-content-label-cell .inner {
    display: flex;
    padding-right: 17px;
    padding-inline-start: var(--tree-label-cell-indent);
  }

  .json-content-arrow {
    height: 14px;
    width: 14px;
    padding: 1px;
    font-size: 10px;
    line-height: 14px;
    display: inline-block;
    vertical-align: bottom;
    margin-inline: 3px 1px;
  }

  .json-content-cell {
    padding: 2px 0;
    line-height: 16px;
    vertical-align: top;
    overflow: hidden;
  }

  .json-value-string {
    color: rgb(255, 125, 233);
  }

  .json-value-number {
    color: rgb(134, 222, 116);
  }

  .json-value-boolean {
    color: rgb(134, 222, 116);
  }

  .json-value-nullish {
    color: rgb(147, 147, 149);
  }

  .hidden {
    visibility: hidden;
  }

  .gone {
    display: none;
  }
</style>
