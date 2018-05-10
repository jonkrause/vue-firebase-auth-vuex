import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

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
            facebookID: null,
            displayName: null,
            photoURL: null
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
      if (!payload.facebookID) {
        console.log("payload: ", payload)
        firebase.database().ref('users/' + firebase.auth().currentUser.uid).set({
          email: payload.email,
          id: firebase.auth().currentUser.uid,
        }).then((data) => {
          console.log('pushed')
        })
      } else {
        firebase.database().ref('users/' + firebase.auth().currentUser.uid).set({
          email: payload.email,
          id: firebase.auth().currentUser.uid,
          facebookID: payload.facebookID,
          displayName: payload.displayName,
          photoURL: payload.photoURL,
          birthday: payload.birthday
        }).then((data) => {
          console.log('pushed')
        })
      }


      commit('currentUser', {
        email: payload.email,
        id: firebase.auth().currentUser.uid,
        facebookID: payload.facebookID,
        displayName: payload.displayName,
        photoURL: payload.photoURL,
        birthday: payload.birthday
      })


      console.log(firebase.auth().currentUser)
    },
    setUser({commit}, payload) {

      // console.log(firebase.auth().currentUser)
      let fbUser = firebase.auth().currentUser.providerData[0]
      if (fbUser.uid.indexOf('@') > -1) {
        console.log('no facebook id')
        commit('currentUser', {
          email: firebase.auth().currentUser.email,
          id: firebase.auth().currentUser.uid
        })
      } else {
        // console.log(fbUser.uid)
        let userID = firebase.auth().currentUser.uid
        let userData = firebase.database().ref('users/' + userID)
        userData.on('value', (snapshot) => {
          // console.log(snapshot.val())
          commit('currentUser', snapshot.val())
        })
      }
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
    fbUserId(state) {
      return state.fbUserId
    },
    logout(state) {
      return state.currentUser
    }
  }
})
