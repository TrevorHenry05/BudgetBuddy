import React from 'react';
import Login from './components/LoginPage';
import SignUp from './components/SignUpPage';
import Navigate from './components/Navigate';
import './App.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "signUp",
    element: <SignUp/>,
  },
  {
    path: "dashboard",
    element: <Navigate/>,
  },
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
