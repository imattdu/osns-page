<template>
  <el-row>
    <el-col :xs="24" :sm="17" :md="12">
      <el-form ref="form" :model="user_profile" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="user_profile.real_name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="user_profile.sex" placeholder="请选择性别">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="签名">
          <el-input v-model="user_profile.maxim"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="user_profile.address"></el-input>
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
  name: "UserProfile",
  mounted() {
    // 初始化用户详细信息
    const url = `/accounts/user/profile/${this.user.id}`
    axios.get(url).then(
      response => {
        const userprofile = response.data.data
        console.log(userprofile)
        if (response.data.data != {}) {
          this.user_profile = userprofile
        }
        this.user_profile.user_id = this.user.id
      }
    ).catch(error => {

    });
  },
  data() {
    return {
      user_profile: {
        real_name: '',
        sex: '',
        maxim: '',
        address: ''
      }
    }
  },
  computed: {
    ...mapState(['isLogin', 'user']),
  },
  methods: {
    onSubmit() {
      const url = `/accounts/userprofile`
      axios.put(url, this.user_profile).then(
        response => {
          if (response.data.success) {
            this.$message({
              type: 'success',
              message: '更新成功!',
              duration:  3000,
              showClose: true
            });
          }

        }
      ).catch(error => {

      });
    }
  }
}
</script>

<style scoped>

</style>
