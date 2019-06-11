import store from '../store'
import { Route, RouteRecord } from 'vue-router'
import { NavigationGuard } from 'vue-router/types/router'

export const authorizeToken: NavigationGuard = (to: Route, from: Route, next: CallableFunction): void => {
  if (to.matched.some((record: RouteRecord): boolean => record.meta.requiresAuth)) {
    // 일치하는 라우트에 'requiresAuth' 메타 필드가 있으면 인증토큰 유무 확인
    // 여기서는 편의상 'auth.token'이 있는지만 확인하지만 서버에서 인증토큰 유효성 확인 필요.
    if (!store.state.auth || !store.state.auth.token) {
      next({ path: '/login' })
    } else {
      next()
    }
  } else {
    next()
  }
}
