import React, { useState } from 'react';
import { Layout, Menu, Typography, Avatar, Dropdown, Button } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate, Outlet, and useLocation
import {
  UserOutlined,
  DashboardOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { RiTodoLine } from 'react-icons/ri';
import { BsFillQuestionOctagonFill } from 'react-icons/bs';
import { FaEdit, FaRegBell } from 'react-icons/fa';
import { IoWalletSharp } from 'react-icons/io5';
import { IoMdArrowDropdown } from 'react-icons/io';
import { CiSettings, CiLogout } from 'react-icons/ci';
import 'antd/dist/reset.css';
import AllNotification from '../components/AllNotification';
import brandLogo from '../../assets/BrandIcon.svg';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const menuItems = [
  {
    key: '1',
    icon: <DashboardOutlined />,
    label: 'Admin Dashboard',
    path: '/',
  },
  {
    key: '2',
    icon: <RiTodoLine />,
    label: 'WHY Management',
    path: '/dashboard/why-manage',
  },
  {
    key: '3',
    icon: <BsFillQuestionOctagonFill />,
    label: 'Story Management',
    path: '/dashboard/story-manage',
  },
  {
    key: '4',
    icon: <UserOutlined />,
    label: 'User Management',
    path: '/dashboard/user-manage',
  },
  {
    key: '5',
    icon: <FaEdit />,
    label: 'Blogs Management',
    path: '/dashboard/blogs-manage',
  },
  {
    key: '6',
    icon: <IoWalletSharp />,
    label: 'Donation Management',
    path: '/dashboard/donation-manage',
  },
  {
    key: '7',
    icon: <SettingOutlined />,
    label: 'Profile Setting',
    path: '/dashboard/profile-setting',
  },
];

function DashBoardLayOut() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const handleMenuClick = ({ key }) => {
    const selectedItem = menuItems.find((item) => item.key === key);
    if (selectedItem) {
      navigate(selectedItem.path);
    }
  };

  const user = {
    login: true,
    photoURL: 'https://github.com/shadcn.png',
    displayName: 'Hosain Ali',
    email: 'example@mail.com',
  };

  const navigateToSettings = () => {
    navigate('/dashboard/profile-setting');
  };

  const handleSignOut = () => {
    console.log('Sign Out');
  };

  const notificationMenu = (
    <div style={{ padding: '10px', width: '200px' }}>
      <AllNotification />
    </div>
  );

  const userMenu = (
    <div
      style={{
        padding: '10px',
        width: '200px',
        backgroundColor: '#E5E7EB',
        borderRadius: '5px',
      }}
    >
      <Button type="text" block icon={<CiSettings />} onClick={navigateToSettings}>
        Settings
      </Button>
      <Button type="text" block icon={<CiLogout />} onClick={handleSignOut}>
        Sign Out
      </Button>
    </div>
  );


  return (
    <Layout style={{ maxHeight: '100vh', overflow: 'hidden' }}>
      {/* Sidebar */}
      <Sider
        width={250}
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        style={{
          background: '#e6f3fe',
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: 50,
          overflow: 'auto',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            padding: '16px 0',
            fontSize: '18px',
            fontWeight: 'bold',
          }}
        >
          <img src={brandLogo} alt="logo" style={{ width: '100px' }} />
        </div>
        <Menu
          style={{ background: '#e6f3fe' }}
          mode="inline"
          onClick={handleMenuClick}
          selectedKeys={[
            menuItems.find((item) => item.path === location.pathname)?.key,
          ]}
          items={menuItems.map((item) => ({
            key: item.key,
            icon: item.icon,
            label: item.label,
            style:
              location.pathname === item.path
                ? { background: '#c0e9fc', color: '#111' }
                : {},
          }))}
        />
      </Sider>

      {/* Main Layout */}
      <Layout style={{ overflow: 'hidden' }}>
        {/* Header */}
        <Header
          style={{
            background: '#fff',
            padding: '0 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Title level={4} className="w-full">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center"></div>
              <div className="flex items-center gap-4">
                {/* Notification Dropdown */}
                <Dropdown overlay={notificationMenu} trigger={['click']} placement="bottomRight">
                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '40px',
                      height: '40px',
                      background: '#000',
                      borderRadius: '50%',
                    }}
                  >
                    <FaRegBell className="text-white" />
                  </div>
                </Dropdown>

                {/* User Dropdown */}
                <Dropdown overlay={userMenu} trigger={['click']} placement="bottomRight">
                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <Avatar src={user.photoURL} size="large" style={{ backgroundColor: '#000' }} />
                    <div className="flex items-center gap-1">
                      <p className="font-semibold text-sm">{user?.email}</p>
                      <IoMdArrowDropdown />
                    </div>
                  </div>
                </Dropdown>
              </div>
            </div>
          </Title>
        </Header>

        {/* Content with Outlet */}
        <Content
          id="content"
          style={{
            margin: '16px',
            padding: '16px',
            background: '#fff',
            height: 'calc(100vh - 64px)',
            overflowY: 'auto',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default DashBoardLayOut;
