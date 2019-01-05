<template>
  <div class="todo-panel">
    <todo-input :isAllCompleted="isAllCompleted" @addTodo="addTodo" @toggleAll="toggleAll"></todo-input>
    <todo-list></todo-list>
    <todo-status
      :todoList="todoList"
      :remainingCount="remainingCount"
      :filter="filter"
      @updateFilter="updateFilter"
      @cleanCompleteTodos="cleanCompleteTodos"
    ></todo-status>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import todoInput from './todoInput'
import todoList from './todoList'
import todoStatus from './todoStatus'

export default {
  mounted() {
    this.getAllTodos()
  },

  computed: {
    ...mapGetters('todo', ['todoList', 'isAllCompleted', 'remainingCount', 'filter'])
  },

  methods: {
    ...mapActions('todo', ['getAllTodos', 'addTodo', 'toggleAll', 'updateFilter', 'cleanCompleteTodos'])
  },

  components: {
    todoInput,
    todoList,
    todoStatus
  }
}
</script>

<style lang="stylus" scoped>
.todo-panel
  width 100%
  background #fff
  position relative
  box-shadow 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1)
  font 14px Helvetica Neue, Helvetica, Arial, sans-serif
</style>
