<template>
  <q-page class="q-ma-md">
    <q-list bordered separator v-if="Object.keys(tasks).length">
      <q-item-label header>To Do list</q-item-label>
      <task v-for="(task, key) in tasks" :key="key" :task="task" :id="key"></task>
      
    </q-list>
    <div class="absolute-bottom text-center q-mb-lg">
      <q-btn round dense color="primary" size="24px" icon="add" @click="showAddTask = true" />
    </div>
    <q-dialog v-model="showAddTask" square>
      <add-task @close="showAddTask = false"></add-task>
    </q-dialog>
  </q-page>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'PageIndex',
  data(){
    return{
      showAddTask:false,
    }
  },
  computed: {
    // tasks(){
    //   return this.$store.getters['tasks/tasks']
    // }
    ...mapGetters('tasks', ['tasks'])
  },
  components:{
    'task':require('components/Tasks/Task.vue').default,
    'add-task':require('components/Modals/AddTask.vue').default,
    'add-task':require('components/Modals/AddTask.vue').default,
  }, 
  methods:{

  }
}
</script>
