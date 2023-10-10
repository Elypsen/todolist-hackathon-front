import {Navigate} from 'react-router-dom';
import useAuthStore from '../store/store.auth.ts';

import MainContainer from '../components/main-container.styled.tsx';
import {ROUTES} from '../routes.constants.ts';
import {classed} from '@tw-classed/react';
import {Login, Signup} from '../types.shared.ts';


export function LoginPage() {
   const isLoggedIn = useAuthStore(state => state.isLoggedIn);
   const login = useAuthStore(state => state.login);

   if (isLoggedIn) return <Navigate to={ROUTES.index} />;

   const mockLogin: Login = {
      password: '123456',
      username: 'myusername',
   };
   const mochSignup: Signup = {
      ...mockLogin,
      email: 'myusername@mail.com',
   };
   return (
      <MainContainer withFlex>
         <form className={'border-primary-content/20 mx-auto w-[600px] rounded-lg border p-12'}>
            <div className='mb-6'>

               <Label htmlFor='email'>Your email</Label>
               <Input
                  type='email'
                  value={'monmail@mail.com'}
                  id='email'
                  placeholder='name@flowbite.com'
                  required
               />
            </div>
            <div className='mb-6'>
               <Label htmlFor='password'>Your password</Label>
               <Input
                  value={'123456'}
                  type='password'
                  id='password'
                  required
               />
            </div>
            <div className='mb-6 flex items-start'>
               <div className='flex h-5 items-center'>
                  <CheckBox
                     id='remember'
                     type='checkbox'
                  />
               </div>
               <label
                  htmlFor='remember'
                  className='text-primary-content-90 ml-2 text-sm font-medium'>
                  Remember me
               </label>
            </div>
            <SubmitButton
               onClick={() => login(mockLogin)}
               type='submit'>
               Submit
            </SubmitButton>
         </form>
      </MainContainer>
   );
}

export const Input = classed(
   'input',
   'block w-full rounded-lg border border-primary-content/40 bg-primary-content p-2.5 text-sm text-base-100 focus:border-primary-focus focus:ring-2 focus:ring-primary-focus',
);
export const Label = classed('label', 'm-2 block text-sm font-medium text-primary-content-90');
export const CheckBox = classed(
   'input',
   'checkbox checkbox-primary h-4 w-4 rounded-sm',
);
export const SubmitButton = classed(
   'button',
   'btn btn-primary',
   'w-full rounded-lg px-5 py-2 text-center text-sm font-medium text-primary-content hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-primary-focus sm:w-auto',
);
