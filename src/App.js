
import React from 'react';
import Login from './components/LoginPage';
import SignUp from './components/SignUpPage';
import Navigate from './components/Navigate';
import Budget from './components/Budget';
import Expense from './components/Expense';
import GroupColab from './components/GroupColab';
import Navigate from './components/Navigate';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "signUp",
    element: <SignUp />,
  },
  {
    path: "dashboard",
    element: <Navigate />,
  },
])

function App() {
  return (

    <>
      <RouterProvider router={router} />
      <Navigate />
      <Expense />
      <Budget />
      <GroupColab />
    </>



  );
}

export default App;
