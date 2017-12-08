import VueTypes from 'vue-types'

export const TODO_SHAPE = VueTypes.shape({
  id: VueTypes.string,
  text: VueTypes.string,
  completed: VueTypes.bool
})

export const TODOS_SHAPE = VueTypes.arrayOf(TODO_SHAPE)
