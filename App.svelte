<script>
import Center from './Center.svelte';
import Done from './Done.svelte';
import Header from './Header.svelte';

import Row from './Row.svelte';
// TODO: accomodate different grid size, currently: 3x3
// TODO: implement smarter interface: positional click/highlighting
// TODO: improve visual comprehension of direction/orientation
// TODO: hide the instructions
// TODO: improve the visual look of the game
// TODO: refactor the App component
// TODO: replace buttons by toggles

import {
    state,
    newGrid, shuffle,
    rotCol, rotRow,
    isCorrect,
    getDoneString,
} from './utils.js';

const values = newGrid();
shuffle(values);

let debug = { done: true };
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
    if(state.done) return;

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
    <Center>
        <Header {state} />
    </Center>

    <div class="grid" on:click={cellClicked} >
        <Row index=0 values={[values[0], values[1], values[2]]} />
        <Row index=1 values={[values[3], values[4], values[5]]} />
        <Row index=2 values={[values[6], values[7], values[8]]} />
    </div>
</div>
<Center>
    {#if state.done}<Done {doneString} />{/if}
</Center>

<style>
div.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

div.grid {
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    padding-top: 1rem;
}
</style>
