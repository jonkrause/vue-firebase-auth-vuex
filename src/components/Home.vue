<template>
  <div class="home">

    <!-- <img class="profilePhoto" :src="currentUser.photoURL"><br>
    {{currentUser.displayName}}<br>
    <p>{{msg}}</p>{{currentUser}} -->

    <!-- <img class="profilePhoto" :src="currentUser.photoURL"><br>
    {{currentUser.displayName}}<br>
    <p>{{msg}}</p>{{currentUser}} -->
    {{msg}}<br>
    <button @click="logout">Logout</button>
    <button @click="update">Update</button>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'home',
  data() {
    return {
      msg: 'this is a cool thing',
      currentUser: null,
      error: null
    }
  },
  beforeCreate() {
    return this.msg = this.$store.getters.currentUser
  },
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.dispatch('logout')
          this.$router.replace('login')
        })
    },
    update() {
      this.msg = this.$store.getters.currentUser
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
