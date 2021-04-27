<template>
  <el-row>

    <el-col :xs="24" :sm="17" :md="12">
      <el-form ref="user" :model="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input disabled v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="user.nickname"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">更新</el-button>
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
      form: {

      }
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
          this.$store.dispatch('initUserInfo', response.data)
          this.$message({
            type: 'success',
            message: '更新成功',
            duration:  1000,
            showClose: true
          });
        }
      ).catch(error=> {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>

</style>
