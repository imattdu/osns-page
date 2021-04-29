<template>
  <div>
    <el-row >
      <el-col :xs="24" :sm="17" :md="12">
        <div class="grid-content bg-purple-light">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

            <el-form-item label="用户名" prop="username">
              <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="昵称" prop="nickname">
              <el-input type="text" v-model="ruleForm.nickname" autocomplete="off"></el-input>
            </el-form-item>



            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "Login",
  data() {


    var validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else {

        callback();
      }
    };

    var validateNickname = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入昵称'));
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
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: '',
        nickname: '',
        pass: '',
        checkPass: ''
      },
      rules: {
        username: [{ validator: validateUsername, trigger: 'blur' }],
        nickname: [{ validator: validateNickname, trigger: 'blur' }],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const url = '/accounts/reg'
          const user = {
            username: this.ruleForm.username,
            nickname: this.ruleForm.nickname,
            password: this.ruleForm.pass
          }
          axios.post(url, user).then(
            response => {

              const res = response.data
              if (res.success) {
                this.$message({
                  message: '注册成功，可以登录',
                  type: 'success'
                });
                //this.$router.replace('/user/login')
              } else {
                if (res.code == 2001) {
                  this.$message({
                    message: res.message,
                    type: 'error',
                    showClose: true,
                    duration: 2000
                  });
                }
              }
              console.log(response.data)


            }
          ).catch(error=> {
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
