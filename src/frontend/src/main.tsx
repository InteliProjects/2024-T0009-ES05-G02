import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import { router } from './routes'
import './index.css'
import { DataIdProvider } from './context/IdCourse.jsx'
import { DataMinorProvider } from './context/isMinor.jsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DataIdProvider>
      <DataMinorProvider>
        <RouterProvider router={router} />
      </DataMinorProvider>
    </DataIdProvider>
  </React.StrictMode>,
)
