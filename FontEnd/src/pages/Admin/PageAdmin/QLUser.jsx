import React, { useEffect, useState, memo } from 'react'
import { getAllCustomer, getAllUser, getAllEmployee, deleteUser } from '../../../componnents/Api/index';
import { Avatar, Button, Flex, Table, Tooltip, Input, ConfigProvider, message } from 'antd';
import { Link } from "react-router-dom";
import BtnFiterUser from '../componnents/BtnFiterUser';
import DeleteUser from './QLUser/DeleteUser';
import '../css/Table_Admin.css'
import ModalUser from './QLUser/ModalUser';

const QLUser = () => {
  const [dataUser, setDataUser] = useState()
  const [keyFiter, setKeyFilter] = useState(1)
  const [queryUser, setQueryUser] = useState('')
  const handleDeleteUser =  (idUser) => {
    const indexToDelete = dataUser.findIndex(item => item.id === idUser);
    if (indexToDelete !== -1) {
      deleteUser(idUser).then((res) => {
        if (res?.err == 0) {
          const newData = [...dataUser]; // Tạo một bản sao của mảng dataHospital
          newData.splice(indexToDelete, 1);
          setDataUser(newData);
          message.success("Xóa thành công người dùng")
        }
        else {
          message.warning(res?.mess)
        }
      })


    }
  }
  const columns = [
    {
      title: 'Họ và tên',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      render: (text) => (
        <Tooltip placement="topLeft" title={text}>
          {text || 'Chưa có thông tin'}
        </Tooltip>
      ),
      width: 150,
    },
    {
      title: 'Ảnh',
      dataIndex: 'avatar',
      align: 'center',
      key: 'avatar',
      render: (text) => <Avatar src={`${text}`} size={60} />,
      width: 150,
    },
    {
      title: 'Năm Sinh',
      dataIndex: 'namSinh',
      align: 'center',
      key: 'namSinh',
      ellipsis: {
        showTitle: false,
      },
      render: (item) => (
        <Tooltip placement="topLeft" title={item}>
          {item || 'Chưa có thông tin'}
        </Tooltip>
      ),
      width: 110,
    },
    {
      title: 'Địa Chỉ',
      dataIndex: 'diaChi',
      align: 'center',
      key: 'diaChi',
      ellipsis: {
        showTitle: false,
      },
      render: (diaChi) => (
        <Tooltip placement="topLeft" title={diaChi}>
          {diaChi || 'Chưa có thông tin'}
        </Tooltip>
      ),
    },
    {
      title: 'Giới Tính',
      dataIndex: 'gioiTinh',
      align: 'center',
      key: 'gioiTinh',
      ellipsis: {
        showTitle: false,
      },
      width: 100,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'sdt',
      align: 'center',
      key: 'sdt',
      ellipsis: {
        showTitle: false,
      },
      render: (sdt) => (
        <Tooltip placement="topLeft" title={sdt}>
          0{sdt}
        </Tooltip>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      align: 'center',
      key: 'email',
      ellipsis: {
        showTitle: false,
      },
      render: (email) => (
        <Tooltip placement="topLeft" title={email}>
          {email || 'Chưa có thông tin'}
        </Tooltip>
      ),
    },
    {
      title: 'Edit',
      dataIndex: 'Edit',
      align: 'center',
      key: 'Edit',
      ellipsis: {
        showTitle: false,
      },
      render: (Edit, record) => (
        <Flex gap={'10px'} wrap='wrap'>
          <Link to={`/admin/UpdateUser/${record?.id}`}>
            <Button type="primary" >Sửa</Button>
          </Link>

          <DeleteUser idUser={record?.id} handleDeleteUser={handleDeleteUser} />
        </Flex>
        // </div>
      ),
    },
  ];


  const handleDataUser = () => {

    switch (keyFiter) {
      case 1:
        return (
          getAllUser().then((res) => {
            setDataUser(res?.users?.rows)
          })
        );
      case 2:
        return (
          getAllEmployee().then((res) => {
            setDataUser(res?.response?.User?.rows)
          })
        )
      case 3:
        return (
          getAllCustomer().then((res) => {
            setDataUser(res?.respones?.Users?.rows)
          })
        );
      default:
        return (
          getAllUser().then((res) => {
            setDataUser(res?.users?.rows)
          })
        );
    }
  }



  useEffect(() => {
    handleDataUser()
  }, [keyFiter])
  useEffect(() => {
    getAllUser().then((res) => {
      setDataUser(res?.users?.rows)
    })
  }, [])


  return (
    <div className="container">
      <Flex justify='space-between' className='tools_Admin'>
        <Flex gap={20} >
          <BtnFiterUser setComponet={setKeyFilter} />
          <Input
            placeholder='Nhập tên người dùng'
            onChange={(e) => setQueryUser(e.target.value.toLocaleLowerCase())}
          />
        </Flex>

        <ModalUser setDataUser={setDataUser} />
      </Flex>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: '#3F95FD',
              headerColor: '#fff',
              borderColor: '#ccc',
              borderRadius: 10
            },
          },
        }}
      >
        <Table
          columns={columns} dataSource={dataUser?.filter((item) => item?.name?.toLocaleLowerCase()?.includes(queryUser))}
          pagination={{ pageSize: 5 }}
          bordered={true}
        />
      </ConfigProvider>

    </div>
  )
}
export default memo(QLUser)
