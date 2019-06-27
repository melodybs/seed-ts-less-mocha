<template>
  <nav class="board-navigation">
    <nav class="locale-nav">
      <KbnLocaleButton />
    </nav>
    <div class="title">
      <h1>Kanban App</h1>
    </div>
    <div class="actions">
      <KbnButton
        @click="$emit('logout')"
        type="text"
      >
        {{ $t('C.M.KbnBoardNavigation.button.logout') }}
      </KbnButton>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import KbnButton from '@/components/atoms/KbnButton.vue'
import KbnLocaleButton from '@/components/molecules/KbnLocaleButton.vue'

@Component({
  name: 'KbnBoardNavigation',
  components: { KbnButton, KbnLocaleButton }
})
export default class KbnBoardNavigation extends Vue {}
</script>
<!--
<script>
import KbnButton from '@/components/atoms/KbnButton.vue'

export default {
  name: 'KbnBoardNavigation',

  components: {
    KbnButton
  }
}
</script>
-->

<style lang="less">
.board-navigation {
  display: flex;
  border-bottom: medium solid black;
}
.title {
  flex: 1;
}
h1 {
  margin: 0px;
}
.actions {
  width: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
}
button {
  cursor: pointer;
}
.locale-nav {
  text-align: right
}
</style>
