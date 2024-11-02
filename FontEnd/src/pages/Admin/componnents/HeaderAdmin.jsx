import React from 'react'
import '../css/headerAdmin.css'
import { Link,useNavigate } from 'react-router-dom';
import {  Button, Dropdown, Space, message } from 'antd';
import { logout } from '../../../componnents/isCheckAuth/index'
export default function HeaderAdmin({ dataUser,setInforUser }) {
  const navigate = useNavigate()
  const handLogout = () => {
    logout();
    message.success('Đã đăng xuất!!')
    setInforUser('')
    navigate('/')
}
  const items = [
    {
      key: '1',
      label: (
        <Link to={'/Admin/ProfileAdmin/' + dataUser?.id}>
          Thông tin tài khoản
          </Link>
      ),
    },
    {
      key: '2',
      label: (
        <Button onClick={handLogout} size='middle' >
          Đăng xuất
        </Button>
      ),
    },
  ];
  return (
    <div className="header_Admin1">
      <div className="header_main1">
        <div className="header_info">
          <div className="header_input">
           
          </div>
          <Space direction="vertical">
            <Space wrap>
              <Dropdown
                menu={{
                  items,
                }}
                placement="bottom"
              >
                <Button type="primary" size='large'  ><strong>Tên tài khoản: </strong> {dataUser?.name}</Button>
              </Dropdown>
            </Space>
          </Space>
        </div>
      </div>
    </div>

  )
}
