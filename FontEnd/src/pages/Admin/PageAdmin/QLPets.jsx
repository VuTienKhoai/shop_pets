import React, { useEffect, useState } from 'react'
import { deletePet, getAllProDucts } from '../../../componnents/Api/index';
import { Table, Tooltip, Flex, Avatar, Button, Input, ConfigProvider, message } from 'antd';
import { Link } from "react-router-dom";

import DeletePets from './QLPets/DeletePets';
import InsertPets from './QLPets/InsertPets';
import { formatPrice } from './../../../componnents/Common/formatPrice';
export default function QLPets() {
  const [dataProducts, setProducts] = useState([])
  const [queryPets, setQueryPets] = useState('')
  
  const handleDeleteUser = (idUser) => {
    const indexToDelete = dataProducts.findIndex(item => item.id === idUser);
    if (indexToDelete !== -1) {
      deletePet(idUser).then((res) => {
        if (res?.err == 0) {
          const newData = [...dataProducts]; 
          newData.splice(indexToDelete, 1);
          setProducts(newData);
          message.success("Xóa thành công thú cưng")
        }
        else {
          message.warning(res?.mess)
        }
      })


    }
  }
  const columns = [
    {
      title: 'Tên thú cưng',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      render: (text) => <p>{text}</p>,
      width: 150,
    },
    {
      title: 'Ảnh',
      dataIndex: 'avatar',
      key: 'avatar',
      align: 'center',
      render: (text) => <Avatar src={`${text}`} size={60} />,
      width: 150,
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
      render: (price) => (
        <Tooltip placement="topLeft" title={price}>
          {formatPrice(price)} $
        </Tooltip>
      ),
      width: '10%',
    },
    {
      title: 'Mô tả',
      dataIndex: 'describe',
      key: 'describe',
      align: 'center',
      ellipsis: {
        showTitle: false,
      },
      render: (describe) => (
        <Tooltip placement="topLeft" title={describe}>
          {describe}
        </Tooltip>
      ),
    },
    {
      title: 'Thuộc Giống',
      dataIndex: 'species',
      key: 'species',
      align: 'center',
      ellipsis: {
        showTitle: false,
      },
      render: (species) => (
        <Tooltip placement="topLeft" title={species}>
          {species}
        </Tooltip>
      ),
    },
    {
      title: 'Số lượng trong kho',
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'center',
      ellipsis: {
        showTitle: false,
      },
      with: '5%',
      render: (quantity) => (
        <Tooltip placement="topLeft" title={quantity}>
          {quantity}
        </Tooltip>
      ),
    },
    {
      title: 'Edit',
      dataIndex: 'Edit',
      key: 'Edit',
      align: 'center',
      ellipsis: {
        showTitle: false,
      },
      render: (Edit, record) => (
        <Flex gap={'20px'} wrap='wrap' justify='center'>
          <Link to={`/admin/updatePets/${record?.id}`}>
            <Button type="primary">Sửa</Button>
          </Link>
          <DeletePets idPet={record?.id} setProducts={setProducts} handleDeleteUser={handleDeleteUser} />
        </Flex>

      ),
    },
  ];
  useEffect(() => {
    getAllProDucts().then((res) => {
      setProducts(res?.pets?.rows)
    })
  }, [])
  return (
    <div>
      <Flex className="ql_pets" gap={20}>
        <InsertPets setProducts={setProducts} />
        <Input placeholder='Nhập tên thú cưng' onChange={(e) => setQueryPets(e.target.value.toLocaleLowerCase())} style={{ width: '20%' }} />
      </Flex>
      <div className="containet_item" style={{ paddingTop: '20px' }}>
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
          <Table columns={columns}
            dataSource={dataProducts?.filter((item) => item?.name?.toLocaleLowerCase().includes(queryPets))}
            pagination={{ pageSize: 5 }}
            bordered={true}
          />
        </ConfigProvider>
      </div>
    </div>
  )
}
