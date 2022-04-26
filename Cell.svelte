<script>
export let index = 0;
export let value = 0;
</script>

<div on:click={() => alert(`index: ${index}, value: ${value}`)}
     class="cell">
     {value}
</div>

<style>
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
