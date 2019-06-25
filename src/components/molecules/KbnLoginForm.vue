<template>
  <form novalidate>
    <div class="form-item">
      <label for="email">
        {{ $t('M.KbnLoginForm.label.email') }}
      </label>
      <input
        id="email"
        v-model="email"
        type="text"
        autocomplete="off"
        placeholder="Ex: kanban@domain.com"
        @focus="resetError"
      >
      <ul class="validation-errors">
        <li v-if="!validation.email.format">
          {{ $t('M.KbnLoginForm.validation.email.format') }}
        </li>
        <li v-if="!validation.email.required">
          {{ $t('M.KbnLoginForm.validation.email.required') }}
        </li>
      </ul>
    </div>
    <div class="form-item">
      <label for="password">
        {{ $t('M.KbnLoginForm.label.password') }}
      </label>
      <input
        id="password"
        v-model="password"
        type="password"
        autocomplete="off"
        placeholder="예: xxxxxxxxxx"
        @focus="resetError"
      >
      <ul class="validation-errors">
        <li v-if="!validation.password.required">
          {{ $t('M.KbnLoginForm.validation.password.required') }}
        </li>
      </ul>
    </div>
    <div class="form-actions">
      <KbnButton
        :disabled="disableLoginAction"
        @click="handleClick"
      >
        {{ $t('M.KbnLoginForm.button.login') }}
      </KbnButton>
      <p
        v-if="progress"
        class="login-progress"
      >
        {{ $t('M.KbnLoginForm.info.progress') }}
      </p>
      <p
        v-if="error"
        class="login-error"
      >
        {{ error }}
      </p>
    </div>
  </form>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import KbnButton from '@/components/atoms/KbnButton.vue'

const REGEX_EMAIL: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const required: Function = (val: string): boolean => !!val.trim()

interface validationValue {
  [index: string]: { [index: string]: boolean }
}

@Component({
  name: 'KbnLoginForm',
  components: { KbnButton }
})
export default class KbnLoginFrom extends Vue {
  @Prop({ required: true }) public onlogin!: Function

  public email: string = ''
  public password: string = ''
  public progress: boolean = false
  public error: string = ''

  public get validation (): validationValue {
    // email, password 유효성 검사
    return {
      email: {
        required: required(this.email),
        format: REGEX_EMAIL.test(this.email)
      },
      password: {
        required: required(this.password)
      }
    }
  }
  public get valid (): boolean {
    const validation: validationValue = this.validation // 앞서 정의한 validation을 사용해 유효성 여부 반환
    const fields: string[] = Object.keys(validation)
    let valid: boolean = true
    for (let i: number = 0; i < fields.length; i++) {
      const field: string = fields[i]
      valid = Object.keys(validation[field]).every(
        (key: string): boolean => validation[field][key]
      )
      if (!valid) {
        break
      }
    }
    return valid
  }
  public get disableLoginAction (): boolean {
    // valid, progress 사용해 로그인 처리 가능 여부 판정
    return !this.valid || this.progress
  }

  public resetError (): void {
    this.error = ''
  }
  public handleClick (ev: MouseEvent): void {
    if (this.disableLoginAction) {
      return
    } // 사유가 있을 시 로그인 처리가 안 되도록 막는 가드

    this.progress = true // 로그인 처리 중임을 나타냄
    this.error = ''

    this.$nextTick(() => {
      this.onlogin({ email: this.email, password: this.password })
        .catch(
          (err: Error): void => {
            this.error = err.message
          }
        )
        .then(
          (): void => {
            this.progress = false
          }
        )
    })
  }
}
</script>
<!--
<script>
// KbnButton 임포트
import KbnButton from '@/components/atoms/KbnButton.vue'
// 이메일 주소 형식 정규표현식
const REGEX_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const required = val => !!val.trim()

export default {
  name: 'KbnLoginForm',

  components: {
    KbnButton
  },

  props: {
    onlogin: {
      type: Function,
      required: true
    }
  },

  data () {
    return {
      email: '',
      password: '',
      progress: false,
      error: ''
    }
  },

  computed: {
    validation () { // email, password 유효성 검사
      return {
        email: {
          required: required(this.email),
          format: REGEX_EMAIL.test(this.email)
        },
        password: {
          required: required(this.password)
        }
      }
    },

    valid () {
      const validation = this.validation // 앞서 정의한 validation을 사용해 유효 여부 반환
      const fields = Object.keys(validation)
      let valid = true
      for (let i = 0; i < fields.length; i++) {
        const field = fields[i]
        valid = Object.keys(validation[field])
          .every(key => validation[field][key])
        if (!valid) { break }
      }
      return valid
    },

    disableLoginAction () { // valid를 사용해 로그인 처리 가능 여부 판정, progress는 뒤에 설명
      return !this.valid || this.progress
    }
  },

  methods: {
    resetError () {
      this.error = ''
    },

    handleClick (ev) {
      if (this.disableLoginAction) { return } // 사유가 있을 시 로그인 처리가 안 되도록 막는 가드

      this.progress = true // 로그인 처리 중임을 나타냄
      this.error = ''

      this.$nextTick(() => {
        this.onlogin({ email: this.email, password: this.password })
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
input {
  width: 100%;
  padding: 0.5em;
  font: inherit;
}
ul {
  list-style-type: none;
  padding: 0;
  margin: 0.25em 0;
}
ul li {
  font-size: 0.5em;
}
.validation-errors {
  height: 32px;
}
.form-actions p {
  font-size: 0.5em;
}
</style>
