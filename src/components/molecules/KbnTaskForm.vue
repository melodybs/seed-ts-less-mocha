<template>
  <form
    class="task-form"
    novalidate
  >
    <div class="form-item">
      <input
        v-model="name"
        type="text"
        placeholder="태스크..."
      >
    </div>
    <div class="form-actions">
      <KbnButton
        :disabled="disableAddAction"
        @click="handleAdd"
      >
        추가
      </KbnButton>
      <KbnButton
        :disabled="progress"
        @click="handleCancel"
      >
        취소
      </KbnButton>
    </div>
    <div class="message">
      <p
        v-if="progress"
        class="add-progress"
      >
        추가 중...
      </p>
      <p
        v-if="error"
        class="add-error"
      >
        {{ error }}
      </p>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import KbnButton from '@/components/atoms/KbnButton.vue'
import { Prop } from 'vue-property-decorator'

@Component({
  name: 'KbnTaskForm',
  components: {
    KbnButton
  }
})
export default class KbnTaskForm extends Vue {
  @Prop({ required: true }) public listId!: number

  public name: string = ''
  public progress: boolean = false
  public error: string = ''

  public get disableAddAction (): boolean {
    return this.name.length === 0 || this.progress
  }

  handleAdd (): Promise<void> {
    this.progress = true
    this.error = ''

    const { name, listId } = this
    return this.$store.dispatch('addTask', { name, listId })
      .then((): void => {
        this.$emit('close')
      })
      .catch((err: Error): void => {
        this.error = err.message
      })
      .then((): void => {
        this.progress = false
        this.name = ''
      })
  }
  handleCancel (): void {
    this.$emit('close')
  }
}
</script>

<!--
<script>
import KbnButton from '@/components/atoms/KbnButton.vue'

export default {
  name: 'KbnTaskForm',

  components: {
    KbnButton
  },

  props: {
    listId: {
      type: Number,
      required: true
    }
  },

  data () {
    return {
      name: '',
      progress: false,
      error: ''
    }
  },

  computed: {
    disableAddAction () {
      return this.name.length === 0 || this.progress
    }
  },

  methods: {
    handleAdd () {
      this.progress = true
      this.error = ''

      const { name, listId } = this
      return this.$store.dispatch('addTask', { name, listId })
        .then(() => {
          this.$emit('close')
        })
        .catch(err => {
          this.error = err.message
        })
        .then(() => {
          this.progress = false
        })
    },

    handleCancel () {
      this.$emit('close')
    }
  }
}
</script>
-->

<style lang="less" scoped>
.task-form {
  margin: 8px;
  padding: 4px;
  border: thin solid black;
  border-radius: 0.5em;
}
.form-item {
  padding: 4px;
}
input {
  width: 100%;
  padding: 0;
}
.form-actions {
  display: flex;
  justify-content: space-between;
  padding: 4px;
}
</style>
