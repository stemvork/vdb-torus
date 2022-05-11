const state = {
    rowcol: true,
    direction: false,
    time: {
        start: null,
        end: null,
    },
    done: false,
    moves: 0,
};

function zeroes() { return Array(9).fill(0); }
// const indexMap = (_, vi) => vi;
const indicatorMap = (_, vi) => vi+1;
const newGrid = () => zeroes().map(indicatorMap);
const isCorrect = (v, vi) => vi+1 === v;

// function shuffle(array) {
//     for (var i = array.length - 1; i > 0; i--) {
//         var j = Math.floor(Math.random() * (i + 1));
//         var temp = array[i];
//         array[i] = array[j];
//         array[j] = temp;
//     }
// }
// shuffle(values);
function shuffle(grid, debug=false) {
    debug && console.log('------ debug shuffle ------');
    const colOps = [...Array(3).keys()].map(i => (grid) => rotCol(grid, i));
    const rowOps = [...Array(3).keys()].map(i => (grid) => rotRow(grid, i));
    const allOps = [...colOps, ...rowOps];
    debug && console.log('op array', allOps);
    for(let i=0; i<10; i++) {
        const opIndex = Math.floor(Math.random()*6);
        debug && console.log(`shuffle ${i} op`, opIndex);
        allOps[opIndex](grid);
    }
    debug && console.log('------ end of debug shuffle ------');
}

function getRow(grid, ri) { return [grid[ri*3], grid[ri*3+1], grid[ri*3+2]]; }
function getCol(grid, ci) { return [grid[ci], grid[ci+3], grid[ci+6]]; }

function setRow(grid, ri, row) {
    grid[ri*3] = row[0];
    grid[ri*3+1] = row[1];
    grid[ri*3+2] = row[2];
}
function setCol(grid, ci, col) {
    grid[ci] = col[0];
    grid[ci+3] = col[1];
    grid[ci+6] = col[2];
}
/* function swapCell(c1, c2) { */
/*     const temp = values[c1]; */
/*     values[c1] = values[c2]; */
/*     values[c2] = temp; */
/* } */
function rotRow(grid, ri) {
    let rotated;
    if(state.direction) {
        rotated = [getRow(grid, ri)[2]].concat(getRow(grid, ri).slice(0,2));
    } else {
        rotated = getRow(grid, ri).slice(1).concat(getRow(grid, ri)[0]);
    }
    setRow(grid, ri, rotated);
}

function rotCol(grid, ci) {
    let rotated;
    if(state.direction) {
        rotated = [getCol(grid, ci)[2]].concat(getCol(grid, ci).slice(0,2));
    } else {
        rotated = getCol(grid, ci).slice(1).concat(getCol(grid, ci)[0]);
    }
    setCol(grid, ci, rotated);
}

function getDoneString(state) {
    const timeElapsed = state.time.end-state.time.start;
    const minsElapsed = Math.floor(timeElapsed / (60*1000));
    const secsElapsed = Math.floor((timeElapsed - minsElapsed*60*1000)/1000);
    const timeString = minsElapsed > 0 ?
        `${minsElapsed} minutes and ${secsElapsed} seconds.` :
        `${secsElapsed} seconds.`;

    return `Moves: ${state.moves}. Time: ${timeString}`;
}

export {
    state,
    newGrid,
    isCorrect,
    shuffle,
    getRow, getCol,
    setRow, setCol,
    rotRow, rotCol,
    getDoneString,
}
