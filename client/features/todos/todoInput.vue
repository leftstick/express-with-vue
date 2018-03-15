<template>
  <form @submit.stop.prevent="_submitTodo" class="todo-input-form">
    <input class="new-todo" placeholder="What needs to be done?" v-model="todoText" />
    <input type="checkbox" class="toggle-all" :checked="isAllCompleted" @change="_toggleAll" />
  </form>
</template>

<script>
export default {
  props: {
    isAllCompleted: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      todoText: ''
    }
  },
  methods: {
    _toggleAll(e) {
      this.$emit('toggleAll', e.target.checked)
    },
    _submitTodo() {
      if (!this.todoText || !this.todoText.trim()) {
        return
      }
      this.$emit('addTodo', {
        text: this.todoText.trim(),
        completed: false
      })
      this.todoText = ''
    }
  }
}
</script>

<style lang="postcss" scoped>
.todo-input-form {
  .new-todo {
    position: relative;
    margin: 0;
    width: 100%;
    font-size: 24px;
    line-height: 1.4em;
    outline: none;
    color: inherit;
    padding: 16px 16px 16px 60px;
    border: none;
    box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
    font-weight: 200;
  }

  .toggle-all {
    position: absolute;
    top: 18px;
    left: -12px;
    text-align: center;
    cursor: pointer;
    appearance: none;
    outline: none;
    transform: rotate(90deg);
  }

  .toggle-all:before {
    content: '❯';
    font-size: 22px;
    color: #e6e6e6;
    padding: 10px 27px 10px 27px;
  }

  .toggle-all:checked:before {
    color: #737373;
  }
}
</style>
