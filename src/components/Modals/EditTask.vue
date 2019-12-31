<template>
    <div>
        <q-card>
            <modal-header>Add Task</modal-header>

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
export default {
    data(){
        return{
            taskToSubmit: {
                name: '',
                dueDate: '',
                dueTime: '',
                completed: false,
            }
        }
    },

    methods:{
        ...mapActions('tasks', ['addTask']),
        submitForm(){
            this.$refs.modalTaskName.$refs.name.validate()
            if(!this.$refs.modalTaskName.$refs.name.hasError){
                this.submitTask();
            }
        }, 

        submitTask(){
            this.addTask(this.taskToSubmit)
            this.$emit('close')
        }
    },
    components:{
        'modal-header': require('components/Modals/Shared/ModalHeader.vue').default, 
        'modal-task-name': require('components/Modals/Shared/ModalTaskName.vue').default, 
        'modal-due-date': require('components/Modals/Shared/ModalDueDate.vue').default, 
        'modal-due-time': require('components/Modals/Shared/ModalDueTime.vue').default, 
        'modal-buttons': require('components/Modals/Shared/ModalButtons.vue').default, 
    }
}
</script>