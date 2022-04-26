<script>
export let value = 0;
</script>

<div class="cell">{value}</div>

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
