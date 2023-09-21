// authStore.ts
import {create} from 'zustand'

type AuthState = {
   isLoggedIn: boolean
}

type AuthActions = {
   login: () => void
   logout: () => void
}

const useAuthStore = create<AuthState & AuthActions>(set => ({
   isLoggedIn: false,
   login: () => {
      set({isLoggedIn: true})
      history.pushState('','','/')
   },
   logout: () => set({isLoggedIn: false}),
}))

export default useAuthStore
