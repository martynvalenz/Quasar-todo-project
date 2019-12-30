<template>
    <div>
        <q-item v-ripple clickable @click="updateTask({id:id, updates:{completed:!task.completed}})" :class="!task.completed ? 'bg-grey-2' : 'bg-green-1'">
            <q-item-section side top>
            <q-checkbox :value="task.completed" class="no-pointer-events" />
            </q-item-section>
            <q-item-section>
            <q-item-label :class="{'text-strikethrough' : task.completed}">{{task.name}}</q-item-label>
            </q-item-section>
            <q-item-section side v-if="task.dueDate">
                <div class="row">
                    <div class="column justify-center">
                    <q-icon name="event" size="20px" class="q-mr-xs" />
                    </div>
                    <div class="column">
                    <q-item-label caption class="row justify-end">{{task.dueDate}}</q-item-label>
                    <q-item-label caption class="row justify-end"><small>{{task.dueTime}}</small></q-item-label>
                    </div>
                </div>
            </q-item-section>
            <q-item-section side>
                <q-btn flat round color="orange" icon="edit" dense @click.stop="promptToDelete(id)" />
            </q-item-section>
            <q-item-section side>
                <q-btn flat round color="red" icon="close" dense @click.stop="promptToDelete(id)" />
            </q-item-section>
        </q-item>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    props:['task', 'id'],
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
        }
    }
}
</script>

<style>
    
</style>