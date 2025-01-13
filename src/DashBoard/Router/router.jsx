import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DashBoardLayOut from '../DashBoardLayOut/DashBoardLayOut';
import AuthLayOut from '../../Authentication/AuthLayOut';
import DashBoardHomePage from '../DashBoardPages/DashBoardHomePage';
import ProfileSettingPage from '../DashBoardPages/ProfileSettingPage';
import WhyPage from '../DashBoardPages/WhyPage';
import DonationPage from '../DashBoardPages/DonationPage';
import UserManage from '../DashBoardPages/UserManage';
import BlogManagePage from '../DashBoardPages/BlogManagePage';
import StoryManage from '../DashBoardPages/StoryManage';
import Login from '../components/AuthForms/Login';
import Register from '../components/AuthForms/Register';
import ForgetPassword from './email-confirm/ForgetPassword';
import VerifyEmailOtp from './email-confirm/verify-email-otp/VerifyEmailOtp';
import ResetPassword from './email-confirm/verify-email-otp/reset-password/ResetPassword';

// Dashboard Routes
const dashboardRoutes = [
  { path: '/', element: <DashBoardHomePage /> },
  { path: '/dashboard/why-manage', element: <WhyPage /> },
  { path: '/dashboard/story-manage', element: <StoryManage /> },
  { path: '/dashboard/user-manage', element: <UserManage /> },
  { path: '/dashboard/blogs-manage', element: <BlogManagePage /> },
  { path: '/dashboard/donation-manage', element: <DonationPage /> },
  { path: '/dashboard/profile-setting', element: <ProfileSettingPage /> },
];

// Authentication Routes
const authRoutes = [
  { path: '/auth/login', element: <Login /> },
  { path: '/auth/login/email-confirm', element: <ForgetPassword /> },
  { path: '/auth/login/email-confirm/verify-email-otp', element: <VerifyEmailOtp /> },
  { path: '/auth/login/email-confirm/verify-email-otp/reset-password', element: <ResetPassword /> },
  { path: '/auth/register', element: <Register /> },
];

// Main Router
const router = createBrowserRouter([
  {
    path: '/',
    element: <DashBoardLayOut />,
    children: dashboardRoutes,
  },
  {
    path: '/auth',
    element: <AuthLayOut />,
    children: authRoutes,
  },
]);

export default router;
