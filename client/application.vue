<template>
    <div class="todoapp">
        <header class="header">
          <h1>todos</h1>
        </header>
        <router-view id="view"></router-view>
    </div>
</template>

<script>
// import { mapActions } from 'vuex'

export default {
  data() {
    return {
      
    }
  }
}
</script>

<style lang="postcss" scoped>
.todoapp {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  width: 550px;
}
.header {
  h1 {
    font-size: 100px;
    font-weight: 700;
    text-align: center;
    color: rgba(175, 47, 47, 0.15);
    text-rendering: optimizeLegibility;
  }
}
</style>
