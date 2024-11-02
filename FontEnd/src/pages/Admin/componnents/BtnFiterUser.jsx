import React, { useState } from 'react'
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space } from 'antd';

export default function BtnFiterUser({ setComponet }) {
  const [lableBtnFiter, setLableBtnFiter] = useState('Tất cả tài khoản')
  const handleStatusBtn=(key,lable)=>{
    setComponet(key)
    setLableBtnFiter(lable)
  }
  const handleMenuClick = (e) => {
    switch (e?.key) {
      case '1':
        return (
        handleStatusBtn(1,'Tất cả tài khoản')
        );

      case '2':
        return ( handleStatusBtn(2,'Tài khoản nhân viên'));

      case '3':
        return ( handleStatusBtn(3,'Tài khoản khách hàng'));
      default:
        return null;
    }

  };
  const items = [
    {
      label: 'Tất cả tài khoản',
      key: '1',
      icon: <UserOutlined />,
    },
    {
      label: 'Tài khoản nhân viên',
      key: '2',
      icon: <UserOutlined />,
    },
    {
      label: 'Tài khoản khách hàng',
      key: '3',
      icon: <UserOutlined />,
    },
  ];
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <Space wrap>
      <Dropdown menu={menuProps}>
        <Button>
          <Space>
            {lableBtnFiter}
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </Space>
  )
}
