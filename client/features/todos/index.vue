<template>
    <div class="todo-panel">
      <todo-input :isAllCompleted="isAllCompleted" @addTodo="addTodo" @toggleAll="toggleAll"></todo-input>
      <todo-list></todo-list>
      <todo-status :todoList="todoList" :remainingCount="remainingCount" :filter="filter" @updateFilter="updateFilter" @cleanCompleteTodos="cleanCompleteTodos"></todo-status>
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
    ...mapGetters({
      todoList: 'todo/todoList',
      isAllCompleted: 'todo/isAllCompleted',
      remainingCount: 'todo/remainingCount',
      filter: 'todo/filter'
    })
  },

  methods: {
    ...mapActions({
      getAllTodos: 'todo/getAllTodos',
      addTodo: 'todo/addTodo',
      toggleAll: 'todo/toggleAll',
      updateFilter: 'todo/updateFilter',
      cleanCompleteTodos: 'todo/cleanCompleteTodos'
    })
  },

  components: {
    todoInput,
    todoList,
    todoStatus
  }
}
</script>

<style lang="postcss" scoped>
.todo-panel {
  width: 100%;
  background: #fff;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
  font: 14px Helvetica Neue, Helvetica, Arial, sans-serif;
}
</style>