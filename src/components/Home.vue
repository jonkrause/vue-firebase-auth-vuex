<template>
  <div class="home">
    {{msg}}<br>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'home',
  data() {
    return {
      msg: 'this is a cool thing'
    }
  },
  methods: {
    logout: function() {
      firebase.auth().signOut().then(() => {
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
</style>
