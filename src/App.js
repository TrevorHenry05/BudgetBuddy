import React from 'react';
import Login from './components/LoginPage';
import SignUp from './components/SignUpPage';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
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
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
