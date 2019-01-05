# How to write a client View

```
client
├── common
│   ├── error
│   ├── polyfill
│   ├── type
│   └── util
├── features
│   └── todos
├── img
├── router
└── store
    └── todo
```

## How to write a new view?

First, it's a router-based application, so let's go through the `client/router/index.js`, add a new view with `/test` as it's route

```javascript
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      {
        path: '/test',
        component: () => import(/* webpackChunkName: "test" */ '../features/test/index.vue')
      },
      {
        path: '/todos',
        component: () => import(/* webpackChunkName: "todos" */ '../features/todos/index.vue')
      },
      { path: '*', redirect: '/todos' }
    ]
  })
}
```

As you can see, the `routes` part is quite clear. See [lazy-loading](https://router.vuejs.org/en/advanced/lazy-loading.html) for more information

Next, let's create a `client/features/test/index.vue`

```html
<template>
  <div class="test">hello {{ name }}, it is test view</div>
</template>

<script>
  export default {
    data() {
      return {
        name: 'world'
      }
    }
  }
</script>

<style lang="postcss" scoped>
  .test {
    font-size: 20px;
  }
</style>
```

Now, you can re-launch the server, and try following [http://127.0.0.1:3000/test](http://127.0.0.1:3000/test) to see the newly added test view
