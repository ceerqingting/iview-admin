<template>
<div class="layout">
  <Layout>
    <app-header></app-header>
    <Layout>
      <Sider hide-trigger :style="{background: '#fff'}">
        <sidebar></sidebar>
      </Sider>
      <Layout :style="{padding: '0 24px 24px', overflow: 'hidden'}">
        <header :style="{height: '32px',marginTop: '20px'}">
          <tags-view></tags-view>
        </header>
        <Content :style="{padding: '24px', minHeight: '450px', background: '#fff', overflow: 'auto'}">
          <keep-alive :include="cachedViews">
            <router-view/>
          </keep-alive>
        </Content>
      </Layout>
    </Layout>
</Layout>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import Sidebar from './components/Sidebar'
import TagsView from './components/TagsView'
import AppHeader from './components/AppHeader'

export default {
  name: 'index',
  components: {
    Sidebar,
    TagsView,
    AppHeader
  },
  computed: {
    ...mapGetters(['cachedViews'])
  }
}
</script>

<style lang="less" scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
