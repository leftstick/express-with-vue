function toggleFetchStatus(state, status) {
  state.fetching = status
}

function updateTodoList(state, list) {
  state.list = list
}

function updateTodo(state, todo) {
  state.list = state.list.map(t => {
    if (t.id === todo.id) {
      return todo
    }
    return t
  })
}

function deleteTodo(state, todo) {
  state.list = state.list.filter(t => t.id !== todo.id)
}

function addTodo(state, todo) {
  state.list.unshift(todo)
}

function setEditTodo(state, todo) {
  state.editTodo = todo
}

function toggleAll(state, status) {
  state.list.forEach(todo => {
    todo.completed = status
  })
}

function updateFilter(state, filter) {
  state.filter = filter
}

function cleanCompleteTodos(state, list) {
  state.list = list
}

export default {
  toggleFetchStatus,
  updateTodoList,
  updateTodo,
  deleteTodo,
  setEditTodo,
  addTodo,
  toggleAll,
  updateFilter,
  cleanCompleteTodos
}
