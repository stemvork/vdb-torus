<script>
export let state;
</script>

<button on:click={() => state.rowcol = !state.rowcol}>
    {state.rowcol ? "Rotate rows" : "Rotate cols"}
</button>
<button on:click={() => state.direction = !state.direction}>
    {state.direction ?
    (state.rowcol ? "Rotate right" : "Rotate down") :
    (state.rowcol ? "Rotate left" : "Rotate up")}
</button>
<h3>Press the left button or D to switch direction of the rotation.</h3>
<h3>Press the right button or space to switch orientation of the rotation.</h3>

<style>
</style>
