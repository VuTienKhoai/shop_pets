import React, {  useEffect, useState } from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { Link } from 'react-router-dom';
import '../css/headerAdmin.css'
import { ReactComponent as Logo } from '../../../img/logo.svg'
import HeaderAdmin from '../componnents/HeaderAdmin';
import '../css/Admin_Menu.css'
import AdminHome from './QLHome/AdminHome';
import QLCategory from './QLCategory';
import QLOrder from './QLOrder';
import QLPets from './QLPets';
import QLUsets from './QLUser'
const { Header, Sider, Content } = Layout;

export default function AdminMenu({ dataUser,setInforUser }) {
  const [collapsed, setCollapsed] = useState(false);
  const [keyComponet, setComponet] = useState(0);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const handleMenuClick = (key) => {

    switch (key?.key) {
      case '0':
        return <AdminHome/>
      case '1':
        return <QLUsets />;

      case '2':
        return <QLPets />;

      case '3':
        return <QLCategory />;

      case '4':
        return <QLOrder />;
      default:
        return <AdminHome/>;
    }
  };
  useEffect(()=>{
    handleMenuClick(keyComponet)
  },[])
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} width={'230px'} height={'100vh'}>
        <div className="demo-logo-vertical" />
        {!collapsed ?
          <div className="header_logo_Admin">
            <div className="header_admin_logo">
              <Link to='/admin'><Logo /></Link>
            </div>
            (<Link to='/admin'>
              <div className="header_admin_title">
                <p>cute pets</p>
              </div>
            </Link>)
          </div>
          : (<div className="header_logo_Admin">
            <div className="header_admin_logo">
              <Link to='/admin'><Logo /></Link>
            </div>
          </div>)}
        <Menu
          className='menu_admin'
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['0']}
          onClick={(key) => setComponet(key)}
          items={[
            {
              key: '0',
              icon: <PieChartOutlined />,
              label: 'Thống kê',
            },
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'Quản lý người dùng',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'Quản lý thú cưng',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'Quản lý danh mục',
            },
            {
              key: '4',
              icon: <UploadOutlined />,
              label: 'Quản lý đơn hàng',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            defaultHoverBg={false}
            style={{
              fontSize: '16px',
              paddingTop: '10px',
              paddingRight: '20px'
            }}

          />
          <HeaderAdmin dataUser={dataUser} setInforUser={setInforUser} />

        </Header >

        <Content
          style={{
            padding: 24,
            minHeight: '100vh',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {/* Content */}
          {handleMenuClick(keyComponet)}
        </Content>
      </Layout>
    </Layout>
  )
}
