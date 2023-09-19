import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
   <React.StrictMode>
      <div className="prose h-screen w-screen flex flex-col justify-center items-center ">
         <header>
            <h1>Coucou</h1>
         </header>
         <main>
            <p>Salut</p>
            <p>
               Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet debitis deleniti
               eveniet in iure maxime odio optio quae unde ut.
            </p>
         </main>
      </div>
   </React.StrictMode>
)
