import React, { useEffect, useState } from 'react'
import { Button, Flex, Table, Input, ConfigProvider } from 'antd';
import { Link } from "react-router-dom";
import { getAllCategory } from '../../../componnents/Api/index';
import DeleteCategory from './QLCaytegorys/DeleteCategory';
import InsertCategory from './QLCaytegorys/InsertCategory';

export default function QLCategory() {
  const [dataCategory, setDataCategory] = useState([])
  const [queryCategory, setQueryCategory] = useState('')

  const columns = [
    {
      title: 'Mã danh mục',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <p>{text}</p>,
      width: '30%',
      align:'center',
    },
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <p>{text}</p>,
      width: '40%',
      align:'center',
    },
    {
      title: 'Edit',
      dataIndex: 'Edit',
      key: 'Edit',
      align:'center',
      ellipsis: {
        showTitle: false,
      },
      render: (Edit, record) => (
        <Flex gap={'30px'} wrap='wrap' justify='center' >
          <Link to={`/admin/suaDanhMuc/${record?.id}`}>
            <Button type="primary" >Sửa</Button>
          </Link>
          <DeleteCategory idCategorys={record?.id} setFilterCategory={setDataCategory} />
        </Flex>
      ),
      with: '30%',

    },
  ];

  useEffect(() => {
    getAllCategory().then((res) => {
      setDataCategory(res?.categorys)

    })
  }, [])
  return (
    <div>
      <Flex style={{ paddingBottom: "20px" }} gap={10}>
        <InsertCategory setFilterCategory={setDataCategory} />
        <Input
          placeholder='Nhập tên danh mục'
          onChange={(e) => setQueryCategory(e.target.value.toLocaleLowerCase())}
          style={{ width: '20%' }}
        />

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
          columns={columns} dataSource={dataCategory?.filter((item) => item?.name?.toLocaleLowerCase().includes(queryCategory))}
          pagination={{ pageSize: 8 }}
          bordered={true}
        />
      </ConfigProvider>
    </div>
  )
}
