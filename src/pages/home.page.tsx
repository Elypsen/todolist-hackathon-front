import {Navigate} from 'react-router-dom'
import useAuthStore from '../store/store.auth.ts'

import MainContainer from '../components/main-container.styled.tsx'
import {ROUTES} from '../routes.constants.ts'
import useTodoStore from '../store/todo/todo.store.ts'
import {twMerge} from 'tailwind-merge'
import {classed} from '@tw-classed/react'


export default function HomePage() {
   const isLoggedIn = useAuthStore(state => state.isLoggedIn)
   const todos = useTodoStore(state => state.todos)
   const checkTodo = useTodoStore(state => state.checkTodo)

   if (!isLoggedIn) return <Navigate to={ROUTES.auth} />


   return (
      <MainContainer withFlex>
         <h1 className={'text-primary-content text-2xl'}>TodoList</h1>
         {todos.map(todo => (
            <div key={todo.id} className='w-full flex items-center pl-4 border rounded border-primary-content/40'>
               <TaskCheckBox checked={todo.isChecked}
                             isChecked={todo.isChecked ? 'ghost' : 'fill'}
                             onChange={() => {
                                const response = checkTodo(todo)
                                console.log(response) // debug in console
                             }}
                             type='checkbox'
                             value=''
                             name='bordered-checkbox'
               />
               <label htmlFor='bordered-checkbox-2'
                      className={twMerge('text-sm w-full py-4 ml-2 ', todo.isChecked ? 'font-normal italic opacity-40' : 'font-medium text-gray-300')}>{todo.description}</label>
            </div>
         ))}
      </MainContainer>
   )
}

const TaskCheckBox = classed(
   'input',
   'checkbox focus:ring-3 h-4 w-4 rounded border focus:ring-blue-300 accent-primary',
   {
      variants: {
         isChecked: {
            ghost: 'border-success bg-success checkbox-success',
            fill: 'checkbox-warning bg-warning',
         },
      },
   },
)
