<template>
  <div class="home">

    <!-- <img class="profilePhoto" :src="currentUser.photoURL"><br>
    {{currentUser.displayName}}<br>
    <p>{{msg}}</p>{{currentUser}} -->

    <!-- <img class="profilePhoto" :src="currentUser.photoURL"><br>
    {{currentUser.displayName}}<br>
    <p>{{msg}}</p>{{currentUser}} -->
    <!-- {{msg}}<br>
      {{currentUser}} -->

    <div v-if="!currentUser">
      loading...
    </div>
    <div v-else>
      <img class="profilePhoto" :src="currentUser.photoURL">
      <p>
        {{currentUser.displayName}}<br>
        {{currentUser.email}}<br>
        {{currentUser.birthday}}

      </p>
    </div>
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
  created() {
    this.update()
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
      setTimeout(() => {
        this.currentUser = this.$store.getters.currentUser

      }, 1000)
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
