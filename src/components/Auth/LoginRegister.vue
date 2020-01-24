<template>
   <form @submit.prevent="submitForm">
      <div class="row q-mb-md">
         <q-banner class="bg-grey-3 col">
            <template v-slot:avatar>
               <q-icon name="account_circle" color="primary" />
            </template>
            {{tab | titleCase}} to acces your Todos anywhere!
         </q-banner>
      </div>
      <div class="row q-mb-md">
         <q-input class="col" outlined v-model="formData.email" label="Email" :rules="[ val => isValidEmailAddress(val) || 'Please enter a valid email address']" lazy-rules ref="email" type="email" />
      </div>
      <div class="row q-mb-md">
         <q-input class="col" outlined v-model="formData.password" label="Password" type="password" :rules="[ val => val.length >= 6 || 'Please enter at least 6 characters']" lazy-rules ref="password" />
      </div>
      <div class="row q-mb-md">
         <q-btn color="primary" :label="tab" class="full-width" type="submit" />
      </div>
   </form>
</template>

<script>
import {mapActions} from 'vuex'
export default {
   props:['tab'],
   data(){
      return{
         formData:{
            email:'martynvalenz@gmail.com',
            password:'martin87',
         }
      }
   },
   filters:{
      titleCase(value){
         return value.charAt(0).toUpperCase() + value.slice(1)
      }
   },
   methods:{
      ...mapActions('auth', ['registerUser', 'loginUser']),
      submitForm(){
         this.$refs.email.validate()
         this.$refs.password.validate()
         if(!this.$refs.email.hasError && !this.$refs.password.hasError){
            if(this.tab == 'login'){
               this.loginUser(this.formData)
            }
            else if(this.tab == 'register'){
               this.registerUser(this.formData)
            }
         }
      },

      isValidEmailAddress(email){
         var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
         return re.test(String(email).toLowerCase());
      }
   }
}
</script>