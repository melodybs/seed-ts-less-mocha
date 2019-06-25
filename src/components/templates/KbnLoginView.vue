<template>
  <div class="login-view">
    <nav class="locale-nav">
      <KbnLocaleButton />
    </nav>
    <h1>Kanban App</h1>
    <KbnLoginForm :onlogin="handleLogin" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import KbnLoginForm from '@/components/molecules/KbnLoginForm.vue'
import KbnLocaleButton from '@/components/molecules/KbnLocaleButton.vue'

@Component({
  name: 'KbnLoginView',
  components: { KbnLoginForm, KbnLocaleButton }
})
export default class KbnLoginView extends Vue {
  public throwReject (err: Error): Promise<Error> {
    return Promise.reject(err)
  }
  public handleLogin (authInfo: object): Promise<void | Error> {
    return this.$store.dispatch('login', authInfo)
      .then((): void => {
        this.$router.push({ path: '/' })
      })
      .catch((err: Error): Promise<Error> => this.throwReject(err))
  }
}
</script>

<style lang="less" scoped>
.login-view {
  width: 320px;
  margin: auto;
}
h1 {
  margin: 0.5em
}
.locale-nav {
  text-align: right
}
</style>
