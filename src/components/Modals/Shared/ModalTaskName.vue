<template>
    <div>
        <div class="row q-mb-sm">
            <q-input outlined :value="name" label="Task name" class="col" autofocus @input="$emit('update:name', $event)"
            :rules="[val => !!val || 'Field is required']" ref="name" clearable clear-icon="close" />
        </div>
    </div>
</template>

<script>
export default {
    props: ['name']
}
</script>