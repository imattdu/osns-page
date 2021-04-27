<template>
  <div>

    <el-row>

      <el-col :xs="24" :sm="17" :md="12">
        <div class="grid-content bg-purple-light">

          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                   class="demo-ruleForm">


            <el-form-item label="用户名" prop="username">
              <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
import storageUtils from "../utils/storageUtils";
import {mapState} from 'vuex'
export default {
  name: "Login",
  computed: {
    ...mapState(['user', 'isLogin'])
  },
  data() {

    let validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else {

        callback();
      }
    };

    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };

    return {
      ruleForm: {
        username: '',
        pass: '',
      },
      rules: {
        username: [{validator: validateUsername, trigger: 'blur'}],
        pass: [
          {validator: validatePass, trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {

          if (!(JSON.stringify(this.user)==='{}' || this.isLogin === true)) {

            this.$message({
              message: '退出后在登录',
              type: 'warning'
            });
            return
          }

          const url = '/accounts/login'
          const user = {
            username: this.ruleForm.username,
            password: this.ruleForm.pass
          }
          axios.post(url, user).then(
            response => {

              if (response.data.res == 'success') {
                console.log(response.data)
                this.$message({
                  message: '登录成功',
                  type: 'success',
                  showClose: true
                });
                storageUtils.saveLoginStatus(true)
                this.$store.dispatch('updateLoginStatus')
                this.$store.dispatch('initUserInfo', response.data)
                this.$router.replace('/note')
              } else {
                this.$message({
                  message: '用户名密码不匹配',
                  type: 'error'
                });
              }



            }
          ).catch(error => {
            console.log(error)
          })


        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>

</style>
