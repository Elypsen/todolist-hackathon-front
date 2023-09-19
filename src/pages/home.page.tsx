import {Navigate, useLoaderData} from 'react-router-dom';
import useAuthStore from '../store/store.auth.ts';

import MainContainer from '../components/main-container.styled.tsx';
import {ROUTES} from '../routes.constants.ts';
import todoMockedData from '../store/todo/todo.mocked-data.ts';

export default function HomePage() {
   const isLoggedIn = useAuthStore(state => state.isLoggedIn);
   const data = useLoaderData()!;
   if (!isLoggedIn) return <Navigate to={ROUTES.auth} />;

   console.log(data);
   return (
      <MainContainer withFlex>
         <h1 className={'text-primary-content text-2xl'}>TodoList</h1>
         {todoMockedData.map(todo => (
            <p key={todo.id}>{todo.description}</p>
         ))}
      </MainContainer>
   );
}
