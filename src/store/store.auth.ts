// authStore.ts
import {create} from 'zustand';
import ky from 'ky';
import {Login, LoginRequestError, LoginRequestSuccess, Signup} from '../types.shared.ts';
import {ROUTES} from '../routes.constants.ts';

type AuthState = {
   isLoggedIn: boolean
}

type AuthActions = {
   login: (userLogin: Login) => Promise<{response: string, error: boolean}>
   logout: () => void
   getToken: () => string | null

   signup: (userSignup: Signup) => Promise<{response: string, error: boolean}>
}

const useAuthStore = create<AuthState & AuthActions>(set => ({
   isLoggedIn: false,
   login: async (userLogin: Login) => {
      const postReq = await ky.post(ROUTES.api.login, {json: userLogin});
      const res: LoginRequestSuccess | LoginRequestError = await postReq.json();
      console.log(res);
      if (!res.token) {
         return {response: res.message, error: true};
      } else {
         set({isLoggedIn: true});
         localStorage.setItem('token', res.token!);
         history.pushState('', '', ROUTES.index);
         return {response: res.message, error: false};
      }
   },
   logout: () => set({isLoggedIn: false}),
   getToken: () => {
      return localStorage.getItem('token');
   },
   signup: async (userSignup: Signup) => {
      const postReq = await ky.post(ROUTES.api.signup, {json: userSignup});
      const res: LoginRequestSuccess | LoginRequestError = await postReq.json();
      console.log(res);
      if (!res.token) {
         return {response: res.message, error: true};
      } else {
         history.pushState('', '', ROUTES.auth);
         return {response: res.message, error: false};
      }
   },
}));

export default useAuthStore;
