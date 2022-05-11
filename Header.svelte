<script>
export let state;
let i = 0;
</script>

<h3>CONTROLS:</h3>
<div class="arrows">
    <button class:selected={i==0} on:click={() => { i = 0; state.rowcol = true; state.direction = false; }}>&larr;</button>
    <button class:selected={i==1} on:click={() => { i = 1; state.rowcol = false; state.direction = false; }}>&uarr;</button>
    <button class:selected={i==2} on:click={() => { i = 2; state.rowcol = true; state.direction = true; }}>&rarr;</button>
    <button class:selected={i==3} on:click={() => { i = 3; state.rowcol = false; state.direction = true; }}>&darr;</button>
</div>

<style>
h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
}
div.arrows {
    display: flex;
    margin: 0 auto;
    justify-content: center;
    width: fit-content;
    height: fit-content;
}
button {
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 3rem;

    border: none;
    border-radius: 10000px;
    background: transparent;

    width: 4rem;
    height: 4rem;
}
button.selected {
    background-color: #cff;
}
</style>
