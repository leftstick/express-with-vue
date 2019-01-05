<template>
  <div class="todoapp">
    <header class="header"><h1>todos</h1></header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
.todoapp
  display flex
  flex-direction column
  align-items center
  align-self center
  width 550px

.header
  h1
    font-size 100px
    font-weight 700
    text-align center
    color rgba(175, 47, 47, 0.15)
    text-rendering optimizeLegibility
</style>
