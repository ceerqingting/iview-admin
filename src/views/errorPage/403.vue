<template>
  <div class="errPage-container">
    <Row>
      <Col :span="10">
        <h1 class="text-jumbo text-ginormous">拒绝访问!</h1>
        <h2>你没有权限访问该页面</h2>
        <p class="list-unstyled">
          <Button @click="back" type="primary" class="pan-back-btn">返回</Button>
          <Button @click="goHome" type="ghost" class="pan-back-btn">回首页</Button>
        </p>
      </Col>
      <Col :span="14">
        <img :src="errPng" width="412" height="312" alt="无权访问">
      </Col>
    </Row>
  </div>
</template>

<script>
import errPng from '@/assets/403.png'
export default {
  name: 'page403',
  data () {
    return {
      errPng: errPng + '?' + +new Date()
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    goHome () {
      this.$router.push({name: 'home'})
    }
  }
}
</script>

<style lang="less" scoped>
  .errPage-container {
    width: 800px;
    margin: 100px auto;
    .pan-gif {
      margin: 0 auto;
      display: block;
    }
    .pan-img {
      display: block;
      margin: 0 auto;
    }
    .text-jumbo {
      font-size: 60px;
      font-weight: 700;
      color: #484848;
      h2 {
        margin: 30px 0;
      }
    }
    .list-unstyled {
      font-size: 14px;
      margin: 12px 0;
    }
  }
</style>
