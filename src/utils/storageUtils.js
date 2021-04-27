/*
向local中存储数据的工具模块
1. 向外暴露一个函数(功能)
   只有一个功能需要暴露
2. 向外暴露一个对象(包含多个功能)
   有多个功能需要暴露
 */
const TODOS_KEY = 'login_status_key'
const USER_KEY = 'user_info'
export default {
  readLoginStatus () {
    return JSON.parse(localStorage.getItem(TODOS_KEY) || false)
  },
  saveLoginStatus (login) {
    localStorage.setItem(TODOS_KEY, JSON.stringify(login))
  },
  readUserInfo () {
    return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
  },
  saveUserInfo (userInfo) {
    localStorage.setItem(USER_KEY, JSON.stringify(userInfo))
  }
}

/*
export function xxx() {

}

export function yyy () {

}*/
