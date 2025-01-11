import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DashBoardLayOut from '../DashBoardLayOut/DashBoardLayOut';
import DashBoardHomePage from '../DashBoardPages/DashBoardHomePage';
import ProfileSettingPage from '../DashBoardPages/ProfileSettingPage';
import WhyPage from '../DashBoardPages/WhyPage';
import DonationPage from '../DashBoardPages/DonationPage';
import UserManage from '../DashBoardPages/UserManage';
import BlogManagePage from '../DashBoardPages/BlogManagePage';
import StoryManage from '../DashBoardPages/StoryManage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashBoardLayOut />,
    children: [
      {
        path: '/',
        element: <DashBoardHomePage></DashBoardHomePage>,
      },
      {
        path: '/dashboard/why-manage',
        element: <WhyPage />,
      },
      {
        path: '/dashboard/story-manage',
        element: <StoryManage />,
      },
      {
        path: '/dashboard/user-manage',
        element: <UserManage />,
      },
      {
        path: '/dashboard/blogs-manage',
        element: <BlogManagePage />,
      },
      {
        path: '/dashboard/donation-manage',
        element: <DonationPage />,
      },
      {
        path: '/dashboard/profile-setting',
        element: <ProfileSettingPage />
      },
    ],
  },
]);

export default router;
