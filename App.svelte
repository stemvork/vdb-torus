<script>
import Cell from './Cell.svelte';
// TODO: accomodate different grid size, currently: 3x3
// TODO: implement smarter interface: positional click/highlighting
// TODO: improve visual comprehension of direction/orientation

import {
    state,
    newGrid,
    shuffle,
    /* getCol, getRow, */
    /* setCol, setRow, */
    rotCol, rotRow,
    isCorrect,
    getDoneString,
} from './utils.js';

const values = newGrid();
shuffle(values);

let debug = {
    done: true,
}

let doneString;
$: {
    state.done = values.every(isCorrect);
    debug.done && console.log(`[done = ${state.done}]`, 'after', state.moves, 'moves');
    if(state.done) {
        state.time.end = Date.now();
        doneString = getDoneString(state);
    }
}

function cellClicked(event) {
    if(state.time.start === null) state.time.start = Date.now();
    state.moves += 1;

    const cellIndex = event.target.getAttribute('data-index');

    if(state.rowcol) rotRow(values, Math.floor(cellIndex/3));
    else rotCol(values, cellIndex%3);
    values = values; // force update
}

document.addEventListener('keydown', e => {
    if(e.key === 'd') state.direction = !state.direction;
    if(e.key === ' ') state.rowcol = !state.rowcol;
})
</script>

<div class="container">
    <div class="center">
        <button on:click={() => state.rowcol = !state.rowcol}>
            {state.rowcol ? "Rotate rows" : "Rotate cols"}
        </button>
        <button on:click={() => state.direction = !state.direction}>
            {state.direction ? (state.rowcol ? "Rotate right" : "Rotate down") : (state.rowcol ? "Rotate left" : "Rotate up")}
        </button>
        <h3>Press the left button or D to switch direction of the rotation.</h3>
        <h3>Press the right button or space to switch orientation of the rotation.</h3>
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
<div class="center">
{#if state.done}
    <h1>Done!</h1>
    <h3>{doneString}</h3>
{/if}
</div>

<style>
div.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

div.center {
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
