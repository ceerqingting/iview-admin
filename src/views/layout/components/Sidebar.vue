<template>
  <div>
    <Menu theme="light" :active-name="currentView" :style="{width:'200px',paddingTop:'20px'}" :accordion="true">
      <Submenu :name="item.name" v-for="(item,index) in routes" :key="index">
        <template slot="title">
          <Icon v-if="item.meta.icon" :type="item.meta.icon"></Icon>
          {{item.meta.title}}
        </template>
        <template  v-for="(childItem, childIndex) in item.children">
          <router-link :to="item.path + '/' + childItem.path" :key="childIndex">
            <MenuItem :name="childItem.name">{{childItem.meta.title}}</MenuItem>
          </router-link>
        </template>
      </Submenu>
    </Menu>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { deepClone } from '@/utils'
import { constantRouterMap } from '@/router'

export default {
  name: 'sidebar',
  created () {
  },
  computed: {
    ...mapGetters(['currentView']),
    routes () {
      const routeList = deepClone(this.$router.options.routes.slice(constantRouterMap.length))
      routeList.filter((item) => {
        if (item.meta.hidden) {
          return false
        }
        if (item.children.length) {
          item.children = item.children.filter((child) => {
            return !child.meta.hidden
          })
        }
      })
      return routeList
    }
  }
}
</script>
<style scoped>
  a {
    color: #333;
  }
</style>
