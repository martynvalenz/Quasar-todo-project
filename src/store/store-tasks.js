import Vue from 'vue'
import {
  uid
} from 'quasar'

const state = {
    /* tasks: [{
        id: 1,
        name: 'Go to shop',
        completed: false,
        dueDate: '2019/05/12',
        dueTime: '18:30'
      },
      {
        id: 2,
        name: 'Get bananas',
        completed: false,
        dueDate: '2019/05/13',
        dueTime: '18:15'
      },
      {
        id: 3,
        name: 'Get apples',
        completed: false,
        dueDate: '2019/05/14',
        dueTime: '16:30'
      },
    ] */
    tasks:{
        'ID1':{
            name: 'Go to shop',
            completed: false,
            dueDate: '2019/05/12',
            dueTime: '18:30'
        },
        'ID2': {
            name: 'Get bananas',
            completed: false,
            dueDate: '2019/05/13',
            dueTime: '18:15'
        },
        'ID3': {
            name: 'Get apples',
            completed: false,
            dueDate: '2019/05/14',
            dueTime: '16:30'
        }
    }
}

const actions = {
    updateTask({ commit }, payload){
        // console.log('update task action')
        commit('updateTask', payload)
    },

    deleteTask({commit}, id){
        commit('deleteTask', id)
    },

    addTask({commit}, task){
        let taskId = uid()
        let payload = {
            id: taskId,
            task: task
        }
        commit('addTask', payload)
    }
}

const mutations = {
    updateTask(state, payload){
        Object.assign(state.tasks[payload.id], payload.updates)
    },

    deleteTask(state, id){
        Vue.delete(state.tasks, id)
    },

    addTask(state, payload){
        Vue.set(state.tasks, payload.id, payload.task)
    }
}

const getters = {
    tasks: (state) => {
        return state.tasks
    }
}

export default{
    namespaced:true, 
    state, 
    mutations, 
    actions, 
    getters
}