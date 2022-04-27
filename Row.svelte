<script>
import Cell from './Cell.svelte';
export let index;
export let values;
</script>

<div class="row">
    {#each values as v, i}
        <Cell index={index*3 + i} value={v} />
    {/each}
</div>

<style>
div.row {
    display: flex;
    width: 100%;
    justify-content: center;
}
</style>
