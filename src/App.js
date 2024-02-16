
import React from 'react';
import Login from './components/LoginPage';
import SignUp from './components/SignUpPage';
import Navigate from './components/Navigate';
import Budget from './components/Budget';
import Expense from './components/Expense';
import ExpenseTracking from './components/ExpenseTracking';
import GroupColab from './components/GroupColab';
import './App.css'

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
  {
    path: "budget",
    element: <Budget />,
  },
  {
    path: "expense",
    element: <Expense />,
  },
  {
    path: "expenseTracking",
    element: <ExpenseTracking />,
  },
  {
    path: "GroupColab",
    element: <GroupColab />,
  },
])

function App() {
  return (

    <>
      <RouterProvider router={router} />
    </>



  );
}

export default App;
