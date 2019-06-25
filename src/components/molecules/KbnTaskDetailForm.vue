<template>
  <form
    class="task-detail-form"
    novalidate
  >
    <div class="form-item">
      <label for="task-name">{{ $t('M.KbnTaskDetailForm.label.taskName') }}</label>
      <input
        id="task-name"
        v-model="task.name"
        type="text"
      >
    </div>
    <div class="form-item">
      <label for="task-description">{{ $t('M.KbnTaskDetailForm.label.taskDesc') }}</label>
      <textarea
        id="task-description"
        v-model="task.description"
      />
    </div>
    <div class="form-actions">
      <KbnButton
        :disabled="progress"
        @click="handleClick"
      >
        {{ $t('M.KbnTaskDetailForm.button.edit') }}
      </KbnButton>
      <p
        v-if="progress"
        class="update-progress"
      >
        {{ $t('M.KbnTaskDetailForm.info.editing') }}
      </p>
      <p
        v-if="error"
        class="update-error"
      >
        {{ error }}
      </p>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import KbnButton from '@/components/atoms/KbnButton.vue'

@Component({
  name: 'KbnTaskDetailForm',
  components: {
    KbnButton
  }
})
export default class KbnTaskDetailForm extends Vue {
  @Prop({ required: true, default: () => {} }) public task!: object
  @Prop({ required: true }) public onupdate!: Function

  public progress: boolean = false
  public error: string = ''

  handleClick (ev: MouseEvent): void {
    // 수정 처리중에 중복 실해되지 않도록 방지하는 가드
    if (this.progress) { return }

    this.progress = true

    this.$nextTick((): void => {
      this.onupdate(this.task)
        .catch((err: Error): void => {
          this.error = err.message
        })
        .then((): void => {
          this.progress = false
        })
    })
  }
}
</script>

<!--
<script>
import KbnButton from '@/components/atoms/KbnButton.vue'

export default {
  name: 'KbnTaskDetailFrom',

  components: {
    KbnButton
  },

  props: {
    task: {
      type: Object,
      required: true,
      default: () => {}
    },
    onupdate: {
      type: Function,
      required: true
    }
  },

  data () {
    return {
      progress: false,
      error: ''
    }
  },

  methods: {
    handleClick (ev) {
      // 수정 처리 중에 중복 실행되지 않도록 방지하는 가드
      if (this.progress) { return }

      this.progress = true // 更新処理実行中

      this.$nextTick(() => {
        this.onupdate(this.task)
          .catch(err => {
            this.error = err.message
          })
          .then(() => {
            this.progress = false
          })
      })
    }
  }
}
</script>
-->

<style lang="less" scoped>
form {
  display: block;
  margin: 0 auto;
  text-align: left;
}
label {
  display: block;
}
input, textarea {
  width: 99%;
}
.form-actions {
  text-align: right
}
</style>
