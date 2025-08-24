import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider,createBrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import LoginScreen from './components/LoginScreen.jsx'
import RegisterPage from './components/RegisterPage.jsx'

const route = createBrowserRouter([
  {path:"/",element:<RegisterPage/>},
  {path:"/login",element:<LoginScreen/>},
  {path:"/deskbord",element:<App/>},
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={route}/>
  </StrictMode>,
)
