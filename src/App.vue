<template>

  <div>

    <el-menu class="el-menu-demo" mode="horizontal">
      <el-menu-item style="color: #409EFF" @click="toIndex">在线学习笔记系统</el-menu-item>
      <el-menu-item v-if="isLogin" index="1">
        <router-link to="/note/add">添加笔记</router-link>
      </el-menu-item>
      <el-menu-item v-if="isLogin" index="2">
        <router-link to="/note">笔记</router-link>
      </el-menu-item>
      <el-menu-item v-if="isLogin" index="3">
        <router-link to="/tag">标签</router-link>
      </el-menu-item>
      <el-menu-item v-if="isLogin" index="4">
        <router-link to="/note/share">分享</router-link>
      </el-menu-item>
      <el-menu-item v-if="isLogin" index="5">
        <router-link to="/note/delete">回收站</router-link>
      </el-menu-item>
      <el-menu-item v-if="isLogin && user.is_super && user.is_super==1" index="6">
        <router-link to="/note/stat">统计</router-link>
      </el-menu-item>

      <el-menu-item v-if="isLogin" index="7">
        <router-link to="/user/person">个人中心</router-link>
      </el-menu-item>


      <el-menu-item v-if="isLogin">
        <el-dropdown :hide-on-click="false" @command="handleCommand">

          <span class="el-dropdown-link">
                <el-avatar :src="user.avatar"></el-avatar>

                {{ user.nickname }}<i v-if="user.is_super==1" class="el-icon-circle-check"></i><i class="el-icon-arrow-down el-icon--right"></i>
            </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="accountSet">账号设置</el-dropdown-item>
            <el-dropdown-item v-if="user.is_super==0" command="openSuper">开通会员</el-dropdown-item>
            <el-dropdown-item v-if="user.is_super==1" command="closeSuper">关闭会员</el-dropdown-item>
            <el-dropdown-item command="quit">退出</el-dropdown-item>
            <el-dropdown-item divided command="help">帮助</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>


      </el-menu-item>


      <el-menu-item v-if="!isLogin" index="6" @click="login">登录</el-menu-item>
      <el-menu-item v-if="!isLogin" index="7" @click="reg">注册</el-menu-item>


    </el-menu>

    <el-row>
      <el-col :xs="24" :sm="24" :md="24">
        <router-view/>
      </el-col>
    </el-row>


  </div>


</template>

<script>
import {mapState} from 'vuex'
import axios from "axios";

export default {
  name: 'App',
  data() {
    return {
      isCollapse: true,
      gridData: [],
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    }
  },
  computed: {
    ...mapState(['isLogin']),
    ...mapState(['user']),
  },
  methods: {
    toIndex() {
      this.$router.push('/note/')
    },
    toAdd() {
      this.$router.push('/note/add')
    },
    toNotes() {
      this.$router.push('/note')
    },
    toDelete() {
      this.$router.push('/note/delete')
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleCommand(command) {
      if (command == 'personInfo') {
        this.dialogFormVisible = true
      } else if (command == 'accountSet') {
        this.$router.push('/user/set')
      } else if (command == 'openSuper') {

        const url = '/accounts/update'
        const user = this.user
        user.is_super = 1
        axios.post(url, user).then(
          response => {
            if (response.data.success) {
              this.$store.dispatch('initUserInfo', response.data.data)
              this.$message({
                type: 'success',
                message: '会员开通成功',
                duration: 3000,
                showClose: true
              });
            } else {
              this.$message({
                type: 'error',
                message: '服务繁忙',
                duration: 3000,
                showClose: true
              });
            }

          }
        ).catch(error => {
          console.log(error)
        })

      } else if (command == 'closeSuper') {
        const url = '/accounts/update'
        const user = this.user
        user.is_super = 0
        axios.post(url, user).then(
          response => {
            if (response.data.success) {
              this.$store.dispatch('initUserInfo', response.data.data)
              this.$message({
                type: 'success',
                message: '会员已经关闭',
                duration: 3000,
                showClose: true
              });
            } else {
              this.$message({
                type: 'error',
                message: '服务繁忙',
                duration: 3000,
                showClose: true
              });
            }

          }
        ).catch(error => {
          console.log(error)
        })
      } else if (command == 'quit') {
        this.$store.dispatch('quit')
        const url = '/accounts/quit'
        const user = this.user
        axios.post(url, user).then(
          response => {
            if (response.data.success) {
              this.$message({
                message: response.data.message,
                type: 'info',
                showClose: true,
                duration: 3000
              });
            }

          }
        ).catch(error => {
          console.log(error)
        })
        this.$router.replace('/user/login')
      } else if (command == 'help') {
        this.$message({
          message: '注册需要先退出登录',
          showClose: true,
          duration: 3000
        });
      }

    },
    login() {
      this.$router.push('/user/login')
    },
    reg() {
      this.$router.push('/user/reg')
    }
  }

}
</script>

<style>

.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}


/* 编辑器初始高度 */
.ql-editor {
  min-height: 20rem;
}

.ql-container {
  overflow-y: auto;
  height: 25rem !important;
}

/*滚动条整体样式*/
.ql-container ::-webkit-scrollbar {
  width: 10px; /*竖向滚动条的宽度*/
  height: 10px; /*横向滚动条的高度*/
}

.ql-container ::-webkit-scrollbar-thumb { /*滚动条里面的小方块*/
  background: #666666;
  border-radius: 5px;
}

.ql-container ::-webkit-scrollbar-track { /*滚动条轨道的样式*/
  background: #ccc;
  border-radius: 5px;
}


a {
  text-decoration: none;
}

.router-link-active {
  text-decoration: none;
}


#content {
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  margin-top: 2px;

}


</style>
