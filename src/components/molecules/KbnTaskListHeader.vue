<template>
  <section class="task-list-header">
    <div class="title">
      <h2>{{ name }}</h2>
    </div>
    <div class="actions">
      <KbnButton
        @click="$emit('add')"
        type="text"
      >
        <KbnIcon name="add" />
      </KbnButton>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import KbnButton from '@/components/atoms/KbnButton.vue'
import KbnIcon from '@/components/atoms/KbnIcon.vue'
import { Prop } from 'vue-property-decorator'

@Component({
  name: 'KbnTaskListHeader',
  components: {
    KbnButton,
    KbnIcon
  }
})
export default class KbnTaskListHeader extends Vue {
  @Prop({ required: true }) public name!: string
}
</script>

<!--
<script>
import KbnButton from '@/components/atoms/KbnButton.vue'
import KbnIcon from '@/components/atoms/KbnIcon.vue'

export default {
  name: 'KbnTaskListHeader',

  components: {
    KbnButton,
    KbnIcon
  },

  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>
-->

<style lang="less" scoped>
.task-list-header {
  display: flex;
  border-bottom: thin solid black;
}
.title {
  flex: 1;
}
h2 {
  margin: 0px;
  padding-left: 8px;
  font-size: 1.0em;
  text-align: left;
}
.actions {
  width: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
}
button {
  cursor: pointer;
}
</style>
