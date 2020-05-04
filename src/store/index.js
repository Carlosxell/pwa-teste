import Vue from 'vue'
import Vuex from 'vuex'

const RESIZE_WINDOW = 'RESIZE_WINDOW';
const MENU_STATUS = 'MENU_STATUS';
const SW_PERMISSION = 'SW_PERMISSION';
const SW_INFO = 'SW_INFO';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    windowSize: {
      h: 0,
      w: 0,
    },
    menu: {
      open: false,
    },
    sw: {
      info: null,
      permission: ''
    }
  },
  getters: {
    getMenuStatus: (state) => { return state.menu.open },
    getWindowInfo: (state) => { return state.windowSize },
    getMenuInfo: (state) => { return state.menu },
    getSwInfo: (state) => { return state.sw },
  },
  mutations: {
    [RESIZE_WINDOW] (state, status) {
      state.windowSize = status;
    },
    [SW_INFO] (state, status) {
      state.sw.info = status;
    },
    [SW_PERMISSION] (state, status) {
      state.sw.permission = status;
    },
    [MENU_STATUS] (state, status) {
      const body = document.querySelector('body');
      const menuClass = 'menu--open';

      status.open ? body.classList.add(menuClass) : body.classList.remove(menuClass);
      state.menu = status;
    },
  },
  actions: {
    resizeWindow ({ commit }, payload) {
      commit(RESIZE_WINDOW, payload)
    },
    menuStatus ({ commit }, payload) {
      commit(MENU_STATUS, payload)
    },
    setSwInfo ({ commit }, payload) {
      commit(SW_INFO, payload)
    },
    setPermission ({ commit }, payload) {
      commit(SW_PERMISSION, payload)
    },
  }
})
