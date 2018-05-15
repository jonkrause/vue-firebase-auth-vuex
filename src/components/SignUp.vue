<template>
  <div class="signup">
    <h3>Sign Up</h3>
    <input type="text" placeholder="Username" v-model="username"><br>
    <input type="text" placeholder="Email" v-model="email"><br>
    <input type="password" placeholder="Password" v-model="password"><br>
    <button @click="signUp">Sign Up</button>
    <p>Already have an account? <router-link to="/login">Login</router-link></p>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'SignUp',
  data() {
    return {
      email: '',
      password: '',
      username: ''
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser
    }
  },
  watch: {
    currentUser(value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    signUp() {
      this.$store.dispatch('signUserUp', {
        email: this.email,
        password: this.password,
        username: this.username
      })
    }
  }
}
</script>

<style>
.signup {
  display: block;
  text-align: center;
}
</style>