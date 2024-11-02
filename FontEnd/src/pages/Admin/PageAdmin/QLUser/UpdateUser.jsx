import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { getUser, updateUser } from '../../../../componnents/Api';
import { Button, Avatar, Upload, Input, Flex, DatePicker, Radio, message } from 'antd';
import { props } from '../DataToolsAdmin'
import { UploadOutlined, LeftOutlined } from '@ant-design/icons';

import '../../css/QLUser/UpdateUser.css'
export default function UpdateUser() {
  const history = useNavigate();
  let { IdUser } = useParams();
  const [dataUser, setDataUser] = useState();
  const [postDataUser, setPostDataUser] = useState(false);
  const [dataUpdate, setDataUpdate] = useState()
  const handleChangeDataUser = (key, value) => {
    if (key === 'sdt' && value) {
      const fistNumber = '0'
      const newValue = fistNumber.concat(value);
      setDataUpdate(prev => ({
        ...prev,
        [key]: newValue
      }))
    }
    else {
      if (value) {
        setDataUpdate(prev => ({
          ...prev,
          [key]: value
        }))
      }
    }
  }
  const onChangeDate = (dateString) => {
    handleChangeDataUser('namSinh', dateString);
  };

  const handleStatusPostData = () => {
    setPostDataUser(true);
  }
  useEffect(() => {
    if (postDataUser) {
      updateUser(IdUser, dataUpdate).then((res) => {
        console.log(res)
        message.success(res?.response.mess)
        history(-1)
        setPostDataUser(false)
      })
    }
  }, [postDataUser])
  useEffect(() => {
    getUser(IdUser).then((res) => {
      setDataUser(res?.User)
      setDataUpdate(res?.User)
    })
  }, [])
  return (
    // <div className='container'>
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
              <Avatar src={`${dataUser?.avatar}`} className='image_userinf' />
            </div>

            <Upload {...props}>
              <Button type="primary" icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </div>
          <p className='text_gt_inf' style={{ marginTop: '10px', fontWeight: 'bold' }}>Mã người dùng: <span>{IdUser}</span> </p>
          <div className="item_infUpdateUser">
            <p className='text_updateInf' ><strong> Năm Sinh:</strong></p>
            <DatePicker
              placeholder={`${dataUser?.namSinh ? dataUser.namSinh : 'Đang cập nhật'} `}
              defaultOpen={`${dataUser?.namSinh ?dataUser.namSinh:null}`}
              onChange={onChangeDate} />
          </div>
          <div className="item_infUpdateUser">
            <p className='text_updateInf'><strong> Họ và tên:</strong></p>
            <Input placeholder={`${dataUser?.name ? dataUser.name : 'Đang cập nhật'} `}
              onChange={e => handleChangeDataUser("name", e.target.value)} />
          </div>
          <div className="item_infUpdateUser">
            <p className='text_updateInf'><strong> Địa chỉ:</strong></p>
            <Input placeholder={`${dataUser?.diaChi ? dataUser.diaChi : 'Đang cập nhật'}`}
              onChange={e => handleChangeDataUser("diaChi", e.target.value)} />
          </div>
          <Flex gap={10} align='center' className='box_updateUser'>
            <p className='text_gt_inf'><strong> Giới tính:</strong></p>
            <Radio.Group name="radiogroup" defaultValue={"Nam"} onChange={e => handleChangeDataUser("gioiTinh", e.target.value)}>
              <Radio value={"Nam"} className='text_gt_inf'>Nam</Radio>
              <Radio value={"Nữ"} className='text_gt_inf'>Nữ</Radio>
            </Radio.Group>
          </Flex>
          <div className="item_infUpdateUser">
            <p className='text_updateInf'><strong> Số điện thoại:</strong></p>
            <Flex>
              <Input style={{ width: '20%' }} value="+84" />
              <Input count={{
                show: true,
                max: 9,
              }}
                placeholder={`${dataUser?.sdt ? dataUser.sdt : 'Đang cập nhật'}`}
                onChange={e => handleChangeDataUser("sdt", e.target.value)} />
            </Flex>
          </div>


          <p className='text_updateInf box_updateUser'><strong>Email: </strong>{dataUser?.email}</p>
          <Flex justify='center' style={{ marginTop: '30px' }} >
            <Button onClick={handleStatusPostData} type="primary" size='middle'> Cập nhật thông tin</Button>
          </Flex>
        </div>
      </div>
    </div>
    // </div>
  )
}
