<template>
  <div class="login" @keydown.enter="handleSubmit('formInline')">
    <div class="login-con">
      <Card :bordered="false">
        <p slot="title">
          欢迎登录
        </p>
        <div class="form-con">
          <Form ref="formInline" :model="formInline" :rules="ruleInline">
            <FormItem prop="user">
              <Input type="text" v-model="formInline.user" placeholder="请输入用户名" clearable>
                <Icon type="ios-person-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" v-model="formInline.password" placeholder="请输入密码" clearable>
                <Icon type="ios-locked-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSubmit('formInline')" long>
                <Icon type="log-in" style="margin-right:6px"></Icon>
                登录
              </Button>
            </FormItem>
          </Form>
        </div>
      </Card>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'login',
  data () {
    return {
      formInline: {
        user: '',
        password: ''
      },
      ruleInline: {
        user: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions(['Login']),
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.loginRequest(this.formInline.user, this.formInline.password)
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    loginRequest (username, password) {
      this.Login({
        username: username,
        password: password,
        userType: 'STAFF'
      }).then(() => {
        this.$Message.success('已登入!')
        this.$router.push({path: '/modulea/moduleachilda'})
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login {
  width: 100vw;
  height: 100vh;
  background-image: url('../../assets/bg_login.png');
  background-size: cover;
  background-position: center;
  &-con{
    position: absolute;
    right: 160px;
    top: 50%;
    transform: translateY(-60%);
    width: 300px;
    &-header{
      font-size: 16px;
      font-weight: 300;
      text-align: center;
      padding: 30px 0;
    }
    .form-con{
      padding: 10px 0 0;
    }
    .login-tip{
      font-size: 10px;
      text-align: center;
      color: #c3c3c3;
    }
  }
}
</style>
