import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    currentUser: null,
    fbUserId: null
  },
  mutations: {
    currentUser(state, payload) {
      state.currentUser = payload
      // console.log('currentUser: ' + payload)
    },
    fbUserId(state, payload) {
      state.fbUserId = payload
      // console.log('fbUserId: ' + payload)
    },
    logout(state, payload) {
      state.currentUser = null
      // console.log('currentUser: ' + state.currentUser)
    }
  },
  actions: {
    signUserUp({
      commit
    }, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          const newUser = {
            user_id: user.uid,
            email: payload.email
          }
          firebase.database().ref('users/' + user.uid).push(newUser).then(data => {
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
        commit('currentUser', payload)
        console.log(firebase.auth().currentUser)
    },
    setUser({commit}, payload) {
      if (firebase.auth().currentUser.email) {
        commit('currentUser', firebase.auth().currentUser.email)
      }
    },
    logout({commit}, payload) {
      commit('currentUser', null)
    },
    getFbId({
      commit
    }, payload) {
      commit('fbUserId', payload)
    }
  },
  getters: {
    currentUser(state) {
      return state.currentUser
    },
    fbUserId(state) {
      return state.fbUserId
    },
    logout(state) {
      return state.currentUser
    }
  }
})
