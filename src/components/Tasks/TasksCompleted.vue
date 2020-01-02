<template>
    <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut absolute-top"
    >
        <div :class="{'q-mt-lg' : !settings.showTasksInOneList}">
            <list-header :bgColor="'bg-green-4'" v-if="!settings.showTasksInOneList">Tasks compelted</list-header>
            <q-list bordered separator>
                <!-- <q-item-label header>Tasks completed</q-item-label> -->
                <task v-for="(task, key) in tasksCompleted" :key="key" :task="task" :id="key"></task>
            </q-list>
        </div>
    </transition>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    props:['tasksCompleted'],
    computed:{
        ...mapGetters('settings', ['settings'])
    },
    components:{
        'task':require('components/Tasks/Task.vue').default,
        'list-header':require('components/Shared/ListHeader.vue').default,
    }, 
}
</script>