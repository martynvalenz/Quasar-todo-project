<template>
    <div>
        <q-item v-ripple clickable @click="updateTask({id:id, updates:{completed:!task.completed}})" 
        v-touch-hold:1000.mouse="showEditTaskModal"
        :class="!task.completed ? 'bg-grey-2' : 'bg-green-1'">
            <q-item-section side top>
            <q-checkbox :value="task.completed" class="no-pointer-events" />
            </q-item-section>
            <q-item-section>
            <q-item-label :class="{'text-strikethrough' : task.completed}" v-html="$options.filters.searchHighlight(task.name, search)"></q-item-label>
            </q-item-section>
            <q-item-section side v-if="task.dueDate">
                <div class="row">
                    <div class="column justify-center">
                    <q-icon name="event" size="20px" class="q-mr-xs" />
                    </div>
                    <div class="column">
                    <q-item-label caption class="row justify-end">{{task.dueDate | niceDate}}</q-item-label>
                    <q-item-label caption class="row justify-end"><small>{{taskDueTime}}</small></q-item-label>
                    </div>
                </div>
            </q-item-section>
            <q-item-section side>
                <q-btn flat round color="orange" icon="edit" dense @click.stop="showEditTaskModal" />
            </q-item-section>
            <q-item-section side>
                <q-btn flat round color="red" icon="close" dense @click.stop="promptToDelete(id)" />
            </q-item-section>
        </q-item>
        <q-dialog v-model="showEditTask" square>
            <edit-task @close="showEditTask = false" :task="task" :id="id"></edit-task>
        </q-dialog>
    </div>
</template>

<script>
import {mapActions, mapState, mapGetters} from 'vuex'
import { date } from 'quasar'
export default {
    props:['task', 'id'],
    data(){
        return{
            showEditTask:false
        }
    },
    computed:{
        ...mapState('tasks', ['search']),
        ...mapGetters('settings', ['settings']),
        taskDueTime(){
            if(this.settings.show12HourTimeFormat){
                return date.formatDate(this.task.dueDate + ' ' + this.task.dueTime, 'h:mmA')
            }
            return this.task.dueTime
        }
    },
    components:{
        'edit-task': require('components/Modals/EditTask.vue').default
    },
    methods:{
        ...mapActions('tasks', ['updateTask', 'deleteTask']),

        promptToDelete(id){
            this.$q.dialog({
                title: 'Confirm',
                cancel: true,
                persistent: true,
                message: 'Would you like to delete the task?',
                ok: {
                    push:true
                },
                cancel:{
                    color: 'negative'
                }
            }).onOk(() => {
                this.deleteTask(id)
            })
        }, 

        showEditTaskModal(){
            this.showEditTask = true;
        }
    },

    filters: {
        niceDate(value){
            return date.formatDate(value, 'MMM D YYYY')
        },
        searchHighlight(value, search){
            if(search){
                let searchRegExp = new RegExp(search, 'ig')
                // return value.replace(searchRegExp, '<span class="bg-yellow-6">' + search + '</span>')
                return value.replace(searchRegExp, (match) => {
                    return '<span class="bg-yellow-6">' + match + '</span>'
                })
            }
            return value
        }
    }
}
</script>

<style>
    
</style>