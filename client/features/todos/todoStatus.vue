<template>
  <div class="todo-status">
    <span class="todo-count"><strong>{{ remainingCount }}</strong>&nbsp;{{ remainingUnit }}</span>
    <ul class="filters">
      <li>
        <a :class="{selected: filter === 'all'}" href="" @click.stop.prevent="_updateFilter('all')">All</a>
      </li>
      <li>
        <a :class="{selected: filter === 'active'}" href="" @click.stop.prevent="_updateFilter('active')">Active</a>
      </li>
      <li>
        <a :class="{selected: filter === 'completed'}" href="" @click.stop.prevent="_updateFilter('completed')">Completed</a>
      </li>
    </ul>
    <button v-if="todoList.length - remainingCount" class="clear-completed" @click="_cleanCompleteTodos">
      Clear completed
    </button>
  </div>
</template>

<script>
export default {
  props: {
    todoList: {
      type: Array,
      required: true
    },
    remainingCount: {
      type: Number,
      required: true
    },
    filter: {
      type: String,
      required: true
    }
  },
  computed: {
    remainingUnit() {
      return this.remainingCount > 1 ? 'items left' : 'item left'
    }
  },
  methods: {
    _updateFilter(filter) {
      this.$emit('updateFilter', filter)
    },
    _cleanCompleteTodos() {
      this.$emit('cleanCompleteTodos')
    }
  }
}
</script>

<style lang="postcss" scoped>
.todo-status {
  color: #777;
  padding: 10px 15px;
  height: 20px;
  text-align: center;
  border-top: 1px solid #e6e6e6;
  height: 35px;

  .todo-count {
    float: left;
    text-align: left;
  }

  .filters {
    margin: 0;
    padding: 0;
    list-style: none;
    position: absolute;
    right: 0;
    left: 0;
    li {
        display: inline-block;
        a {
            color: inherit;
            margin: 3px;
            padding: 3px 7px;
            text-decoration: none;
            border: 1px solid transparent;
            border-radius: 3px;
        }

        a.selected {
            border-color: rgba(175,47,47,.2);
        }

        a:hover {
            border-color: rgba(175,47,47,.1);
        }
    }
  }

  .clear-completed,
  .clear-completed:active {
    float: right;
    position: relative;
    line-height: 20px;
    text-decoration: none;
    cursor: pointer;
    border: 0;
    background: none;
    font-size: 100%;
    vertical-align: baseline;
    font-family: inherit;
    font-weight: inherit;
    color: inherit;
    appearance: none;
    font-smoothing: antialiased;
    outline: none;
  }

  .clear-completed:hover {
      text-decoration: underline;
  }
}
</style>