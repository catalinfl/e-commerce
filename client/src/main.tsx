import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { createBrowserRouter, RouterProvider, Route, RouterProviderProps } from "react-router-dom"
import Home from './pages/Home/Home'
import Cart from './components/Navbar/Navbar'
import Search from './pages/Search/Search'
import CardPage from './pages/CardPage/CardPage'
import { ReactElement } from 'react'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import { Provider } from "react-redux"
import { store, persistor } from "./redux/store"
import { PersistGate } from 'redux-persist/integration/react'
import { publicRequest } from './requestMethods'
import { useState } from "react"
import { ProductProps } from './components/Product/Product'


// const [products, setProducts] = useState<any>();






const router  = createBrowserRouter([
  { 
    path: '/',
    element: <Home />,
    errorElement: <h1> Insert error element </h1>
  },
  {
    path: `/product/:id`,
    element: <CardPage/>
  },
  {
    path: '/search',
    element: <Search />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  }
])



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null} >
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>   
)

