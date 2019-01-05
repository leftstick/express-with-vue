import axios from 'axios'

axios.defaults.baseURL = '/apis'

function getAllTodos({ commit }) {
  commit('toggleFetchStatus', true)

  axios.get('/todos').then(res => {
    console.log('res', res)
    commit('toggleFetchStatus', false)
    commit('updateTodoList', res.data.data)
  })
}

function updateTodo({ commit }, todo) {
  axios.put(`/todo/${todo.id}`, todo).then(res => {
    commit('updateTodo', res.data.data)
  })
}

function deleteTodo({ commit }, todo) {
  axios.delete(`/todo/${todo.id}`).then(() => {
    commit('deleteTodo', todo)
  })
}

function addTodo({ commit }, todo) {
  axios.post(`/todo`, todo).then(res => {
    commit('addTodo', res.data.data)
  })
}

function toggleAll({ commit }, status) {
  axios.put(`/todos`, { completed: status }).then(() => {
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
  axios.delete(`/todos`, { data: { completed: true } }).then(res => {
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
