import './common/polyfill'

import Vue from 'vue'
import { createStore } from './store'
import { createRouter } from './router'
import application from './application'

import { isDev } from '../server/core/util/env'

Vue.config.devtools = isDev

function createApp() {
  // create store and router instances
  const store = createStore()
  const router = createRouter()

  const app = new Vue({
    router,
    store,
    render: h => h(application)
  })

  return { app, router, store }
}

const { app } = createApp()

document.head.removeChild(document.querySelector('#splash-spinner'))
document.body.removeChild(document.querySelector('.spinner'))

app.$mount('#todoapp')
