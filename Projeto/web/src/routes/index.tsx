import { ElementType, lazy, Suspense } from 'react';
import { Navigate, useLocation, useRoutes } from 'react-router-dom';
import LoadingScreen from '../components/LoadingScreen';
import { PATH_AFTER_LOGIN } from '../config';
import AuthGuard from '../guards/AuthGuard';
import GuestGuard from '../guards/GuestGuard';
import useAuth from '../hooks/useAuth';
import DashboardLayout from '../layouts/dashboard';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isAuthenticated } = useAuth();

  const isDashboard = pathname.includes('/dashboard') && isAuthenticated;

  return (
    <Suspense fallback={<LoadingScreen isDashboard={isDashboard} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        },
        { path: 'login-unprotected', element: <Login /> },
      ],
    },

    // Dashboard Routes
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },

        {
          path: 'student',
          children: [
            { element: <Navigate to="/dashboard/student" replace />, index: true },
            { path: 'list', element: <WishesList /> },
            { path: 'new', element: <WishesCreate /> },
            { path: ':id', element: <WishesCreate /> },
            { path: ':id/edit', element: <WishesCreate /> },
          ],
        },

        {
          path: 'teacher',
          children: [
            { element: <Navigate to="/dashboard/teacher" replace />, index: true },
            { path: 'list', element: <TeacherList /> },
            { path: 'new', element: <TeacherCreate /> },
            { path: ':id', element: <TeacherCreate /> },
            { path: ':id/edit', element: <TeacherCreate /> },
          ],
        },

        {
          path: 'class',
          children: [
            { element: <Navigate to="/dashboard/class" replace />, index: true },
            { path: 'list', element: <ClassList /> },
            { path: 'new', element: <ClassCreate /> },
            { path: ':id', element: <ClassCreate /> },
            { path: ':id/edit', element: <ClassCreate /> },
          ],
        },

        {
          path: 'task',
          children: [
            { element: <Navigate to="/dashboard/task" replace />, index: true },
            { path: 'list', element: <TaskList /> },
            { path: 'new', element: <TaskCreate /> },
            { path: ':id', element: <TaskCreate /> },
            { path: ':id/edit', element: <TaskCreate /> },
          ],
        },

        {
          path: 'discipline',
          children: [
            { element: <Navigate to="/dashboard/discipline" replace />, index: true },
            { path: 'list', element: <DisciplineList /> },
            { path: 'new', element: <DisciplineCreate /> },
            { path: ':id', element: <DisciplineCreate /> },
            { path: ':id/edit', element: <DisciplineCreate /> },
          ],
        },

        {
          path: 'deliveries',
          children: [
            { element: <Navigate to="/dashboard/deliveries" replace />, index: true },
            { path: 'list', element: <DeliveriesList /> },
            { path: 'new', element: <DeliveriesCreate /> },
            { path: ':id', element: <DeliveriesCreate /> },
            { path: ':id/edit', element: <DeliveriesCreate /> },
          ],
        },
      ],
    },

    // Main Routes
    {
      path: '*',
      children: [
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: '/',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [{ element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true }],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// AUTHENTICATION
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const Register = Loadable(lazy(() => import('../pages/auth/Register')));

const Page404 = Loadable(lazy(() => import('../pages/Page404')));

const WishesList = Loadable(lazy(() => import('../pages/dashboard/whishes/tableList/RequestList')));
const WishesCreate = Loadable(
  lazy(() => import('../pages/dashboard/whishes/createEdit/RequestsCreate'))
);

// TEACHER
const TeacherList = Loadable(
  lazy(() => import('../pages/dashboard/teacher/tableList/RequestList'))
);
const TeacherCreate = Loadable(
  lazy(() => import('../pages/dashboard/teacher/createEdit/RequestsCreate'))
);

// CLASS
const ClassList = Loadable(lazy(() => import('../pages/dashboard/class/tableList/RequestList')));
const ClassCreate = Loadable(
  lazy(() => import('../pages/dashboard/class/createEdit/RequestsCreate'))
);

// TASK
const TaskList = Loadable(lazy(() => import('../pages/dashboard/task/tableList/RequestList')));
const TaskCreate = Loadable(
  lazy(() => import('../pages/dashboard/task/createEdit/RequestsCreate'))
);

// DISCIPLINES
const DisciplineList = Loadable(
  lazy(() => import('../pages/dashboard/discipline/tableList/RequestList'))
);
const DisciplineCreate = Loadable(
  lazy(() => import('../pages/dashboard/discipline/createEdit/RequestsCreate'))
);

// DELIVERIES
const DeliveriesList = Loadable(
  lazy(() => import('../pages/dashboard/deliveries/tableList/RequestList'))
);
const DeliveriesCreate = Loadable(
  lazy(() => import('../pages/dashboard/deliveries/createEdit/RequestsCreate'))
);
