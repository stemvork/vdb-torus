<script>
export let state;
</script>

<button on:click={() => state.rowcol = !state.rowcol}>
    {state.rowcol ? "Rotate rows" : "Rotate cols"}
</button>
<h3>Press the button or space to switch orientation of the rotation.</h3>
<button class="selected">&larr;</button>
<button>&uarr;</button>
<button>&rarr;</button>
<button>&darr;</button>

<style>
button {
    font-size: 3rem;
    border: none;
    background: transparent;
}

button.selected {
    background: #cff;
    border-radius: 50%;
}
</style>
