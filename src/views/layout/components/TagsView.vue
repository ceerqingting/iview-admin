<template>
  <div>
    <Col>
    <Tabs type="card" v-model="activeView"  @on-click="handleTab"  @on-tab-remove="closeSelectedTag">
      <TabPane closable v-for="tab in visitedViews" :label="tab.title" :name="tab.name" :key="tab.name"></TabPane>
    </Tabs>
    </Col>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Bus from '@/utils/bus'

export default {
  name: 'TagsView',
  computed: {
    ...mapGetters(['visitedViews', 'currentView']),
    activeView: {
      get () {
        return this.currentView
      },
      set (v) {
      }
    }
  },
  created () {
    this.addVisitedViews(this.$route)
    this.SET_CURRENT_VIEW(this.$route.name)
    Bus.$on('closeTag', (route) => {
      this.closeSelectedTag(route)
    })
  },
  watch: {
    $route (val) {
      this.SET_CURRENT_VIEW(val.name)
      this.addVisitedViews(val)
    }
  },
  methods: {
    ...mapMutations(['SET_CURRENT_VIEW']),
    ...mapActions(['addVisitedViews', 'delVisitedViews']),
    handleTab (name) {
      this.$router.push({ name })
    },
    isActive (route) {
      return route.path === this.$route.path || route.name === this.$route.name
    },
    closeSelectedTag (name) {
      let view
      this.visitedViews.forEach((item) => {
        if (item.name === name) {
          view = item
        }
      })
      this.$store.dispatch('delVisitedViews', view).then((views) => {
        if (this.isActive(view)) {
          const latestView = views.slice(-1)[0]
          if (latestView) {
            this.$router.push(latestView.path)
          } else {
            this.$router.push('/')
          }
        }
      })
    }
  }
}
</script>
