<template>
  <div class="login-view">
    <h1>Kanban App</h1>
    <KbnLoginForm :onlogin="handleLogin" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import KbnLoginForm from '@/components/molecules/KbnLoginForm.vue'

@Component({
  name: 'KbnLoginView',
  components: { KbnLoginForm }
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
</style>
