<template>
  <div>
    <el-menu v-if="isLogin"  class="el-menu-demo" mode="horizontal" >
      <el-menu-item @click="back"><i class="el-icon-back"></i>返回</el-menu-item>
      <el-menu-item index="1">
        <router-link to="/user/set/accountInfo">账号信息</router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link to="/user/set/userProfile">用户信息</router-link>
      </el-menu-item>
      <el-menu-item index="3">
        <router-link to="/user/set/loginInfo">登录信息</router-link>
      </el-menu-item>
    </el-menu>
    <div class="line"></div>
    <div class="mySet">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "Set",
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    };
  },
  computed: {
    ...mapState(['isLogin']),
    ...mapState(['user']),
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    back() {
      this.$router.replace('/note')
    },
    toAccountInfo() {
      this.$router.replace('/user/set/accountInfo')
    },
    toUserProfile() {
      this.$router.replace('/user/set/userProfile')
    }
  }
}
</script>

<style scoped>
.mySet{
  padding: 15px;
}
</style>
