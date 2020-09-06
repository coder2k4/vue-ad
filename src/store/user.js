import * as firebase from 'firebase'

class User {
  constructor (id) {
    this.id = id
  }
}

export default {
  state: {
    user: null
  },
  getters: {
    user (state) {
      return state.user
    },
    isUserLoggedIn (state) {
      return state.user !== null
    }
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    }
  },
  actions: {
    async registerUser ({ commit }, { email, password }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
        commit('setUser', new User(user.uid))
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async loginUser ({ commit }, { email, password }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const user = await firebase.auth().signInWithEmailAndPassword(email, password)
        commit('setUser', new User(user.uid))
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    autoLoginUser ({ commit }, user) {
      commit('setUser', new User(user.uid))
    },
    logoutUser ({ commit }) {
      firebase.auth().signOut()
      commit('setUser', null)
    }
    // With Promise
    // registerUser({commit}, {email, password}) {
    //     commit('clearError');
    //     commit('setLoading', true);
    //     firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
    //         commit('setUser', new User(user.uid))
    //         commit('setLoading', false);
    //     }).catch((error) => {
    //         commit('setError', error);
    //     })
    // }
  }
}
