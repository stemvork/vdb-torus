<script>
import Cell from './Cell.svelte';
// TODO: accomodate different grid size, currently: 3x3

let stateRowCol = true;

function zeroes() { return Array(9).fill(0); }
// const indexMap = (_, vi) => vi;
const indicatorMap = (_, vi) => vi+1;
const values = zeroes().map(indicatorMap);

function getRow(ri) { return [values[ri*3], values[ri*3+1], values[ri*3+2]]; }
function getCol(ci) { return [values[ci], values[ci+3], values[ci+6]]; }

function setRow(ri, row) {
    values[ri*3] = row[0];
    values[ri*3+1] = row[1];
    values[ri*3+2] = row[2];
}
function setCol(ci, col) {
    values[ci] = col[0];
    values[ci+3] = col[1];
    values[ci+6] = col[2];
}
function swapCell(c1, c2) {
    const temp = values[c1];
    values[c1] = values[c2];
    values[c2] = temp;
}
function rotRow(ri) {
    const rotated = getRow(ri).slice(1).concat(getRow(ri)[0]);
    setRow(ri, rotated);
}
function rotCol(ci) {
    const rotated = getCol(ci).slice(1).concat(getCol(ci)[0]);
    setCol(ci, rotated);
}
function cellClicked(event) {
    const cellIndex = event.target.getAttribute('data-index');
    if(stateRowCol) rotRow(Math.floor(cellIndex/3));
    else rotCol(cellIndex%3);
}
</script>

<div class="container">
    <div class="button">
        <button on:click={() => stateRowCol = !stateRowCol}>
            {stateRowCol ? "Rotate rows" : "Rotate cols"}
        </button>
    </div>

    <div class="grid" on:click={cellClicked} >
        <div class="row">
            <Cell index=0 value={values[0]} />
            <Cell index=1 value={values[1]} />
            <Cell index=2 value={values[2]} />
        </div>
        <div class="row">
            <Cell index=3 value={values[3]} />
            <Cell index=4 value={values[4]} />
            <Cell index=5 value={values[5]} />
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
