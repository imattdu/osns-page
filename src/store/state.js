import storageUtils from "../utils/storageUtils";

export default {
  isLogin: storageUtils.readLoginStatus(),
  user: storageUtils.readUserInfo(),
  note: {}
}
