import {Navigate} from 'react-router-dom';
import useAuthStore from '../store/store.auth.ts';

import MainContainer from '../components/main-container.styled.tsx';
import {ROUTES} from '../routes.constants.ts';
import useTodoStore from '../store/todo/todo.store.ts';
import {twMerge} from 'tailwind-merge';
import {TrashIcon} from '@radix-ui/react-icons';


export default function HomePage() {
   const isLoggedIn = useAuthStore(state => state.isLoggedIn);
   const todos = useTodoStore(state => state.todos);
   const checkTodo = useTodoStore(state => state.checkTodo);

   if (!isLoggedIn) return <Navigate to={ROUTES.auth} />;


   return (
      <MainContainer withFlex>
         <h1  className={'text-primary-content text-3xl'}>TodoList</h1>
         {todos.map(todo => (
            <div key={todo.id} className={twMerge(
               'w-full flex items-center pl-4 gap-8 border rounded ',
               todo.isChecked
                  ? 'border-success opacity-40'
                  : 'border-primary/40',
            )}>
               <input
                  type='checkbox'
                  className={twMerge('checkbox focus:ring-3 h-4 w-4 rounded border focus:ring-blue-300 accent-primary',
                     todo.isChecked ?
                        'border-success bg-success checkbox-success'
                        : 'checkbox-primary')}
                  onChange={() => {
                     const response = checkTodo(todo);
                     console.log(response); // debug in console
                  }}
                  checked={todo.isChecked}
                  name='bordered-checkbox'
                  id={`bordered-checkbox-${todo.id}`}
               />
               <label
                  htmlFor={`bordered-checkbox-${todo.id}`}
                  className={twMerge('text-sm w-full py-4 ml-2 hover:cursor-pointer',
                     todo.isChecked
                        ? 'font-normal italic text-success'
                        : 'font-medium text-gray-300')}>{todo.description}</label>
               <span className={'flat-right pr-8'}><TrashIcon
                  className={'hover:text-error text-primary-content/20 hover:cursor-pointer'} width={20} height={20} /></span>
            </div>
         ))}
      </MainContainer>
   );
}

