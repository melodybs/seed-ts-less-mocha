<template>
  <section class="task-card">
    <div class="name">
      <router-link :to="{ name: 'taskDetailModal', params: { id } }">
        <h3>{{ name }}</h3>
      </router-link>
    </div>
    <div class="actions">
      <KbnButton
        type="text"
        @click="$emit('remove', { id, listId })"
      >
        <KbnIcon name="remove" />
      </KbnButton>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import KbnButton from '@/components/atoms/KbnButton.vue'
import KbnIcon from '@/components/atoms/KbnIcon.vue'

@Component({
  name: 'KbnTaskCard',
  components: {
    KbnButton,
    KbnIcon
  }
})
export default class KbnTaskCard extends Vue {
  @Prop({ required: true }) public id!: number
  @Prop({ required: true }) public name!: string
  @Prop({ default: '' }) public description!: string
  @Prop({ required: true }) public listId!: number
}
</script>

<!--
<script>
import KbnButton from '@/components/atoms/KbnButton.vue'
import KbnIcon from '@/components/atoms/KbnIcon.vue'

export default {
  name: 'KbnTaskCard',

  components: {
    KbnButton,
    KbnIcon
  },

  props: {
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    listId: {
      type: Number,
      required: true
    }
  }
}
</script>
-->

<style lang="less" scoped>
.task-card {
  display: flex;
}
.name {
  flex: 1;
}
.h3 {
  margin: 0px;
  font-size: 0.75em;
  text-align: left;
  padding-left: 8px;
}
a {
  text-decoration: none;
  color: #2c3e50;
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
