import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const types = {
  SET_CHECKOUT: 'SET_CHECKOUT',
  SET_USER: 'SET_USER',
  SET_DIALOG_SHOW: 'SET_DIALOG_SHOW'
}
const state = {
  checkFlag: false,
  user: {},
  dialogFlag: false
}
const mutations = {
  [types.SET_CHECKOUT] (state, flag) {
    if (flag) state.checkFlag = flag
  },
  [types.SET_USER] (state, user) {
    if (user) state.user = user
    else user = {}
  }
}
const actions = {
  setCheckout ({commit}, flag) {
    commit(types.SET_CHECKOUT, flag)
  },
  setUser ({commit}, user) {
    commit(types.SET_USER, user)
  },
  clearCurrentState ({commit}) {
    commit(types.SET_USER, null)
    commit(types.SET_CHECKOUT, false)
  }
}
const getters = {
  checkFlag: state => state.checkFlag,
  user: state => state.user
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store
