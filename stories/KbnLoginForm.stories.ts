// Storybook API 'storiesOf' 임포트
import { storiesOf } from '@storybook/vue'
// 스토리 대상이 될 컴포넌트를 임포트
import KbnLoginForm from '@/components/molecules/KbnLoginForm.vue'

// 'storiesOf'에 스토리 종류(여기서는 'KbnLoginForm'라는 이름으로 등록)를 등록
storiesOf('KbnLoginForm', module)
  // 'add'에 "스토리명과 컴포넌트를 반환하는 함수"를 인자로 전달해서 스토리를 등록
  .add('기본 동작', () => ({
    components: { KbnLoginForm },
    template: '<kbn-login-form :origin="handleLogin" />',
    methods: {
      handleLogin (authInfo) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve()
          }, 2000)
        })
      }
    }
  }))
