<template>
    <div>
        <q-card>
            <modal-header>Edit task</modal-header>

            <q-form @submit.prevent="submitForm">
                <q-card-section>
                    <modal-task-name ref="modalTaskName" :name.sync="taskToSubmit.name"></modal-task-name>
                    <modal-due-date :dueDate.sync="taskToSubmit.dueDate"></modal-due-date>
                    <modal-due-time v-if="taskToSubmit.dueDate" :dueTime.sync="taskToSubmit.dueTime"></modal-due-time>
                    <modal-buttons></modal-buttons>
                </q-card-section>
            </q-form>
        </q-card>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
import mixinAddEditTask from 'src/mixins/mixin-add-edit-task'
export default {
    props:['task','id'],
    mixins:[mixinAddEditTask],
    data(){
        return{
            taskToSubmit: {
                
            }
        }
    },

    methods:{
        ...mapActions('tasks', ['updateTask']),

        submitTask(){
            this.updateTask({id:this.id, updates:this.taskToSubmit})
            this.$emit('close')
        }
    },

    mounted(){
        this.taskToSubmit = Object.assign({}, this.task)
    }
}
</script>