<script>
import Cell from './Cell.svelte';
// TODO: accomodate different grid size, currently: 3x3

let stateRowCol = true;

function zeroes() { return Array(9).fill(0); }
// const indexMap = (_, vi) => vi;
const indicatorMap = (_, vi) => vi+1;
const values = zeroes().map(indicatorMap);

function getRow(grid, ri) { return [grid[ri*3], grid[ri*3+1], grid[ri*3+2]]; }
function getCol(grid, ci) { return [grid[ci], grid[ci+3], grid[ci+6]]; }

function cellClicked(event) {
    console.log('clicked:', event.target.getAttribute('data-index'));
}
</script>

<div class="container">
    <div class="button">
        <button on:click={() => stateRowCol = !stateRowCol}>
            {stateRowCol ? "Rotate rows" : "Rotate cols"}
        </button>
    </div>

    <div class="grid">
        <div class="row">
            <Cell on:click={cellClicked} index=0 value={values[0]} />
            <Cell index=1 value={values[1]} />
            <Cell index=2 value={values[2]} />
        </div>
        <div class="row">
            <Cell index=3 value={values[3]} />
            <Cell index=4 value={values[4]} />
            <Cell index=5 value={values[6]} />
        </div>
        <div class="row">
            <Cell index=6 value={values[6]} />
            <Cell index=7 value={values[7]} />
            <Cell index=8 value={values[8]} />
        </div>
    </div>
</div>

<style>
div.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

div.button {
    width: 100%;
    padding-top: 1rem;
    text-align: center;
}

div.grid {
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    padding-top: 1rem;
}

div.row {
    display: flex;
    width: 100%;
    justify-content: center;
}
</style>
