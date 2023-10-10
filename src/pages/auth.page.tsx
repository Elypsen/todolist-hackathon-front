import {Navigate} from 'react-router-dom';
import useAuthStore from '../store/store.auth.ts';

import MainContainer from '../components/main-container.styled.tsx';
import {ROUTES} from '../routes.constants.ts';
import {classed} from '@tw-classed/react';
import {Login, Signup} from '../types.shared.ts';
import {Tab} from '@headlessui/react';
import {useEffect, useState} from 'react';


export function LoginPage() {
   const isLoggedIn = useAuthStore(state => state.isLoggedIn);

   if (isLoggedIn) return <Navigate to={ROUTES.index} />;

   return (
      <MainContainer withFlex>
         <Tab.Group>
            <Tab.List className={'tabs tabs-boxed'}>
               <Tab className={'tab aria-selected:tab-active'}>Login</Tab>
               <Tab className={'tab aria-selected:tab-active'}>Signup</Tab>
            </Tab.List>
            <Tab.Panels>
               <Tab.Panel><LoginPanel /></Tab.Panel>
               <Tab.Panel><SignupPanel /></Tab.Panel>
            </Tab.Panels>
         </Tab.Group>

      </MainContainer>
   );
}

type UserFeedback = {
   status: 'idle' | 'loading' | 'success' | 'error';
   message: string;
}

const useLogin = () => {
   const [userFeedback, setUserFeedback] = useState<UserFeedback>({status: 'idle', message: ''});
   const [userData, setUserData] = useState<Login>({username: '', password: ''});
   const login = useAuthStore(state => state.login);

   const updatedUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserData({...userData, username: e.target.value});
   };

   const updatedPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserData({...userData, password: e.target.value});
   };

   useEffect(() => {
      console.log(userData);
   },[userData]);
   const handleSubmit = async (e) => {
      e.preventDefault();
      // console.log(userData);
      const response: Awaited<ReturnType<typeof login>> = await login(userData);
      // console.log(response);
      if (response.error) {
         // console.log(response.error);
         setUserFeedback({status: 'error', message: response.response});
         return;
      }
      setUserFeedback({status: 'success', message: response.response});
   };
   return {userFeedback, updatedUserName, updatedPassword, handleSubmit};

};
const LoginPanel = () => {
   const {userFeedback, updatedUserName, updatedPassword, handleSubmit} = useLogin();

   if (userFeedback.status === 'success') return <Navigate to={ROUTES.index} />;

   return (
      <form className={'border-primary-content/20 mx-auto w-[600px] rounded-lg border p-12'}>
         {userFeedback.status === 'error' && (
            <div className='toast toast-top toast-center'>
               <div className='alert alert-error'>
                  <span>{userFeedback.message}</span>
               </div>
            </div>)
         }
         <div className='mb-6'>
            <Label htmlFor='username'>Username</Label>
            <Input
               type='text'
               id='username'
               placeholder='username..'
               required
               onChange={updatedUserName}
            />
         </div>
         <div className='mb-6'>
            <Label htmlFor='password'>Your password</Label>
            <Input
               type='password'
               id='password'
               required
               onChange={updatedPassword}
            />
         </div>
         {/*<div className='mb-6 flex items-start'>*/}
         {/*   <div className='flex h-5 items-center'>*/}
         {/*      <CheckBox*/}
         {/*         id='remember'*/}
         {/*         type='checkbox'*/}
         {/*      />*/}
         {/*   </div>*/}
         {/*   <label*/}
         {/*      htmlFor='remember'*/}
         {/*      className='text-primary-content-90 ml-2 text-sm font-medium'>*/}
         {/*      Remember me*/}
         {/*   </label>*/}
         {/*</div>*/}
         <SubmitButton
            onClick={handleSubmit}
            type='submit'>
            Submit
         </SubmitButton>
      </form>
   );
};

const useSignup = () => {

   const signup = useAuthStore(state => state.signup);
   const [userFeedback, setUserFeedback] = useState<UserFeedback>({status: 'idle', message: ''});
   const [userData, setUserData] = useState<Signup>({username: '', password: '', email: ''});

   const updatedUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserData({...userData, username: e.target.value});

   };
   const updatedPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserData({...userData, password: e.target.value});

   };
   const updatedEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserData({...userData, email: e.target.value});
   };
   const handleSubmit = async (e) => {
      e.preventDefault();
      const response: Awaited<ReturnType<typeof signup>> = await signup(userData);
      console.log(response);
      if (response.error) {
         console.log(response.error);
         setUserFeedback({status: 'error', message: response.response});
         return;
      }
      setUserFeedback({status: 'success', message: response.response});

   };

   return {userFeedback, updatedUserName, updatedPassword, updatedEmail, handleSubmit};
};
const SignupPanel = () => {
   const {userFeedback, updatedUserName, updatedPassword, updatedEmail, handleSubmit} = useSignup();

   if (userFeedback.status === 'success') return <Navigate to={ROUTES.index} />;

   return (
      <form className={'border-primary-content/20 mx-auto w-[600px] rounded-lg border p-12'}>
         <div className='mb-6'>
            <Label htmlFor='username'>Username</Label>
            <Input
               type='text'
               id='username'
               placeholder='username..'
               required
               onChange={updatedUserName}
            />
         </div>
         <div className='mb-6'>
            <Label htmlFor='email'>Your email</Label>
            <Input
               type='email'
               id='email'
               placeholder='name@flowbite.com'
               required
               onChange={updatedEmail}
            />
         </div>
         <div className='mb-6'>
            <Label htmlFor='password'>Your password</Label>
            <Input
               type='password'
               id='password'
               required
               onChange={updatedPassword}
            />
         </div>
         {/*<div className='mb-6 flex items-start'>*/}
         {/*   <div className='flex h-5 items-center'>*/}
         {/*      <CheckBox*/}
         {/*         id='remember'*/}
         {/*         type='checkbox'*/}
         {/*      />*/}
         {/*   </div>*/}
         {/*   <label*/}
         {/*      htmlFor='remember'*/}
         {/*      className='text-primary-content-90 ml-2 text-sm font-medium'>*/}
         {/*      Remember me*/}
         {/*   </label>*/}
         {/*</div>*/}
         <SubmitButton
            onClick={handleSubmit}
            type='submit'>
            Submit
         </SubmitButton>
      </form>
   );
};
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
