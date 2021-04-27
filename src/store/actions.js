import {UPDATE_LOGIN_STATUS, INIT_USER_INFO, QUIT}  from './mutations-type'

export default {

  updateLoginStatus({commit}) {
    commit(UPDATE_LOGIN_STATUS)
  },
  initUserInfo({commit}, userInfo) {
    commit(INIT_USER_INFO, {userInfo})
  },
  quit({commit}) {
    commit(QUIT)
  }

}
