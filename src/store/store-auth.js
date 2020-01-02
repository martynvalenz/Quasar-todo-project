import {
  LocalStorage,
  Loading
} from 'quasar'
import {firebaseAuth} from 'boot/firebase'
import {showErrorMessage} from 'src/functions/error-messages.js'
const state = {
	loggedIn: false
}

const mutations = {
	setLoggedIn(state, value){
		state.loggedIn = value
	}
}

const actions = {
	registerUser({}, payload){
		Loading.show()
		firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
		.then(response => {
			console.log('response: ', response)
			Loading.hide()
		})
		.catch(error => {
			showErrorMessage(error.message)
			Loading.hide()
		})
	},
	loginUser({}, payload){
		Loading.show()
		firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
		.then(response => {
			console.log('response: ', response)
			Loading.hide()
		})
		.catch(error => {
			showErrorMessage(error.message)
			Loading.hide()
		})
	},
	logoutUser(){
		// Loading.show()
		firebaseAuth.signOut()
		// setTimeout(() => firebaseAuth.signOut(), 2000);
		// Loading.hide()
	},
	handleAuthStateChange({commit, dispatch}){
		firebaseAuth.onAuthStateChanged( (user) => {
			if (user) {
				commit('setLoggedIn', true)
				LocalStorage.set('loggedIn', true)
				this.$router.push('/').catch(err => {})
				dispatch('tasks/fbReadData', null, {root: true})
			}
			else{
				commit('tasks/setTasksDownloaded', false, {root:true})
				commit('tasks/clearTasks', null, {root: true})
				commit('setLoggedIn', false)
				LocalStorage.set('loggedIn', false)
				this.$router.replace('/auth').catch(err => {})

			}
		});
	}
}

const getters = {

}

export default {
	namespaced: true,
	state, mutations, actions, getters
}