<template>
    <Header class="nav-header">
      <Col span="6" class="nav-title">
        {{systemName}}
      </Col>
      <Col span="4" offset="11" class="username">
        欢迎您，{{username}}！
      </Col>
      <Col span="2">
        <Button class="query-submit" type="primary" @click="logout">
          登出<Icon type="log-out" style="margin-left:6px"></Icon></Button>
      </Col>
    </Header>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'AppHeader',
  data () {
    return {
      username: 'admin',
      systemName: 'XXXXXX系统'
    }
  },
  methods: {
    ...mapActions(['LogOut']),
    logout () {
      this.LogOut().then(() => {
        location.reload()
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .nav-header {
    color: #fff;
    .nav-title {
      font-size: 26px;
    }
    .username {
      font-size: 16px;
    }
  }
</style>
