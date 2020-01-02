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

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: 'Auth',
  computed:{
    ...mapState('auth', ['loggedIn'])
  },
  methods:{
    ...mapActions('auth', ['logoutUser'])
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
