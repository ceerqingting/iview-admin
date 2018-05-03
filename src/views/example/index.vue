<template>
  <div>
    <p>list</p>
    <input type="text"/>
    <router-link :to="{path: '/example/add', query: {noCache: true}}">新增作业</router-link>
  </div>
</template>

<script>
export default {
  name: 'list'
}
</script>
