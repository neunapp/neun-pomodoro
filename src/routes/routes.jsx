import {
  createBrowserRouter,
} from "react-router-dom";

import { lazy, Suspense } from 'react';
import ProtectedRoute from './ProtectedRoute'

import TaskPage from "../pages/TaskPage"
import AddTaskPage from "../pages/AddTaskPage";
import UpdateTaskPage from "../pages/UpdateTaskPage";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";

const IndexPage = lazy(() => import('../pages/IndexPage') )
const HomePage = lazy(() => import('../pages/HomePage')); // forma de carga diferida

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage />,
    children: [
      {
        path: '',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "task",
        element: (
          <ProtectedRoute>
            <TaskPage />
          </ProtectedRoute>
        )
      },
      {
        path: "task/add",
        element: (
          <ProtectedRoute>
            <AddTaskPage />
          </ProtectedRoute>
        )
      },
      {
        path: "task/update/:idTask",
        element: (
          <ProtectedRoute>
            <UpdateTaskPage />
          </ProtectedRoute>
        )
      },
      {
        path: "users/login/",
        element: <LoginPage />
      },
      {
        path: "users/profile/",
        element: <ProfilePage />
      },
    ],
  },
  
]);