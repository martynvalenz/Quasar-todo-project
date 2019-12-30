<template>
    <div>
        <q-card>
            <modal-header></modal-header>

            <q-form @submit.prevent="submitForm">
                <q-card-section>
                    <div class="row q-mb-sm">
                        <q-input outlined v-model="taskToSubmit.name" label="Task name" class="col" autofocus
                        :rules="[val => !!val || 'Field is required']" ref="name" clearable clear-icon="close" />
                    </div>

                    <div class="row q-mb-sm">
                        <q-input outlined v-model="taskToSubmit.dueDate" label="Due date" clearable clear-icon="close">
                            <template v-slot:append>
                                <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                    <q-date v-model="taskToSubmit.dueDate" @input="() => $refs.qDateProxy.hide()" />
                                </q-popup-proxy>
                                </q-icon>
                            </template>
                        </q-input>
                    </div>

                    <div class="row q-mb-sm" v-if="taskToSubmit.dueDate">
                        <q-input outlined v-model="taskToSubmit.dueTime" label="Due time" clearable clear-icon="close">
                            <template v-slot:append>
                            <q-icon name="access_time" class="cursor-pointer">
                                <q-popup-proxy transition-show="scale" transition-hide="scale">
                                    <q-time v-model="taskToSubmit.dueTime">
                                        <div class="row items-center justify-end q-gutter-sm">
                                            <q-btn label="Close" color="primary" flat v-close-popup />
                                        </div>
                                    </q-time>
                                </q-popup-proxy>
                            </q-icon>
                            </template>
                        </q-input>
                    </div>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn label="Save" color="primary" type="submit"  />
                </q-card-actions>
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
            this.$refs.name.validate()
            if(!this.$refs.name.hasError){
                this.submitTask();
            }
        }, 

        submitTask(){
            this.addTask(this.taskToSubmit)
            this.$emit('close')
        }
    },
    components:{
        'modal-header': require('components/Modals/Shared/ModalHeader.vue').default 
    }
}
</script>