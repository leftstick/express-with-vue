<template>
    <ul class="todo-list">
      <todo-item v-for="todo of list" 
      :key="todo.id" 
      :editData="editTodo" 
      :data="todo" 
      @delete="deleteTodo" 
      @update="updateTodo" 
      @setEdit="setEditTodo"></todo-item>
    </ul>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import todoItem from './todoItem'

export default {
  computed: {
    ...mapGetters('todo', ['loading', 'todoList', 'editTodo', 'filter']),
    list() {
      return this.todoList.filter(todo => {
        if (this.filter === 'all') {
          return true
        }
        if (this.filter === 'active') {
          return !todo.completed
        }
        return todo.completed
      })
    }
  },
  methods: {
    ...mapActions('todo', ['deleteTodo', 'updateTodo', 'setEditTodo'])
  },
  components: {
    todoItem
  }
}
</script>

<style lang="postcss" scoped>
.todo-list {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>