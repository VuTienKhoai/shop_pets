import React from 'react'
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Modal, Space } from 'antd';
const { confirm } = Modal;
export default function DeletePets({ idPet,handleDeleteUser }) {
  const showDeleteConfirm = () => {
    confirm({
      title: 'Cảnh báo',
      icon: <ExclamationCircleFilled />,
      content: 'Dữ liệu sẽ mất về không thể khôi phục',
      okText: 'Có',
      okType: 'danger',
      cancelText: 'Không',
      onOk() {
        handleDeleteUser(idPet) 
      },
      onCancel() {

      },
    });
  };
  return (
    <Space wrap>
      <Button onClick={showDeleteConfirm} danger type="primary">
        Xóa
      </Button>
    </Space>
  )
}
