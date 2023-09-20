import {classed} from '@tw-classed/react'
import {Link, useLocation} from 'react-router-dom'
import {ROUTES} from '../routes.constants.ts'
import useAuthStore from '../store/store.auth.ts'

export default function Header() {
   const isLoggedIn = useAuthStore(state => state.isLoggedIn)
   const logout = useAuthStore(state => state.logout)
   const {pathname} = useLocation()
   return (
      <header>
         <nav className=" border-base-300 bg-base-200 w-screen px-4 py-2.5 lg:px-6">
            <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between">
               <h1 className="self-center whitespace-nowrap text-xl font-semibold">TodoList</h1>
               <nav className="flex items-center lg:order-2">
                  {isLoggedIn ? (
                     <>
                        <NavigationLink
                           active={pathname === ROUTES.index}
                           as={Link}
                           to={ROUTES.index}>
                           Home
                        </NavigationLink>
                        <NavigationLink
                           as={'button'}
                           onClick={logout}>
                           Log out
                        </NavigationLink>
                     </>
                  ) : (
                     <>
                        <NavigationLink
                           active={pathname === ROUTES.auth}
                           as={Link}
                           to={ROUTES.auth}>
                           Log in
                        </NavigationLink>
                     </>
                  )}
               </nav>
            </div>
         </nav>
      </header>
   )
}

const NavigationLink = classed(
   'a',
   'text-primary-content focus:ring-base-300 mr-2 rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-4 lg:px-5 lg:py-2.5',
   {
      variants: {
         active: {
            true: 'text-primary-content/60 underline underline-offset-2 decoration-primary-content/40',
         },
      },
   }
)
