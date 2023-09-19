export function Footer() {
   return (
      <footer className=" bg-base-200 m-4 w-screen rounded-lg shadow">
         <div className="mx-auto w-full max-w-screen-xl p-4 md:py-8">
            <div className="sm:flex sm:items-center sm:justify-between">
               <p className="mb-4 flex items-center sm:mb-0">
                  <img
                     src="https://flowbite.com/docs/images/logo.svg"
                     className="mr-3 h-8"
                     alt="Flowbite Logo"
                  />
                  <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
                     Flowbite
                  </span>
               </p>
               <ul className="mb-6 flex flex-wrap items-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:mb-0">
                  <li>
                     <p className="mr-4 hover:underline md:mr-6 ">About</p>
                  </li>
                  <li>
                     <p className="mr-4 hover:underline md:mr-6">Privacy Policy</p>
                  </li>
                  <li>
                     <p className="mr-4 hover:underline md:mr-6 ">Licensing</p>
                  </li>
                  <li>
                     <p className="hover:underline">Contact</p>
                  </li>
               </ul>
            </div>
            <hr className="my-6 border-gray-700 sm:mx-auto lg:my-8" />
            <span className="block text-sm text-gray-500 dark:text-gray-400 sm:text-center">
               © 2023 <p className="hover:underline">Flowbite™</p>. All Rights Reserved.
            </span>
         </div>
      </footer>
   )
}
