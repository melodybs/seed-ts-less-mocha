<template>
  <nav>
    <KbnButton
      class="locale-button"
      type="text"
      @click="localeChange('ko')"
    >
      {{ $t('M.KbnLocaleButton.ko') }}
    </KbnButton>
    <KbnButton
      class="locale-button"
      type="text"
      @click="localeChange('en')"
    >
      {{ $t('M.KbnLocaleButton.en') }}
    </KbnButton>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import KbnButton from '@/components/atoms/KbnButton.vue'
import i18n from '../../i18n'

@Component({
  name: 'KbnLocaleButton',
  components: { KbnButton }
})
export default class KbnLocaleButton extends Vue {
  public localeChange (localeStr: string): void {
    i18n.locale = localeStr
  }
}
</script>

<style lang="less" scoped>
.locale-button {
  cursor: pointer;
  line-height: 1em;
  color: #fff;
  background-color: #000;
  margin-left: 0.5em
}
</style>
