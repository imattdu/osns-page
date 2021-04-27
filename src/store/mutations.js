import {UPDATE_LOGIN_STATUS, INIT_USER_INFO, QUIT}  from './mutations-type'
import storageUtils from "../utils/storageUtils";
export default {
  [UPDATE_LOGIN_STATUS] (state) {
    state.isLogin = !state.isLogin
    storageUtils.saveLoginStatus(state.isLogin)

  },
  [INIT_USER_INFO] (state, {userInfo}) {
    state.user = userInfo
    storageUtils.saveUserInfo(userInfo)
  },
  [QUIT] (state) {
    storageUtils.saveLoginStatus(false)
    storageUtils.saveUserInfo({})
    state.isLogin = false
    state.user = {}
  }
}
