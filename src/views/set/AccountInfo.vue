<template>
  <el-row>

    <el-col v-if="isLogin" :xs="24" :sm="17" :md="12">
      <el-form ref="user" :model="user" label-width="80px">
        <el-form-item label="用户名">
          <el-input disabled v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="user.nickname"></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            action="http://192.168.96.7:8080/api/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="user.avatar" :src="user.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>

        </el-form-item>
        <el-form-item>
          <el-button @click="onSubmit">更新</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import {mapState} from 'vuex'
import axios from "axios";

export default {
  name: "AccountInfo",
  computed: {
    ...mapState(['isLogin', 'user']),
  },
  data() {
    return {
      imgUrl: ''
    }
  },
  mounted() {

  },
  methods: {
    onSubmit() {
      const url = '/accounts/update'
      const user = this.user
      axios.post(url, user).then(
        response => {
          if (response.data.success) {
            this.$store.dispatch('initUserInfo', response.data.data)
            this.$message({
              type: 'success',
              message: '更新成功',
              duration: 1000,
              showClose: true
            });
          } else {
            this.$message({
              type: 'error',
              message: '更新出错',
              duration: 1000,
              showClose: true
            });
          }

        }
      ).catch(error => {
        console.log(error)
      })
    },
    handleAvatarSuccess(res, file) {
      console.log(res)
      this.user.avatar = res
    },
  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
