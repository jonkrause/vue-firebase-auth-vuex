import Vue from 'vue'
import Vuex from 'vuex'
import router from "../router"
import * as firebase from 'firebase'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    currentUser: null
  },
  mutations: {
    currentUser(state, payload) {
      state.currentUser = payload
      // console.log('mutation: ', payload)
    },
    logout(state, payload) {
      state.currentUser = null
    }
  },
  actions: {
    signUserUp({
      commit
    }, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          const newUser = {
            id: user.uid,
            email: payload.email,
            username: payload.username
          }
          firebase.database().ref('users/' + user.uid).set(newUser).then(data => {
              commit('currentUser', newUser)
            })
            .catch((err) => {
              console.log(err)
            })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    signIn({commit}, payload) {
      const userId = firebase.auth().currentUser.uid
      firebase.database().ref('/users/' + userId).once('value').then((snap) => {
        console.log(snap.val())
        commit('currentUser', snap.val())
      })
      // commit('currentUser', {
      //   email: payload.email,
      //   id: firebase.auth().currentUser.uid,
      //   username: firebase.auth().currentUser.uid,
      // })
    },
    setUser({commit}, payload) {
      console.log('setUser action triggered')
      const userId = firebase.auth().currentUser.uid
      firebase.database().ref('/users/' + userId).once('value').then((snap) => {
        console.log(snap.val())
        commit('currentUser', snap.val())
      })
    },
    logout({
      commit
    }, payload) {
      commit('currentUser', null)
    }
  },
  getters: {
    currentUser(state) {
      return state.currentUser
    },
    logout(state) {
      return state.currentUser
    }
  }
})
