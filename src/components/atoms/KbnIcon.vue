<template>
  <span :class="classes">
    {{ icon }}
  </span>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Component({ name: 'KbnIcon' })
export default class KbnIcon extends Vue {
  @Prop({
    required: true,
    validator: (value: string): boolean => {
      return [ 'close', 'remove', 'add' ].indexOf(value) !== -1
    }
  }) private name!: string

  public get classes (): string[] {
    return [ 'kbn-icon', this.name ]
  }
  public get icon (): string | void {
    const name: string = this.name
    if (name === 'close' || name === 'remove') {
      return 'x'
    } else if (name === 'add') {
      return '+'
    }
  }
}
</script>
