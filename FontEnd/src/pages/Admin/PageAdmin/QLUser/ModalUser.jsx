import React, {  useState } from 'react';
import { Button, Modal, Space, Upload, Radio, Flex, Input, DatePicker, message, ConfigProvider,Avatar } from 'antd';
import { UserAddOutlined, UploadOutlined } from '@ant-design/icons';
import viVN from 'antd/es/locale/vi_VN';
import { api ,register, getAllUser } from '../../../../componnents/Api/index'
import dayjs from 'dayjs';
import locale from 'antd/locale/zh_CN';
import '../../css/QLUser/ModalUser.css'
const LocalizedModal = ({ setDataUser }) => {
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const loadDataUser = () => {
        getAllUser().then((res) => (
            setDataUser(res?.users?.rows)
        ))
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
    const [dataModalUser, setDataModalUser] = useState({
        email: "",
        name: "",
        namSinh: "",
        diaChi: "",
        sdt: "",
        avatar: "https://res.cloudinary.com/dw9w3kc49/image/upload/v1696383687/user/user_defaut.png",
        role_id: "R2",
        password: "hello123",
        gioiTinh: "Nam"
    })

    const handleRegisterUser = () => {
        if (dataModalUser?.email === "" || dataModalUser?.name === "" || dataModalUser?.namSinh === "" || dataModalUser?.diaChi === "" || dataModalUser?.sdt === "" ) {
            message.warning("Vui lòng điền đầy đủ thông tin ")
        }
        else {
            register(dataModalUser).then((res) => { 
                console.log(res)
                if(res?.mess==="Đăng kí thành công"){
                    setDataModalUser({
                        email: "",
                        name: "",
                        namSinh: "",
                        diaChi: "",
                        sdt: "",
                        avatar: "https://res.cloudinary.com/dw9w3kc49/image/upload/v1696383687/user/user_defaut.png",
                        role_id: "R2",
                        password: "hello123",
                        gioiTinh: "Nam"
                    })
                    message.success(res?.mess)
                    loadDataUser()
                    setOpen(false);
                }
                else{
                    message.warning(res?.mess)
                }
            })
        }

    };
    const hideModal = () => {
        setOpen(false)
    }
    const onChangeDate = (date, dateString) => {
        handleChangeDataUser('namSinh', dateString);
    };


    const handleChangeDataUser = (key, value) => {
        if (key === 'sdt' && value) {
            const fistNumber = '0'
            const newValue = fistNumber.concat(value);
            setDataModalUser(prev => ({
                ...prev,
                [key]: newValue
            }))
        }
        else {
            if (value) {
                setDataModalUser(prev => ({
                    ...prev,
                    [key]: value
                }))
            }
        }
    }
    return (
        <>
            <Button type="primary" onClick={showModal}>
                <UserAddOutlined />Thêm nhân viên
            </Button>
            <Modal
                title="Thông tin nhân viên"
                open={open}
                onOk={handleRegisterUser}
                onCancel={hideModal}
                okText="Xác nhận"
                cancelText="Hủy bỏ"
            >
                <div className="information_user">
                    <Flex className='lable_center' align='end' gap={30}>
                    <Avatar src={`${dataModalUser?.avatar}`} className='image_userinf' />
                        <Upload {...props}>
                            <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                    </Flex>

                    <p className='p-infomrmation_user'>Email:</p>
                    <Input placeholder={'Nhập địa chỉ email'} defaultValue={dataModalUser?.email} allowClear onChange={e => handleChangeDataUser("email", e.target.value)} />
                    <p className='p-infomrmation_user'> Họ và tên:</p>
                    <Input placeholder={'Nhập họ và tên'}
                        allowClear
                        defaultValue={dataModalUser?.name}
                        onChange={e => handleChangeDataUser("name", e.target.value)}
                    />
                    <p className='p-infomrmation_user'> Địa chỉ:
                    </p>
                    <Input placeholder={'Nhập địa chỉ'}
                        allowClear
                        defaultValue={dataModalUser?.diaChi}
                        onChange={e => handleChangeDataUser("diaChi", e.target.value)}
                    />
                    <p className='p-infomrmation_user'> Số điện thoại:</p>
                    <Flex>
                        <Input style={{ width: '20%' }} value="+84" />
                        <Input count={{
                            show: true,
                            max: 9,
                        }}
                            placeholder={'Nhập số điện thoại'}
                            allowClear
                            defaultValue={dataModalUser?.sdt}
                            onChange={e => handleChangeDataUser("sdt", e.target.value)}
                        />
                    </Flex>
                    <p className='p-infomrmation_user'> Năm Sinh:
                        <ConfigProvider locale={viVN} >
                            <DatePicker onChange={onChangeDate} format="YYYY-MM-DD" className='lable_margin_information_user'  />
                        </ConfigProvider>


                    </p>

                    <p className='p-infomrmation_user'> Giới tính:
                        <Radio.Group name="radiogroup" defaultValue={"Nam"} onChange={e => handleChangeDataUser("gioiTinh", e.target.value)} className='gt_inf_user'>
                            <Radio value={"Nam"}>Nam</Radio>
                            <Radio value={"Nữ"}>Nữ</Radio>
                        </Radio.Group>
                    </p>


                </div>
            </Modal>
        </>
    );
};
const ModalUser = ({ setDataUser }) => {
    const [modal, contextHolder] = Modal.useModal();
    return (
        <>
            <Space>
                <LocalizedModal setDataUser={setDataUser} />

            </Space>
            {contextHolder}
        </>
    );
};
export default ModalUser;