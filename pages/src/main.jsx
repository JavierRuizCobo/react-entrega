import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter,RouterProvider,} from "react-router-dom";import PublicPage from './publicPage';
import LogInSignUp from './logInSignUp';
import AdminPage from './admin';
import ModeratorPage from './moderator';
import UserPage from './user';
import ErrorPage from './errorPage';


const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicPage />
  },
  {
    path: "/logInSignUp",
    element: <LogInSignUp />
  },
  {
    path: "/admin",
    element: <AdminPage />
  },
  {
    path: "/moderator",
    element: <ModeratorPage />
  },
  {
    path: "/user",
    element: <UserPage />
  },
  {
    path: "/error",
    element: <ErrorPage />
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
