<template>
    <transition
        appear
        enter-active-class="animated zoomIn"
        leave-active-class="animated zoomOut absolute-top"
        >
        <div>
            <list-header :bgColor="'bg-orange-4'" v-if="!settings.showTasksInOneList">To Do</list-header>
            <q-list bordered separator>
                <!-- <q-item-label header>To Do list</q-item-label> -->
                <task v-for="(task, key) in tasksTodo" :key="key" :task="task" :id="key"></task>
            </q-list>
        </div>
    </transition>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    props:['tasksTodo'],
    computed:{
        ...mapGetters('settings', ['settings'])
    },
    components:{
        'task':require('components/Tasks/Task.vue').default,
        'list-header':require('components/Shared/ListHeader.vue').default,
    }, 
}
</script>