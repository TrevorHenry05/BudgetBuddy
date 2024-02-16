
import React from 'react';
import Login from './components/LoginPage';
import SignUp from './components/SignUpPage';
import Budget from './components/Budget';
import Expense from './components/Expense';
import ExpenseTracking from './components/ExpenseTracking';
import GroupColab from './components/GroupColab';
import Settings from './components/Settings';
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
    path: "groupColab",
    element: <GroupColab />,
  },
  {
    path: "settings",
    element: <Settings />,
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
