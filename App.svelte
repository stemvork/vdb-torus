<script>
import Cell from './Cell.svelte';
// TODO: accomodate different grid size, currently: 3x3
// TODO: implement smarter interface: positional click/highlighting
// TODO: improve visual comprehension of direction/orientation

let stateRowCol = true;
let stateDirection = false;
let startTime = Date.now();
let endTime = null;

function zeroes() { return Array(9).fill(0); }
// const indexMap = (_, vi) => vi;
const indicatorMap = (_, vi) => vi+1;
const values = zeroes().map(indicatorMap);
const isCorrect = (v, vi) => vi+1 === v;

function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
// shuffle(values);
function shuffle2() {
    const colOps = [...Array(3).keys()].map(i => () => rotCol(i));
    const rowOps = [...Array(3).keys()].map(i => () => rotRow(i));
    const allOps = [...colOps, ...rowOps];
    console.log(allOps);
    for(let i=0; i<10; i++) {
        const opIndex = Math.floor(Math.random()*6);
        console.log('op', opIndex);
        allOps[opIndex]();
    }
}
shuffle2();

let done = false;
let doneString = 'Time: ';
$: done = values.every(isCorrect);
$: {
    if(done) {
        endTime = Date.now();
        if((endTime-startTime)/(60*1000) < 1)
            doneString += `${Math.floor((endTime-startTime)/1000)} seconds`;
        else doneString += `${Math.floor((endTime-startTime)/(60*1000))} minutes and ${Math.floor((endTime-startTime)/1000)} seconds`;
    }
}

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
/* function swapCell(c1, c2) { */
/*     const temp = values[c1]; */
/*     values[c1] = values[c2]; */
/*     values[c2] = temp; */
/* } */
function rotRow(ri) {
    let rotated;
    if(stateDirection) {
        rotated = [getRow(ri)[2]].concat(getRow(ri).slice(0,2));
    } else {
        rotated = getRow(ri).slice(1).concat(getRow(ri)[0]);
    }
    setRow(ri, rotated);
}
function rotCol(ci) {
    let rotated;
    if(stateDirection) {
        rotated = [getCol(ci)[2]].concat(getCol(ci).slice(0,2));
    } else {
        rotated = getCol(ci).slice(1).concat(getCol(ci)[0]);
    }
    setCol(ci, rotated);
}
function cellClicked(event) {
    const cellIndex = event.target.getAttribute('data-index');
    if(stateRowCol) rotRow(Math.floor(cellIndex/3));
    else rotCol(cellIndex%3);
}
document.addEventListener('keydown', e => {
    if(e.key === 'd') stateDirection = !stateDirection;
    if(e.key === 'o') stateRowCol = !stateRowCol;
})
</script>

<div class="container">
    <div class="center">
        <button on:click={() => stateRowCol = !stateRowCol}>
            {stateRowCol ? "Rotate rows" : "Rotate cols"}
        </button>
        <button on:click={() => stateDirection = !stateDirection}>
            {stateDirection ? (stateRowCol ? "Rotate right" : "Rotate down") : (stateRowCol ? "Rotate left" : "Rotate up")}
        </button>
        <h3>Press the left button or D to switch direction of the rotation.</h3>
        <h3>Press the right button or O to switch orientation of the rotation.</h3>
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
{#if done}
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
