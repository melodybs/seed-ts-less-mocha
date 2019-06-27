<template>
  <section>
    <div
      v-if="error"
      class="error"
    >
      <p class="display">
        {{ $t('G.ErrorBoundary.display') }}
      </p>
      <hr>
      <p class="message">
        {{ `$t('G.ErrorBoundary.message'): error.message` }}
      </p>
      <p class="info">
        {{ `$t('G.ErrorBoundary.info', 0): info` }}
      </p>
      <p>
        {{ `$t('G.ErrorBoundary.info', 1): error.stack` }}
      </p>
    </div>
    <template v-else>
      <slot />
    </template>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({ name: 'ErrorBoundary' })
export default class ErrorBoundary extends Vue {
  error: Error | null = null
  info: string | null = null

  errorCaptured (err: Error, vm: any, info: string) {
    this.error = err
    this.info = info
  }
}
</script>

<!--
<script>
export default {
  name: 'ErrorBoundary',

  data () {
    return {
      error: null,
      info: null
    }
  },

  errorCaptured (err, vm, info) {
    this.error = err
    this.info = info
  }
}
</script>
-->

<style lang="less" scoped>
.error {
  color: red;
  text-align: left;
}
</style>
