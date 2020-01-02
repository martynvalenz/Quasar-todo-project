<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <!-- <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        /> -->

        <q-toolbar-title class="absolute-center">
          Awesome ToDo
        </q-toolbar-title>

        <q-btn flat icon-right="account_circle" to="/auth" label="Login" class="absolute-right" v-if="!loggedIn" />
        <q-btn flat icon-right="account_circle" @click="logoutUser" label="Logout" class="absolute-right" v-else />
      </q-toolbar>
    </q-header>

    <q-footer>
      <q-tabs>
        <q-route-tab v-for="nav in navs" :key="nav.label" :to="nav.to" :icon="nav.icon" :label="nav.label" />
      </q-tabs>
    </q-footer>

    <q-drawer
      :breakpoint="767"
      :width="250"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-primary"
    >
      <q-list dark>
        <q-item-label header>Navigation</q-item-label>
        <q-item router exact :to="nav.to" clickable v-for="nav in navs" :key="nav.label" class="text-grey-4">
          <q-item-section avatar>
            <q-icon :name="nav.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{nav.label}}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable class="absolute-bottom" v-if="$q.platform.is.electron" @click="quitApp">
          <q-item-section avatar>
            <q-icon name="power_settings_new" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Quit</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: 'MyLayout',
  computed:{
    ...mapState('auth', ['loggedIn'])
  },
  methods:{
    ...mapActions('auth', ['logoutUser']),
    quitApp(){
      this.$q.dialog({
        title: 'Confirm',
        message: 'Really quit awesome-todo?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        if(this.$q.platform.is.electron){
          require('electron').ipcRenderer.send('quit-app')
        }
      })
    }
  },
  data () {
    return {
      leftDrawerOpen: false,
      navs:[
        {label:'Todo', icon:'list', to:'/'},
        {label:'Settings', icon:'settings', to:'/settings'},
        {label:'Help', icon:'help', to:'/help'},
      ]
    }
  }
}
</script>

<style lang="scss">
  @media screen and (min-width: 768px){
    .q-footer{
      display: none;
    }

    .q-drawer{
      .q-router-link--exact-active{
        color: white !important;
      }
    }

     
  }
</style>
