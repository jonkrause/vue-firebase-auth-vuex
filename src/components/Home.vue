<template>
  <div class="home">
    <img class="profilePhoto" :src="currentUser.photoURL"><br>
    {{currentUser.displayName}}<br>
    <p>{{msg}}</p>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'home',
  data() {
    return {
      msg: 'this is a cool thing',
      currentUser: null
    }
  },
  created: function() {
    console.log('created')
    return this.currentUser = this.$store.getters.currentUser
  },
  computed: {
  },
  methods: {
    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$store.dispatch('logout')
        this.$router.replace('login')
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.profilePhoto {
  border-radius: 50%;
}
</style>
