<template>
    <div>
        <div class="stats">
            <div class="left" :class="{ hide: !turned }">
                <p>Most voted: <b>{{most}}</b></p>
                <p>Average: <b>{{avg}}</b></p>
            </div>
            <div class="right">
                <p>{{cards.length}} players. Go to {{path}} to join</p>
            </div>
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
            return this.cards.filter(c => c.value).sort((a,b) => {
                if(a.value === b.value){
                    return 0;
                }
                if(a.value === '?'){
                    return 1;
                }
                if(b.value === '?'){
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
            const avg = numbers.reduce((a,b) => a + b, 0) / numbers.length
            return parseFloat(avg.toFixed(1));
        },
        most(){
            let numbers = this.cards.filter(c => c.value !== '' && c.value !== '?').map(c => parseInt(c.value, 10));
            numbers.sort((a,b) => numbers.filter(v => v===b).length - numbers.filter(v => v===a).length);
            let single = [...new Set(numbers)];
            single = single.filter(n => numbers.filter(v => v===numbers[0]).length === numbers.filter(v => v===n).length);
            if(single.length === 1){
                return single[0];
            }
            return single;
        },
        path(){
            return location.host + location.pathname;
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
    grid-template-columns: repeat(auto-fill,minmax(200px,1fr));
}

.grid >>> .card{
    min-height: 300px;
    position: absolute;
}

.grid >>> .back{
    display: block;
}

p{
    color: white;
}

.stats{
    display: flex;
    margin: 0 25px;
}

.stats p{
    margin: 10px 20px 0 0;
}

.left{
    flex: 1;
}

.stats{
    transition: opacity 1s ease-in-out;
    font-size: 2.5em;
    margin-bottom: 15px;
}

.hide{
    opacity: 0;
}

.no{
    margin-left: 25px;
}
</style>