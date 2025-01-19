import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import DashboardLayout from "../layouts/DashboardLayout";

import PrivateRoute from "./PrivateRoute";
import AdminHome from "../pages/dashboard/admin/AdminHome";
import AdminManageUsers from "../pages/dashboard/admin/AdminManageUsers";
import AdminManageTasks from "../pages/dashboard/admin/AdminManageTasks";
import BuyerHome from "../pages/dashboard/buyer/BuyerHome";
import BuyerAddTask from "../pages/dashboard/buyer/BuyerAddTask";
import BuyerPaymentHistory from "../pages/dashboard/buyer/BuyerPaymentHistory";
import BuyerPurchaseCoin from "../pages/dashboard/buyer/BuyerPurchaseCoin";
import BuyerTasks from "../pages/dashboard/buyer/BuyerTasks";
import WorkerHome from "../pages/dashboard/worker/WorkerHome";
import WorkerSubmission from "../pages/dashboard/worker/WorkerSubmission";
import WorkerTasklist from "../pages/dashboard/worker/WorkerTasklist";
import WorkerWithdrawls from "../pages/dashboard/worker/WorkerWithdrawls";
import AdminRoute from "./AdminRoute";
import BuyerRoute from "./BuyerRoute";
import TaskDetails from "../pages/dashboard/worker/TaskDetails";
import WorkerRoute from "./WorkerRoute";
import ErrorPage from "../pages/error/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement:<ErrorPage/>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "adminHome",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AdminHome />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AdminManageUsers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-tasks",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AdminManageTasks />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "buyerHome",

        element: (
          <PrivateRoute>
            <BuyerRoute>
              <BuyerHome />
            </BuyerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "add-tasks",
        element: (
          <PrivateRoute>
            <BuyerRoute>
              <BuyerAddTask />
            </BuyerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "payment-history",
        element: (
          <PrivateRoute>
            <BuyerRoute>
              <BuyerPaymentHistory />
            </BuyerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "purchase-coins",
        element: (
          <PrivateRoute>
            <BuyerRoute>
              <BuyerPurchaseCoin />
            </BuyerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "my-tasks",
        element: (
          <PrivateRoute>
            <BuyerRoute>
              <BuyerTasks />
            </BuyerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "workerHome",
        element: (
          <PrivateRoute>
            <WorkerRoute>
            <WorkerHome />
            </WorkerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "workerSubmissions",
        element: (
          <PrivateRoute>
            <WorkerRoute>
            <WorkerSubmission />
            </WorkerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "workerTaskList",
        element: (
          <PrivateRoute>
           <WorkerRoute>
           <WorkerTasklist />
           </WorkerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "workerTaskList/taskDetails/:id",
        element: (
          <PrivateRoute>
            <WorkerRoute>
            <TaskDetails />
            </WorkerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "workerWithdrawals",
        element: (
          <PrivateRoute>
            <WorkerRoute>
            <WorkerWithdrawls />
            </WorkerRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
