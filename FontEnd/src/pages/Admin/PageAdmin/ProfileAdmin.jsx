import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getUser, updateUser,api } from '../../../componnents/Api';
import { Spin, Image, Flex, Input, DatePicker, Radio, ConfigProvider, Button, Upload, message } from 'antd';
import { LeftOutlined, EditOutlined, UploadOutlined, SaveOutlined } from '@ant-design/icons';

import viVN from 'antd/es/locale/vi_VN';
import '../css/ProfileAdmin.css'
export default function ProfileAdmin() {
  const history = useNavigate();
  let { IdUser } = useParams();
  const [dataUser, setDataUser] = useState();
  const [statusLoading, setStatusLoading] = useState(false)
  const [postDataUser, setPostDataUser] = useState(false);
  const [dataUpdate, setDataUpdate] = useState()

  const handleGetDataUser = () => {
    getUser(IdUser).then((res) => {
      setDataUser(res?.User)
      setStatusLoading(true)
    })
  }

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
  const props = {
    action: api+ 'users/uploadImage',
    onChange({ file }) {
      if (file.status === 'done') {
        const url = file.response
        handleChangeDataUser("avatar",url)  
      }
    },
    
  };
  useEffect(() => {
    if (postDataUser) {
      updateUser(IdUser, dataUpdate).then((res) => {
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

  useEffect(() => {
    handleGetDataUser()
  }, [IdUser])
  return (
    <div >
      {statusLoading ? (
        <div className="">
          <div className="header_Profile_Admin">
            <Link to='/Admin'>
              <p><LeftOutlined /> Về trang chủ </p>
            </Link>
          </div>
          <div className="container_Profile_Admin">
            <Flex className="content_Profile_Admin">
              <div className="inf_image_ProfileAdmin">
                <div className="header_inf_ProfileAdmin">
                  <Flex gap={20}>
                    <div >
                      <img src={dataUser?.avatar} alt="" className='avatar_userAdmin' />
                    </div>
                    <Flex className="item_text_headerProfileAdmin" gap={5} >
                      <p className='name_text_headerProfileAdmin'>{dataUser?.name}</p>
                      <Flex className="edit_headerProfileAdmin" justify='space-between' gap={10}>
                        <p className='emai_text_headerProfileAdmin'> <strong>Email:</strong> {dataUser?.email}</p>
                        <p className='edit_email_profile'><EditOutlined /></p>

                      </Flex>
                    </Flex>
                  </Flex>
                </div>
                <div className="content_inf_ProfileAdmin">

                  <Flex className="item_inf_ProfileAdmin" align='center' >
                    <p className='lable_inf_ProfileAdmin'><strong>Địa chỉ email</strong></p>
                    <Flex className="input_inf_ProfileAdmin" >
                      <Input placeholder={dataUser?.email} allowClear
                        onChange={e => handleChangeDataUser("email", e.target.value)}
                      />
                    </Flex>
                  </Flex>
                  <Flex className="item_inf_ProfileAdmin" align='center'>
                    <p className='lable_inf_ProfileAdmin'><strong>Họ và tên</strong></p>
                    <Flex className="input_inf_ProfileAdmin" >
                      <Input placeholder={dataUser?.name} allowClear
                        onChange={e => handleChangeDataUser("name", e.target.value)}
                      />
                    </Flex>
                  </Flex>

                  <Flex className="item_inf_ProfileAdmin" align='center'>
                    <p className='lable_inf_ProfileAdmin'><strong>Địa chỉ</strong></p>
                    <Flex className="input_inf_ProfileAdmin" >
                      <Input placeholder={dataUser?.diaChi} allowClear
                        onChange={e => handleChangeDataUser("diaChi", e.target.value)}
                      />
                    </Flex>
                  </Flex>

                  <Flex className="item_inf_ProfileAdmin" align='center'>
                    <p className='lable_inf_ProfileAdmin'><strong>Giới tính</strong></p>
                    <Radio.Group name="radiogroup" defaultValue={"Nam"}
                      onChange={e => handleChangeDataUser("gioiTinh", e.target.value)}>
                      <Radio value={"Nam"}>Nam</Radio>
                      <Radio value={"Nữ"}>Nữ</Radio>
                    </Radio.Group>
                  </Flex>
                  <Flex className="item_inf_ProfileAdmin" align='center'>
                    <p className='lable_inf_ProfileAdmin'><strong>Năm sinh</strong></p>
                    <ConfigProvider locale={viVN} >
                      <DatePicker placement={'bottomLeft'} format="YYYY-MM-DD" onChange={onChangeDate} />
                    </ConfigProvider>

                  </Flex>

                  <Flex className="item_inf_ProfileAdmin" align='center'>
                    <p className='lable_inf_ProfileAdmin'><strong>Số điện thoại</strong></p>
                    <Flex gap={5}>
                      <Input style={{ width: '13%' }} value="+84" />
                      <Input count={{
                        show: true,
                        max: 9,
                      }}
                        placeholder={dataUser?.sdt}
                        onChange={e => handleChangeDataUser("sdt", e.target.value)}
                        allowClear
                      />
                    </Flex>
                  </Flex>
                </div>
              </div>
              <div className="profile_user_Admin">
                <div className="header_inf_ProfileAdmin">
                  <Flex gap={20} align='center'>
                    <Flex className="item_text_headerProfileAdmin" gap={5} align='center' >
                      <p className='name_text_headerProfileAdmin'>Thông tin người dùng</p>
                    </Flex>
                  </Flex>
                </div>
                <div className="content_inf_Admin">
                  <Flex align='flex-end' gap={10} justify='center'>
                    <div className="image_profileAdmin">
                      <Image src={dataUser?.avatar} />
                    </div>
                    <Upload {...props}  progress={{ strokeWidth: 0, showInfo: false }} showUploadList={{
                      showPreviewIcon:false,
                      showProgress:false
                    }} >
                      <Button icon={<UploadOutlined /> }>Upload</Button>
                    </Upload>
                  </Flex>
                  <Flex className="inf_user_Admin" vertical={'vertical'} gap={26} >
                    <Flex gap={30}>
                      <p className="lable_inf_user_Admin" > <strong>Email:</strong></p>
                      <p>{dataUser?.email}</p>
                    </Flex>
                    <Flex gap={30}>
                      <p className="lable_inf_user_Admin" > <strong>Họ và tên:</strong></p>
                      <p>{dataUser?.name}</p>
                    </Flex>
                    <Flex gap={30}>
                      <p className="lable_inf_user_Admin" > <strong>Ngày sinh:</strong></p>
                      <p>{dataUser?.namSinh}</p>
                    </Flex>
                    <Flex gap={30}>
                      <p className="lable_inf_user_Admin" > <strong>Địa chỉ:</strong></p>
                      <p>{dataUser?.diaChi}</p>
                    </Flex>
                    <Flex gap={30}>
                      <p className="lable_inf_user_Admin" > <strong>Giới tính:</strong></p>
                      <p>{dataUser?.gioiTinh ? dataUser?.gioiTinh : 'Chưa cập nhật'}</p>
                    </Flex>
                    <Flex gap={30}>
                      <p className="lable_inf_user_Admin" > <strong>Số điện thoại:</strong></p>
                      <p>0{dataUser?.sdt}</p>
                    </Flex>

                  </Flex>
                </div>
              </div>
            </Flex>
            <Flex className='btn_Profile_Admin' onClick={handleStatusPostData}>
              <Button type="primary" size='large'> <SaveOutlined />Cập nhật dữ liệu</Button>
            </Flex>
          </div>
        </div>
      ) : (<div className='loading_Profile_Admin'>
        <div className="title_Profile_Loading">Đang tải dữ liệu</div>
        <div className=""><Spin size='large' /></div>
      </div>)}
    </div>
  )
}
