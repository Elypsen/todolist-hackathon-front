import {Outlet} from 'react-router-dom'
import {Footer} from './footer.tsx'
import Header from './header.tsx'

export function MainLayout() {
   return (
      <section className={'flex flex-col items-center justify-between'}>
         <Header />
         <Outlet />
         <Footer />
      </section>
   )
}
