import axios from 'axios'

function getAllTodos({ commit }) {
  commit('toggleFetchStatus', true)

  axios.get('/api/todos').then(res => {
    commit('toggleFetchStatus', false)
    commit('updateTodoList', res.data.data)
  })
}

function updateTodo({ commit }, todo) {
  axios.put(`/api/todo/${todo.id}`, todo).then(res => {
    commit('updateTodo', res.data.data)
  })
}

function deleteTodo({ commit }, todo) {
  axios.delete(`/api/todo/${todo.id}`).then(() => {
    commit('deleteTodo', todo)
  })
}

function addTodo({ commit }, todo) {
  axios.post(`/api/todo`, todo).then(res => {
    commit('addTodo', res.data.data)
  })
}

function toggleAll({ commit }, status) {
  axios.put(`/api/todos`, { completed: status }).then(() => {
    commit('toggleAll', status)
  })
}

function setEditTodo({ commit }, todo) {
  commit('setEditTodo', todo)
}

function updateFilter({ commit }, filter) {
  commit('updateFilter', filter)
}

function cleanCompleteTodos({ commit }) {
  axios.delete(`/api/todos`, { data: { completed: true } }).then(res => {
    commit('cleanCompleteTodos', res.data.data)
  })
}

export default {
  getAllTodos,
  updateTodo,
  deleteTodo,
  setEditTodo,
  addTodo,
  toggleAll,
  updateFilter,
  cleanCompleteTodos
}
