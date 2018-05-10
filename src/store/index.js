import Vue from 'vue'
import Vuex from 'vuex'
import router from "../router"
import * as firebase from 'firebase'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    currentUser: null,
    fbData: null
  },
  mutations: {
    currentUser(state, payload) {
      state.currentUser = payload
      // console.log('mutation: ', payload)
    },
    logout(state, payload) {
      state.currentUser = null
    },
    fbData(state, payload) {
      console.log('mutation: ', payload)
      state.fbData = payload
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
        // console.log("payload: ", payload)
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
    },
    setUser({commit}, payload) {
      let fbUser = firebase.auth().currentUser.providerData[0]
      if (fbUser.uid.indexOf('@') > -1) {
        console.log('no facebook id')
        commit('currentUser', {
          email: firebase.auth().currentUser.email,
          id: firebase.auth().currentUser.uid
        })
      } else {
        let userID = firebase.auth().currentUser.uid
        let userData = firebase.database().ref('users/' + userID)
        userData.on('value', (snapshot) => {
          commit('currentUser', snapshot.val())
        })
      }
    },
    getFbData({commit}, payload) {
      // console.log('fbdatapayload: ', payload)
      // console.log('payload user: ', payload.user)
      var user = payload.user
      var token = payload.token
      var userObj = {}

      axios.get('https://graph.facebook.com/v2.11/' + user.providerData[0].uid + '?fields=id,name,about,birthday,hometown&access_token=' + token)
            .then(function (response) {
              console.log('axois response: ', response.data)

              userObj = {
                email: user.email,
                id: firebase.auth().currentUser.uid,
                facebookID: payload.user.providerData[0].uid,
                photoURL: payload.user.providerData[0].photoURL,
                displayName: payload.user.providerData[0].displayName,
                hometown: response.data.hometown,
                birthday: response.data.birthday
              }

            }).then(() => {
          commit('currentUser', userObj)
            }).then(() => {
              firebase.database().ref('users/' + firebase.auth().currentUser.uid).set({
                email: this.state.currentUser.email,
                id: this.state.currentUser.id,
                facebookID: this.state.currentUser.facebookID,
                displayName: this.state.currentUser.displayName,
                photoURL: this.state.currentUser.photoURL,
                birthday: this.state.currentUser.birthday,
                hometown: this.state.currentUser.hometown
              }).then((data) => {
                console.log('pushed userObj to firebase')
              })              
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
    fbUserId(state) {
      return state.fbUserId
    },
    fbData(state) {
      return state.fbData
    },
    logout(state) {
      return state.currentUser
    }
  }
})
