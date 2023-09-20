import {Navigate} from 'react-router-dom'
import useAuthStore from '../store/store.auth.ts'

import MainContainer from '../components/main-container.styled.tsx'
import {ROUTES} from '../routes.constants.ts'
import {classed} from '@tw-classed/react'

export function LoginPage() {
   const isLoggedIn = useAuthStore(state => state.isLoggedIn);
   const login = useAuthStore(state => state.login);

   if (isLoggedIn) return <Navigate to={ROUTES.index} />;

   return (
      <MainContainer withFlex>
         <form className={'border-primary-content/20 mx-auto w-[600px] rounded-lg border p-12'}>
            <div className="mb-6">
               <Label htmlFor="email">Your email</Label>
               <Input
                  type="email"
                  value={'monmail@mail.com'}
                  id="email"
                  placeholder="name@flowbite.com"
                  required
               />
            </div>
            <div className="mb-6">
               <Label htmlFor="password">Your password</Label>
               <Input
                  value={'123456'}
                  type="password"
                  id="password"
                  required
               />
            </div>
            <div className="mb-6 flex items-start">
               <div className="flex h-5 items-center">
                  <CheckBox
                     checked
                     id="remember"
                     type="checkbox"
                  />
               </div>
               <label
                  htmlFor="remember"
                  className="text-primary-content-90 ml-2 text-sm font-medium">
                  Remember me
               </label>
            </div>
            <SubmitButton
               onClick={login}
               type="submit">
               Submit
            </SubmitButton>
         </form>
      </MainContainer>
   );
}

export const Input = classed(
   'input',
   'block w-full rounded-lg border border-primary/40 bg-gray-50 p-2.5 text-sm text-primary-content-90 focus:border-primary-focus focus:ring-blue-500'
);
export const Label = classed('label', 'm-2 block text-sm font-medium text-primary-content-90');
export const CheckBox = classed(
   'input',
   'focus:ring-3 h-4 w-4 rounded border border-primary/40 bg-gray-50 focus:ring-blue-300'
);
export const SubmitButton = classed(
   'button',
   'w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto'
);
