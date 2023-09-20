import {classed} from '@tw-classed/react'

const MainContainer = classed(
   'main',
   'bg-base-100 text-primary-content prose min-h-screen w-screen',
   {
      variants: {
         withFlex: {
            true: 'flex flex-col items-center justify-start gap-12 px-48 py-24',
         },
      },
   }
)
export default MainContainer
