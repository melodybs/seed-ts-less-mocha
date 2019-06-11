<template>
  <button
    type="button"
    :class="classes"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'

@Component({ name: 'KbnButton' })
export default class KbnButton extends Vue {
  @Prop({ default: 'button' }) public type!: string
  @Prop({ default: false }) public disabled!: boolean

  public get classes (): string[] {
    const cls = this.type === 'text' ? ('-' + this.type) : ''
    return [`kbn-button${cls}`]
  }
  @Emit('click')
  public handleClick (ev: MouseEvent): MouseEvent {
    return ev
  }
}
</script>
<!--
<script>
export default {
  name: 'KbnButton',

  props: {
    type: {
      type: String,
      default: 'button'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    // 'type' 값에 따라 동적으로 클래스를 생성
    classes () {
      const cls = this.type === 'text' ? ('-' + this.type) : ''
      return [`kbn-button${cls}`]
    }
  },

  methods: {
    // 'click' 이벤트 발생
    handleClick (ev) {
      this.$emit('click', ev)
    }
  }
}
</script>
-->

<style lang="less" scoped>
.kbn-button {
  padding: .6em 1.3em;
}
.kbn-button-text {
  border: none;
  padding-right: 0;
  padding-left: 0;
}
</style>
