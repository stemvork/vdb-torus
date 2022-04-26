<script>
// TODO: accomodate different grid size, currently: 3x3

let stateRowCol = true;

function zeroes() { return Array(9).fill(0); }
// const indexMap = (_, vi) => vi;
const indicatorMap = (_, vi) => vi+1;
const values = zeroes().map(indicatorMap);

function getRow(grid, ri) { return [grid[ri*3], grid[ri*3+1], grid[ri*3+2]]; }
function getCol(grid, ci) { return [grid[ci], grid[ci+3], grid[ci+6]]; }

</script>

<div class="container">
    <div class="button">
        <button on:click={() => stateRowCol = !stateRowCol}>
            {stateRowCol ? "Rotate rows" : "Rotate cols"}
        </button>
    </div>

    <div class="grid">
        <div class="row">
            <div class="cell">{values[0]}</div>
            <div class="cell">{values[1]}</div>
            <div class="cell">{values[2]}</div>
        </div>
        <div class="row">
            <div class="cell">{values[3]}</div>
            <div class="cell">{values[4]}</div>
            <div class="cell">{values[5]}</div>
        </div>
        <div class="row">
            <div class="cell">{values[6]}</div>
            <div class="cell">{values[7]}</div>
            <div class="cell">{values[8]}</div>
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

div.cell {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 1rem;
    aspect-ratio: 1;

    margin: 0.2rem;
    padding: 0.5rem;

    border: 1px solid #ccc;

    user-select: none;
}

div.cell:hover {
    background-color: #ccc;
}
</style>
