import Vue from 'vue'
import Vuex from 'vuex'

import todo from './todo'

import { isDev } from '../../server/core/util/env'

Vue.use(Vuex)

export function createStore() {
  return new Vuex.Store({
    modules: {
      todo
    },
    strict: isDev
  })
}
