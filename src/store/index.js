import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'


export default createStore({
  state: {
    userID: ""
  },
  getters: {
  },
  mutations: {
    setUserID(state, ID) {
      state.userID = ID
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
