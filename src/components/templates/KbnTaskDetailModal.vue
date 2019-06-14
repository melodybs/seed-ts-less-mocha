<template>
  <article class="task-detail-modal">
    <div class="wrapper">
      <div class="container">
        <header class="header">
          <KbnButton
            type="text"
            @click="handleCLose"
          >
            <KbnIcon name="close" />
          </KbnButton>
        </header>
        <section class="body">
          <KbnTaskDetailForm
            :task="task"
            :onupdate="handleClose"
          />
        </section>
      </div>
    </div>
  </article>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import KbnButton from '@/components/atoms/KbnButton.vue'
import KbnIcon from '@/components/atoms/KbnIcon.vue'
import KbnTaskDetailForm from '@/components/molecules/KbnTaskDetailForm.vue'

@Component({
  name: 'KbnTaskDetailModal',
  components: {
    KbnButton,
    KbnIcon,
    KbnTaskDetailForm
  }
})
export default class KbnTaskDetailModal extends Vue {
  public get task (): object {
    const id: number = parseInt(this.$route.params.id)
    return !Number.isNaN(id)
      ? { ...this.$store.getters.getTaskById(id) }
      : {}
  }

  private back (): void {
    this.$router.push({ path: '/' })
  }
  public handleClose (): void {
    this.back()
  }
  public handleUpdate (task: any): Promise<void> {
    return this.$store.dispatch('updateTask', task)
      .then((): void => {
        this.back()
      })
      .catch((err: Error): Promise<never> => Promise.reject(err))
  }
}
</script>

<!--
<script>
import KbnButton from '@/components/atoms/KbnButton.vue'
import KbnIcon from '@/components/atoms/KbnIcon.vue'
import KbnTaskDetailForm from '@/components/molecules/KbnTaskDetailForm.vue'

export default {
  name: 'KbnTaskDetailModal',

  components: {
    KbnButton,
    KbnIcon,
    KbnTaskDetailForm
  },

  computed: {
    task () {
      const id = parseInt(this.$route.params.id)
      return !Number.isNaN(id)
        ? {...this.$store.getters.getTaskById(id)}
        : {}
    }
  },

  methods: {
    back () {
      this.$router.push({ path: '/' })
    },

    handleClose () {
      this.back()
    },

    handleUpdate (task) {
      return this.$store.dispatch('updateTask', task)
        .then(() => {
          this.back()
        })
        .catch(err => Promise.reject(err))
    }
  }
}
</script>
-->

<style lang="less" scoped>
.task-detail-modal {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}
.wrapper {
  display: table-cell;
  vertical-align: middle;
}
.container {
  width: 480px;
  margin: 0 auto;
  padding: 8px;
  background-color: #fff;
  border-radius: 0.5em;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
}
.header {
  text-align: right;
}
.header button {
  width: 16px;
  cursor: pointer;
}
.body {
  width: 100%;
}
</style>
