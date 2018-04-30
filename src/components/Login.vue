<template>
  <div class="login">
    <h3>Sign In</h3>
    <input type="text" placeholder="Email" v-model="email"><br>
    <input type="password" placeholder="Password" v-model="password"><br>
    <button @click="login">Log In</button>
    <p>Don't have an account? <router-link to="/signup">Sign Up</router-link></p>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login: function() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
          user => {
            alert('Signed in as ' + this.email)
            this.$router.replace('home')
          },
          err => {
            alert('[ERROR] ' + err.message)
          }
        )
      this.$router.replace('home')
    }
  }
}
</script>

<style scoped>
.login {
  display: block;
}
</style>