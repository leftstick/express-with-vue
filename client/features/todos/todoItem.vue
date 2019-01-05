<template>
  <li :class="{ completed: data.completed }" class="todo-item">
    <div v-if="data !== editData">
      <input class="toggle" type="checkbox" :checked="data.completed" @change.stop.prevent="_toggleStatus" />
      <label class="label" @dblclick="_setEditData(data)">{{ data.text }}</label>
      <button class="destroy" @click="_delete" />
    </div>

    <form v-if="data === editData" class="edit-form" @submit.stop.prevent="_finishEdit">
      <input class="edit" v-model="editValue" @blur="_setEditData()" />
    </form>
  </li>
</template>

<script>
import { TODO_SHAPE } from '../../common/type/todo'

export default {
  props: {
    data: TODO_SHAPE,
    editData: TODO_SHAPE
  },
  data() {
    return {
      editValue: (this.editData && this.editData.text) || ''
    }
  },
  watch: {
    editData(val) {
      this.editValue = (val && val.text) || ''
    }
  },
  methods: {
    _setEditData(data = null) {
      this.$emit('setEdit', data)
    },
    _finishEdit() {
      this.$emit('update', Object.assign({}, this.data, { text: this.editValue }))
      this._setEditData()
    },
    _toggleStatus() {
      this.$emit('update', Object.assign({}, this.data, { completed: !this.data.completed }))
    },
    _delete() {
      this.$emit('delete', this.data)
    }
  }
}
</script>

<style lang="stylus" scoped>
.todo-item
  position relative
  font-size 24px
  font-weight 200
  border-bottom 1px solid #ededed

  &.completed label
    color #d9d9d9
    text-decoration line-through

  &:hover .destroy
    display block

  .toggle
    height 40px
    width 40px
    text-align center
    position absolute
    top 0
    bottom 0
    margin auto 0
    border none
    appearance none
    cursor pointer
    outline none

    &:after
      content url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='-10 -18 100 135'><circle cx='50' cy='50' r='50' fill='none' stroke='#ededed' stroke-width='3'/></svg>")

    &:checked:after
      content url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='-10 -18 100 135'><circle cx='50' cy='50' r='50' fill='none' stroke='#bddad5' stroke-width='3'/><path fill='#5dc2af' d='M72 25L42 71 27 56l-4 4 20 20 34-52z'/></svg>")

  .label
    white-space pre-line
    word-break break-all
    padding 15px 60px 15px 15px
    margin-left 45px
    display block
    line-height 1.2
    transition color 0.4s

  .destroy
    display none
    position absolute
    outline none
    border 0
    background none
    top 0
    right 10px
    bottom 0
    width 40px
    height 40px
    margin auto 0
    font-size 30px
    color #cc9a9a
    margin-bottom 11px
    transition color 0.2s ease-out
    cursor pointer

    &:hover
      color #af5b5e

    &:after
      content "×"

  .edit-form
    display flex

    .edit
      position relative
      outline none
      color inherit
      display flex
      width 100%
      padding 15px 17px 15px 17px
      margin 0 0 0 43px
      border none
      font-weight 200
      font-size 24px
      line-height 1.2
</style>
