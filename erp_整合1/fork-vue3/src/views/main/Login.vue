<template>
  <div style="height: 100vh;overflow-x:hidden;display: flex; " :style="background">
    <div class="box">
      <div class="pre-box" ref="preRef">
        <h1
          style="margin-top: 150px;text-align: center;text-shadow: 4px 4px 3px rgba(0,0,0,.1);letter-spacing: 5px;color: white;">
          WELCOME</h1>
        <p
          style="height: 30px;line-height: 30px;text-align: center;margin: 20px 0;text-shadow: 4px 4px 3px rgba(0,0,0,.1);color: white;">
          JOIN US!</p>
        <div class="img-box">
          <img style="width: 100%" src="../../assets/background/login.png" alt="">
        </div>
      </div>
      <div class="register-box">
        <div class="title-box">
          <h1 style="text-align: center;letter-spacing: 5px">Register</h1>
        </div>
        <div class="input-box">
          <input v-model="regForm.userName" type="text" placeholder="username">
          <input v-model="regForm.passWord" type="password" placeholder="password"> 
        </div>
        <div class="button-box">
          <el-button style="float: right" @click="reg">Confirm</el-button>
          <P @click="mySwitch" style="margin-left: 30px">Existing account? Go to login</P>
        </div>
      </div>
      <div class="login-box">
        <div class="title-box">
          <h1 style="text-align: center;letter-spacing: 5px">Login</h1>
        </div>
        <div class="input-box">
          <input v-model="loginForm.userName" type="text" placeholder="username">
          <input v-model="loginForm.passWord" type="password" placeholder="password">
        </div>
        <div class="button-box">
          <el-button style="float: right;margin-right: 30px" @click="submit">Confirm</el-button>
          <P @click="mySwitch" style="margin-left: 30px">No account? Go to register</P>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {useRouter} from "vue-router"
import axios from 'axios';
import { ElMessage } from "element-plus"

export default {
  setup() {
    const { ref } = require("@vue/reactivity");
    const loginForm = ref({
      userName: '',
      passWord: ''
    })
    const regForm = ref({
      userName: '',
      passWord: ''
    })
    const preRef = ref('')
    let flag = ref(true)
    const router = useRouter()
    const mySwitch = () => {
      if (flag.value) {
        preRef.value.style.background = ''
        preRef.value.style.transform = 'translateX(100%)'
        preRef.value.style.transition = 'all 1s ease-in-out';
      }
      else {
        preRef.value.style.background = ''
        preRef.value.style.transform = 'translateX(0%)'
      }
      flag.value = !flag.value
    }
    function reg() {
      axios({
        method: 'post',
        url: 'http://localhost:10086/user/register',
        data: {
          userName: regForm.value.userName,
          passWord: regForm.value.passWord
        }
      }).then(res => {
        if (res.data === 1) {
          ElMessage({
            type: "success",
            message: "注册成功！"
          })
        } else {
          ElMessage({
            type: "error",
            message: "注册失败!"
          })
        }
      })
    }
    function submit() {
      axios({
        method: 'post',
        url: 'http://localhost:10086/user/login',
        data: {
          userName: loginForm.value.userName,
          passWord: loginForm.value.passWord
        }
      }).then(res => {
        if (res.data === 1) {
          localStorage.setItem("LOGIN_INFO",JSON.stringify({
            userName: loginForm.value.userName,
            passWord: loginForm.value.passWord
          }))
          router.push("/home")
          ElMessage({
            type: "success",
            message: "登录成功！"
          })
        } else {
          ElMessage({
            type: "error",
            message: "登录失败！请检查密码或者账户是否正确"
          })
        }
      })
    }
    return {
      mySwitch,
      loginForm,
      preRef,
      submit,
      regForm,
      reg,
      flag
    }
  },
  data() {
    return {
      background: {
        backgroundImage: 'url(' + require('../../assets/background/background.png') + ')',
        backgroundRepeat: 'repeat',
        backgroundSize: 'contain',
        backgroundAttachment: 'fixed',
      }
    }
  },
}



</script>

<style scoped>
.box {
  width: 850px;
  height: 480px;
  display: flex;
  position: relative;
  background-color: #47566966;
  margin: auto;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, .6);
  box-shadow: 4px 4px 3px rgba(0, 0, 0, .1);
}

.register-box,
.login-box {
  margin-top: -100px;
  flex: 1;
  height: 100%;
}

.pre-box {
  position: absolute;
  width: 400px;
  left: 25px;
  top: -20px;
  height: 115%;
  border-radius: 4px;
  background-color: #213959;
  box-shadow: 4px 4px 3px rgba(0, 0, 0, .1);
}

.title-box {
  height: 300px;
  line-height: 500px;
}

.input-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

input {
  width: 60%;
  height: 40px;
  margin-bottom: 20px;
  text-indent: 4px;
  border: 1px;
}

input:focus {
  color: #224574;
}

input:focus::placeholder {
  opacity: 0;
}

.img-box {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  margin: 20px auto;
  box-shadow: 4px 4px 3px rgba(0, 0, 0, .1);
}
</style>