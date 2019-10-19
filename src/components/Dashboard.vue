<template>
    <div>
        <div class="stats" :class="{ hide: !turned }">
            <p>Average: <b>{{avg}}</b></p>
            <p>Most voted: <b>{{most}}</b></p>
        </div>
        <div class="grid">
            <Card v-for="card in sortedCards" :key="card.id" :number="card.value" :player="card.player" :turned="!turned"/>
        </div>
    </div>
</template>

<script>
export default {
    props: ['cards', 'turn'],
    computed:{
        sortedCards(){
            return this.cards.sort((a,b) => {
                if(a.value === b.value){
                    return 0;
                }
                if(a.value === '?' && b.value === ''){
                    return -1;
                }
                if(a.value === '' && b.value === '?'){
                    return 1;
                }
                if(a.value === '' || a.value === '?'){
                    return 1;
                }
                if(b.value === '' || b.value === '?'){
                    return -1;
                }
                return parseInt(a.value, 10) - parseInt(b.value, 10);
            });
        },
        turned(){
            return this.cards.every(c => c.value) || !this.turn
        },
        avg(){
            const numbers = this.cards.filter(c => c.value !== '' && c.value !== '?').map(c => parseInt(c.value, 10));
            return numbers.reduce((a,b) => a + b, 0) / numbers.length
        },
        most(){
            let numbers = this.cards.filter(c => c.value !== '' && c.value !== '?').map(c => parseInt(c.value, 10));
            numbers = numbers.sort((a,b) => numbers.filter(v => v===a).length - numbers.filter(v => v===b).length);
            const single = [...new Set(numbers)];
            return single.filter(n => numbers.filter(v => v===numbers[0]).length === numbers.filter(v => v===n).length);
        }
    },
    components: {
        Card: () => import('@/components/Card')
    }
}
</script>

<style scoped>
.grid{
    margin: 2px 25px;
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(auto-fill,minmax(250px,1fr));
}

.grid >>> .card{
    min-height: 350px;
    position: absolute;
}

.grid >>> .back{
    display: block;
}

.stats{
    color: white;
    display: flex;
    margin: 0 25px;
}

.stats p{
    margin: 10px 20px 0 0;
}

.stats{
    transition: opacity 1s ease-in-out;
}

.hide{
    opacity: 0;
}
</style>