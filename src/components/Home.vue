<template>
  <div class="home">

    <div class="loader" v-if="!currentUser"></div>
    <div v-else>
      <p>
        Logged in as {{currentUser.username}}<br>
        {{currentUser.email}}<br>
      </p>
      <button @click="logout">Logout</button>
    </div>
    
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'home',
  data() {
    return {
      title: 'BxB Flex-Day Time Tracker',
      currentUser: null,
      error: null
    }
  },
  created: function() {
    this.update()
    // this.currentUser = this.$store.getters.currentUser
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

.loader,
.loader:before,
.loader:after {
  border-radius: 50%;
  width: 10px;
  height: 10px;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation: load7 1.8s infinite ease-in-out;
  animation: load7 1.8s infinite ease-in-out;
}
.loader {
  color: #3a3a3a;
  font-size: 10px;
  margin: 80px auto;
  position: relative;
  text-indent: -9999em;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
.loader:before,
.loader:after {
  content: '';
  position: absolute;
  top: 0;
}
.loader:before {
  left: -1.5em;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.loader:after {
  left: 1.5em;
}
@-webkit-keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
@keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}

</style>
