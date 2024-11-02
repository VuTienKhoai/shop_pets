import React from 'react'
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Modal, Space, message } from 'antd';
import { getAllCategory } from '../../../../componnents/Api';
import { deleteCategory } from '../../../../componnents/Api';
const { confirm } = Modal;

export default function DeleteCategory({ idCategorys, setFilterCategory }) {

  const handleDeleteCategory = () => {

    if (idCategorys) {
      deleteCategory(idCategorys).then((res) => {
        message.success(res?.mess)
        loadDataCategory();
      })
    }
    else {
      message.warning("Không thể tìm thấy danh mục này")
    }
  }
  const loadDataCategory = () => {
    getAllCategory().then((res) => (
      setFilterCategory(res?.categorys)
    ))
  }
  const showDeleteConfirm = () => {
    confirm({
      title: 'Cảnh báo',
      icon: <ExclamationCircleFilled />,
      content: 'Dữ liệu sẽ mất về không thể khôi phục',
      okText: 'Có',
      okType: 'danger',
      cancelText: 'Không',
      onOk() {
        handleDeleteCategory()

      },
      onCancel() {

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
