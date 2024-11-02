import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Avatar, Upload, Input, Flex, message, Space, Dropdown } from 'antd';
import { UploadOutlined, LeftOutlined, DownOutlined } from '@ant-design/icons';
import { suaThuCung, getThuCung, getAllCategory, api } from '../../../../componnents/Api';
import '../../css/QLUser/UpdateUser.css'
export default function UpdatePets() {
  
  let { idPets } = useParams();
  const [dataPets, setDataPets] = useState()
  const [CategoryPets, setCategoryPets] = useState();
  const history = useNavigate();
  console.log(dataPets)
  const getDataUpdateUser = () => {
    getThuCung(idPets).then((res) => (
      setDataPets(res?.pet)
    ))
    getAllCategory().then((res) => (
      setCategoryPets(res?.categorys)
    ))
  }
  const items = CategoryPets?.map(item => {
    return {
      key: item?.id,
      label: item?.name
    }
  })
  const onClick = ({ key }) => {
    const categoryFilter = items.filter(item => item.key === key);
    handleChangeDataUser("id_category", categoryFilter[0].key)
    handleChangeDataUser("category", categoryFilter[0].label)
  };
  const props = {
    action: api + 'users/uploadImage',
    onChange({ file }) {
      if (file.status === 'done') {
        const url = file.response
        handleChangeDataUser("avatar", url)
      }
    },
  };
  useEffect(() => {
    getDataUpdateUser();
  }, [])


  const handleChangeDataUser = (key, value) => {
    if (value) {
      setDataPets(prev => ({
        ...prev,
        [key]: value
      }))
    }

  }

  const handleStatusPostData = () => {
    try {
      suaThuCung(idPets, dataPets).then((res) => {
        message.success(res?.mess)
        history(-1)
      })

    } catch (e) {
      message.error(e)
    }

  }

  return (
    <div className="content_updateUser">
      <div className="backgr_updateUser">

      </div>
      <div className="backgr_color">

      </div>
      <div className="content_inf">
        <div className="icon_back" onClick={() => { history(-1) }}>
          <LeftOutlined /> Về trang chủ
        </div>
        <div className="information_user_updateUser">
          <div className="image_user">
            <div className="box_image_user">
              <Avatar src={`${dataPets?.avatar}`} className='image_userinf' />
            </div>

            <Upload {...props}>
              <Button type="primary" icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </div>
          <p className='text_gt_inf' style={{ marginTop: '10px', fontWeight: 'bold' }}> Mã thú cưng:  <span>{idPets}</span> </p>

          <div className="item_infUpdateUser">
            <p className='text_updateInf'><strong>Tên thú cưng:</strong></p>
            <Input placeholder={`${dataPets?.name ? dataPets.name : 'Đang cập nhật'} `}
              onChange={e => handleChangeDataUser("name", e.target.value)} />
          </div>
          <div className="item_infUpdateUser">
            <p className='text_updateInf'><strong>Mô tả:</strong></p>
            <Input placeholder={`${dataPets?.describe ? dataPets.describe : 'Đang cập nhật'} `}
              onChange={e => handleChangeDataUser("describe", e.target.value)} />
          </div>
          <div className="item_infUpdateUser">
            <p className='text_updateInf'><strong>Giống:</strong></p>
            <Input placeholder={`${dataPets?.species ? dataPets.species : 'Đang cập nhật'} `}
              onChange={e => handleChangeDataUser("species", e.target.value)} />
          </div>
          <div className="item_infUpdateUser">
            <p className='text_updateInf'><strong>Số lượng trong kho:</strong></p>
            <Input
              placeholder={`${dataPets?.quantity ? dataPets.quantity : 'Đã hết hàng'} `}
              onChange={e => handleChangeDataUser("quantity", e.target.value)}
            />
         

          </div>
          <Dropdown
            menu={{
              items,
              onClick
            }}
          >
            <a onClick={(e) => e.preventDefault()} className='text_updateInf item_infUpdateUser'>
              <Space>

                {dataPets?.category ? dataPets?.category : "Chọn Danh Mục"}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
          <Flex justify='center' style={{ marginTop: '30px' }} >
            <Button onClick={handleStatusPostData} type="primary" size='middle'> Cập nhật thông tin</Button>
          </Flex>

        </div>
      </div>
    </div>
  )
}
