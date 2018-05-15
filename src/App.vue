<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'App',
  data() {
    return {
      userEmail: null,
      title: 'whatever'
    }
  },
  created: function() {
    if (firebase.auth().currentUser) {
      this.$store.dispatch('setUser', this.userEmail)
    } else {
      this.userEmail = null
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
