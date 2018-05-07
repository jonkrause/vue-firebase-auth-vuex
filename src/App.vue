<template>
  <div id="app">
    {{userEmail}}
    <router-view/>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'App',
  data() {
    return {
      msg: "ok cool",
      userEmail: firebase.auth().currentUser.email
    }
  },
  created: function() {
    console.log(this.userEmail)
    if (!firebase.auth().currentUser) {
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
