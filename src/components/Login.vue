<template>
  <div class="login">
    <h3>Sign In</h3>
    <input type="text" placeholder="Email" v-model="email"><br>
    <input type="password" placeholder="Password" v-model="password"><br>
    <button @click="login">Log In</button>
    <p>Don't have an account? <router-link to="/signup">Sign Up</router-link></p>
    <button @click="fbLogin">Facebook</button>
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
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            this.$store.dispatch('signIn', { email: this.email }).then(() => {
              this.$store.dispatch('setUser')
              alert('Signed in as ' + this.email)
            })
            this.$router.replace('home')
          },
          err => {
            alert('[ERROR] ' + err.message)
          }
        )
      this.$router.replace('home')
    },
    fbLogin: function() {
      var provider = new firebase.auth.FacebookAuthProvider()
      provider.addScope('user_location')
      provider.addScope('user_hometown')
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          var token = result.credential.accessToken
          var user = result.user
          console.log(user)
          // this.$store.dispatch('getFbId', user.providerData[0].uid)
          this.$store
            .dispatch('signIn', {
              email: user.email,
              id: firebase.auth().currentUser.uid,
              facebookID: user.providerData[0].uid,
              photoURL: user.providerData[0].photoURL,
              displayName: user.providerData[0].displayName
            })
            .then(() => {
              this.$store.dispatch('setUser')
            })
          this.$router.replace('home')
        })
        .catch(err => {
          console.log(err.code)
          console.log(err.message)
          console.log(err.email)
          console.log(err.credential)
        })
    }
  }
}
</script>

<style scoped>
.login {
  display: block;
}
</style>