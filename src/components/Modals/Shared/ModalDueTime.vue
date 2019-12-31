<template>
    <div>
        <div class="row q-mb-sm">
            <q-input outlined :value="dueTime" label="Due time" clearable clear-icon="close" @input="$emit('update:dueTime', $event)">
                <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy transition-show="scale" transition-hide="scale">
                        <q-time :value="dueTime" @input="$emit('update:dueTime', $event)">
                            <div class="row items-center justify-end q-gutter-sm">
                                <q-btn label="Close" color="primary" flat v-close-popup />
                            </div>
                        </q-time>
                    </q-popup-proxy>
                </q-icon>
                </template>
            </q-input>
        </div>
    </div>
</template>

<script>
export default {
    props:['dueTime']
}
</script>