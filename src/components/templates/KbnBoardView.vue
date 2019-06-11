<template>
  <p>
    보드페이지
  </p>
</template>

<script lang="ts">
import Vue, { CreateElement, VNode } from 'vue'
import Component from 'vue-class-component'

@Component({ name: 'KbnBoardView' })
export default class KbnBoardView extends Vue {
  /* NOTE: ErrorBoundary가 동작하는지 확인하기 위한 코드
  render (h: CreateElement): VNode | void {
    throw new Error('렌더링에 실패했습니다!')
  } */
}
</script>
<!--
<script>
/* eslint-disable */
export default {
  name: 'KbnBoardView',
  render (h) {
    throw new Error('렌더링에 실패했습니다!')
  }
}
/* eslint-enable */
</script>
-->

<style lang="less" scoped></style>
