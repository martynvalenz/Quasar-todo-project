<template>
  <q-page>
    <div class="q-pa-md absolute full-width full-height column">
      <template v-if="tasksDownloaded">
        <div class="row q-mb-lg">
          <search></search>
          <sort></sort>
        </div>
        <p v-if="search && !Object.keys(tasksTodo).length && !Object.keys(tasksCompleted).length">No search results</p>
        <q-scroll-area class="q-scroll-area-tasks">
          <no-tasks v-if="!Object.keys(tasksTodo).length && !search && !settings.showTasksInOneList"></no-tasks>
          <tasks-todo :tasksTodo="tasksTodo" v-if="Object.keys(tasksTodo).length"></tasks-todo>
          <tasks-completed :tasksCompleted="tasksCompleted" v-if="Object.keys(tasksCompleted).length" class="q-mb-xl"></tasks-completed>
        </q-scroll-area>
        <div class="absolute-bottom text-center q-mb-lg no-pointer-events">
          <q-btn round dense color="primary" size="24px" icon="add" @click="showAddTask = true" class="all-pointer-events" />
        </div>
      </template>
      <template v-else>
        <span class="absolute-center">
          <q-spinner
            color="primary"
            size="8em"
          />
        </span>
      </template>
    </div>
    <q-dialog v-model="showAddTask" square>
      <add-task @close="showAddTask = false"></add-task>
    </q-dialog>
  </q-page>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
export default {
  name: 'PageIndex',
  data(){
    return{
      showAddTask:false,
    }
  },
  mounted(){
    this.$root.$on('showAddTask', () => {
      this.showAddTask = true
    })
  },

  computed: {
    // tasks(){
    //   return this.$store.getters['tasks/tasks']
    // }
    ...mapGetters('tasks', ['tasksTodo', 'tasksCompleted']),
    ...mapState('tasks', ['search', 'tasksDownloaded']),
    ...mapGetters('settings', ['settings'])
  },
  components:{
    'task':require('components/Tasks/Task.vue').default,
    'add-task':require('components/Modals/AddTask.vue').default,
    'tasks-todo':require('components/Tasks/TasksTodo.vue').default,
    'tasks-completed':require('components/Tasks/TasksCompleted.vue').default,
    'no-tasks':require('components/Tasks/NoTasks.vue').default,
    'search':require('components/Tools/Search.vue').default,
    'sort':require('components/Tools/Sort.vue').default,
  }, 
  methods:{

  }
}
</script>

<style lang="css">
  .q-scroll-area-tasks{
    display:flex;
    flex-grow: 1;
  }
</style>