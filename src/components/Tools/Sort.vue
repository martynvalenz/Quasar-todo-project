<template>
    <q-select v-model="sortBy" :options="options" label="Sort by" class="col q-ml-sm" outlined emit-value map-options />
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
    data(){
        return{
            options: [
                {value:'name', label:'Name'},
                {value:'dueDate', label:'Date'}
            ]
        }
    },

    computed:{
        ...mapState('tasks', ['sort']),
        sortBy:{
            get(){
                return this.sort
            },
            set(value){
                this.setSort(value)
            }
        }
    },

    methods:{
        ...mapActions('tasks', ['setSort'])
    }
}
</script>

<style lang="css" scoped>
    .q-select{
        flex: 0 0 120px;
    }
</style>