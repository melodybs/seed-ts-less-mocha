<template>
  <ul class="board-tasks">
    <li
      v-for="list in lists"
      :key="list.id"
    >
      <KbnTaskList v-bind="list" />
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import KbnTaskList from '@/components/organisms/KbnTaskList.vue'

@Component({
  name: 'KbnBoardTask',
  components: {
    KbnTaskList
  }
})
export default class KbnBoardTask extends Vue {
  @Prop({ default: () => [] }) lists!: []
}
</script>

<!--
<script>
import KbnTaskList from '@/components/organisms/KbnTaskList.vue'

export default {
  name: 'KbBoardTask',

  components: {
    KbnTaskList
  },

  props: {
    lists: {
      type: Array,
      default: () => []
    }
  }
}
</script>
-->

<style lang="less" scoped>
ul {
  display: flex;
  min-height: 100vh;
  list-style-type: none;
  margin: 16px;
  padding: 0;
}
ul li {
  width: 33%;
  margin-right: 8px;
  border: thin solid black;
  border-radius: 0.5em;
}
</style>
