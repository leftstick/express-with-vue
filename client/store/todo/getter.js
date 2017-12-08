const loading = state => state.fetching

const todoList = state => state.list

const editTodo = state => state.editTodo

const isAllCompleted = state => state.list.every(l => l.completed)

const remainingCount = state => state.list.filter(l => !l.completed).length

const filter = state => state.filter

export default {
  loading,
  todoList,
  editTodo,
  isAllCompleted,
  remainingCount,
  filter
}
