<template>
    <el-row :gutter="20">
      <el-col :span="15">
        <div class="grid-content bg-purple">
        <el-image style="width: 800px; height: 500px"
                  :src="require('../assets/mainPage.png')"
                    fit="fill"></el-image>
      </div>
      </el-col>
      <el-col :span="9"><div class="grid-content bg-purple">
        <el-tabs type="border-card">
          <el-tab-pane label="管理员登录">
            <el-form ref="form" :model="loginForm" label-width="100px">
              <el-form-item label="管理员用户名">
                <el-input v-model="loginForm.name"></el-input>
              </el-form-item>
              <el-form-item label="管理员密码">
                <el-input v-model="loginForm.password"></el-input>
              </el-form-item>
                <el-button type="primary" @click="login">登录</el-button>
                <el-button>取消</el-button>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="管理员注册">
            <el-form ref="form" :model="registerForm" label-width="100px">
              <el-form-item label="管理员用户名">
                <el-input v-model="registerForm.name"></el-input>
              </el-form-item>
              <el-form-item label="管理员密码">
                <el-input v-model="registerForm.password"></el-input>
              </el-form-item>
              <el-button type="primary" @click="register">注册</el-button>
              <el-button>取消</el-button>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div></el-col>
    </el-row>
</template>

<script>
    export default {
        name: "LoginPage",
      data() {
        return {
          loginForm: {
            name: '',
            password:''
          },
          registerForm:{
            name: '',
            password:''
          }
        }
      },
      methods: {
        login() {
          this.$axios.get('http://localhost:8090/admin/login',{
            params:{
              'adminName':this.loginForm.name,
              'adminPassword':this.loginForm.password
            }
          }).then(res=>(
              res.data===true?this.$router.push('/main'):this.$message("登录失败")
          )).catch(function (error) {
            console.log(error)
          })
        },
        register(){
          this.$axios.get('http://localhost:8090/admin/registered',{
            params:{
              'adminName':this.registerForm.name,
              'adminPassword':this.registerForm.password
            }
          }).then(res=>(
            res.data===true?this.$message("注册成功"):this.$message("注册失败")
          )).catch(function (error) {
            console.log(error)
          })
        }
      }
    }
</script>

<style scoped>
  /*.el-row {*/
    /*margin-bottom: 20px;*/
  /*&:last-child {*/
     /*margin-bottom: 0;*/
   /*}*/
  /*}*/
  /*.el-col {*/
    /*border-radius: 4px;*/
  /*}*/
  /*.bg-purple-dark {*/
    /*background: #99a9bf;*/
  /*}*/
  /*.bg-purple {*/
    /*background: #d3dce6;*/
  /*}*/
  /*.bg-purple-light {*/
    /*background: #e5e9f2;*/
  /*}*/
  /*.grid-content {*/
    /*border-radius: 4px;*/
    /*min-height: 36px;*/
  /*}*/
  /*.row-bg {*/
    /*padding: 10px 0;*/
    /*background-color: #f9fafc;*/
  /*}*/
</style>
