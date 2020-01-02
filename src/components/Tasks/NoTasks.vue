<template>
    <transition
            appear
            enter-active-class="animated zoomIn"
            leave-active-class="animated zoomOut absolute-top"
            >
        <div>
            <q-banner class="bg-grey-3">
                <template v-slot:avatar>
                    <q-icon name="check" color="primary" />
                </template>
                You have no more tasks to do.
                <template v-slot:action>
                    <q-btn flat color="primary" label="Add task" icon-right="add" @click="$root.$emit('showAddTask')" />
                </template>
            </q-banner>
        </div>
    </transition>
</template>

<script>
export default {
    
}
</script>