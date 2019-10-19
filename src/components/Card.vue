<template>
    <div @click="$emit('click', number)">
        {{number}}
    </div>
</template>

<script>
export default {
    props: ['number']
}
</script>

<style scoped>
div{
    border-radius: 5px;
    border: 2px solid black;
    font-size: 3em;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    min-height: 120px;
}
</style>