<template>
    <div>
        <div class="row q-mb-sm">
            <q-input outlined :value="name" label="Task name" class="col" autofocus v-select-all @input="$emit('update:name', $event)"
            :rules="[val => !!val || 'Field is required']" ref="name" clearable clear-icon="close" />
        </div>
    </div>
</template>

<script>
import {selectAll} from 'src/directives/directive-select-all'
export default {
    props: ['name'],
    directives:{
        // selectAll:{
        //     inserted(el){
        //         let input = el.querySelector('.q-field__native')
        //         input.addEventListener('focus', () => {
        //             if(input.value.length){
        //                 input.select()
        //             }
        //         })
        //     }
        // }
        selectAll
    }
}
</script>