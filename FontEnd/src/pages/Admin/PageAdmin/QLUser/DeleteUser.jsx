import React from 'react'
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Modal, Space, message } from 'antd';
import { deleteUser } from '../../../../componnents/Api';
const { confirm } = Modal;

export default function DeleteUser({idUser,handleDeleteUser}) {
    const showDeleteConfirm = () => {
        confirm({
          title: 'Cảnh báo',
          icon: <ExclamationCircleFilled />,
          content: 'Dữ liệu sẽ mất về không thể khôi phục',
          okText: 'Có',
          okType: 'danger',
          cancelText: 'Không',
          onOk() {
            handleDeleteUser(idUser)
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      };
  return (
    <Space wrap>
    <Button onClick={showDeleteConfirm} danger type="primary">
      Delete
    </Button>
  </Space>
  )
}
