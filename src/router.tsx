import {
   createBrowserRouter,
   createRoutesFromElements,
   Route,
   RouterProvider,
} from 'react-router-dom';
import {MainLayout} from './components/main-layout.tsx';
import {LoginPage} from './pages/auth.page.tsx';
import HomePage from './pages/home.page.tsx';
import {ROUTES} from './routes.constants.ts';
import todoMockedData from './store/todo/todo.mocked-data.ts';

/**
 * App point of the application
 * Provides Router and Navigation
 **/
export default function Router() {
   return <RouterProvider router={router}></RouterProvider>;
}

const loadData = async () => {
   console.log('loader has been called');
   return todoMockedData;
};
const router = createBrowserRouter(
   createRoutesFromElements(
      <Route
         loader={loadData}
         path={ROUTES.index}
         element={<MainLayout />}>
         <Route
            index
            element={<HomePage />}
         />
         <Route
            path={ROUTES.auth}
            element={<LoginPage />}
         />
      </Route>
   )
);
