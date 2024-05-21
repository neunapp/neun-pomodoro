import {
  createBrowserRouter,
} from "react-router-dom";

import { lazy, Suspense } from 'react';

import TaskPage from "../pages/TaskPage"
import AddTaskPage from "../pages/AddTaskPage";
import UpdateTaskPage from "../pages/UpdateTaskPage";

const HomePage = lazy(() => import('../pages/HomePage')); // forma de carga diferida

export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <HomePage />
      </Suspense>
    ),
  },
  {
    path: "/task",
    element: <TaskPage />
  },
  {
    path: "/task/add",
    element: <AddTaskPage />
  },
  {
    path: "/task/update/:idTask",
    element: <UpdateTaskPage />
  },
]);