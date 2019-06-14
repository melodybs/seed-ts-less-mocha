<template>
  <section class="board-view">
    <p
      v-if="progress"
      class="progress"
    >
      {{ message }}
    </p>
    <KbnBoardTask :lists="lists" />

    <!-- 태스크 상세 정보 모달이 들어갈 플레이스 홀더 -->
    <router-view />
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import KbnBoardNavigation from '@/components/molecules/KbnBoardNavigation.vue'
import KbnBoardTask from '@/components/organisms/KbnBoardTask.vue'
import { mapState } from 'vuex'

@Component({
  name: 'KbnBoardView',
  components: {
    KbnBoardNavigation,
    KbnBoardTask
  },
  computed: {
    ...mapState({
      lists: (state: any) => state.board.lists
    })
  }
})
export default class KbnBoardView extends Vue {
  public progress: boolean = false
  public message: string = ''

  created () {
    this.loadLists()
  }

  private setProgress (message: string): void {
    this.progress = true
    this.message = message
  }
  private resetProgress (): void {
    this.progress = false
    this.message = ''
  }
  public loadLists (): void {
    this.setProgress('로딩 중...')

    this.$store.dispatch('fetchLists')
      .catch((err: Error): Promise<never> => Promise.reject(err))
      .then(():void => {
        this.resetProgress()
      })
  }
  public handleLogout (): Promise<void> {
    this.setProgress('로그아웃 중...')

    return this.$store.dispatch('logout')
      .then((): void => {
        this.$router.push({ path: '/login' })
      })
      .catch((err: Error): Promise<never> => Promise.reject(err))
      .then((): void => {
        this.resetProgress()
      })
  }
}
</script>

<!--
<script>
import { mapState } from 'vuex'
import KbnBoardNavigation from '@/components/molecules/KbnBoardNavigation.vue'
import KbnBoardTask from '@/components/organisms/KbnBoardTask.vue'

export default {
  name: 'KbnBoardView',

  components: {
    KbnBoardNavigation,
    KbnBoardTask
  },

  data () {
    return {
      progress: false,
      message: ''
    }
  },

  computed: mapState({
    lists: state => state.board.lists
  }),

  created () {
    this.loadLists()
  },

  methods: {
    setProgress (message) {
      this.progress = true
      this.message = message
    },

    resetProgress () {
      this.progress = false
      this.message = ''
    },

    loadLists () {
      this.setProgress('로딩 중...')

      this.$store.dispatch('fetchLists')
        .catch(err => Promise.reject(err))
        .then(() => {
          this.resetProgress()
        })
    },

    handleLogout () {
      this.setProgress('로그아웃 중...')

      return this.$store.dispatch('logout')
        .then(() => {
          this.$router.push({ path: '/login' })
        })
        .catch(err => Promise.reject(err))
        .then(() => {
          this.resetProgress()
        })
    }
  }
}
</script>
-->
<!--
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

<style lang="less" scoped>
.board-view {
  border: medium solid black;
}
.progress {
  margin: auto;
}
</style>
