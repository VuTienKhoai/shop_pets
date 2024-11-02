import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import {
    Avatar,
    Button,
    DatePicker,
    Flex,
    Form,
    Input,
    Modal,
    Radio,
    Spin,
    Upload,
    message,
} from 'antd';
import React, { useState } from 'react';
import '../css/ProfileStyle.css'
import { api, updateUser } from '../componnents/Api';
export default function Profile({ inforUser }) {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [avatar, setAvatar] = useState(false);
const idUser = localStorage.getItem('idUser');
    const onFinish = (values) => {
        const updatedValues = { ...values, avatar };
        console.log('data:', updatedValues);
        updateUser(idUser,updatedValues).then((res) => {
            message.success('Update success');
        });    
    };
   
    const normFile = (e) => {
        if (Array.isArray(e)) {
            console.log(e);
            return e;
        }
        return e && e.fileList;
    };
    const handleChangeDataUser = (key, value) => {
        if (value) {
           setAvatar(value)
        }
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
    return (

        <div className="container" style={{ border: '1px solid #000', borderRadius: '30px' }}>
            {/* <div className="proflie"> */}
            <Flex className="headerProfile" justify='center' align='center'>
                <p className='text_headerProfile'> Manage and protect your account</p>
            </Flex>
            <Flex className="proflie" style={{ width: '80%' }}>
                <p className='title_ProfileInf'>My Profile </p>
            </Flex>
            <div className="contentProfile">
                <Flex className="proflie_avatar" justify='center'>
                    <Avatar
                        size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 120, xxl: 150 }}
                        src={inforUser?.avatar}
                    />
                </Flex>
                <Flex className='box_contentProfile' justify='space-around'>
                    <Flex className="item_contentProfile" vertical gap={50}>
                        <p className="text_contentProfile">
                            <strong>Name :</strong> {inforUser?.name ? inforUser.name : (
                                <>
                                    Update... <Spin />
                                </>
                            )}
                        </p>
                        <p className="text_contentProfile" >
                            <strong>Email :</strong> {inforUser?.email ? inforUser.email : (
                                <>
                                    Update... <Spin />
                                </>
                            )}
                        </p>
                        <p className="text_contentProfile" >
                            <strong>Phone Number :</strong> {inforUser?.sdt ? inforUser.sdt : (
                                <>
                                    Update... <Spin />
                                </>
                            )}
                        </p>
                    </Flex>
                    <Flex className="item_contentProfile" vertical gap={50}>
                        <p className="text_contentProfile" >
                            <strong>Gender :</strong> {inforUser?.gioiTinh ? inforUser.gioiTinh : (
                                <>
                                    Update... <Spin />
                                </>
                            )}
                        </p>
                        <p className="text_contentProfile" >
                            <strong>Date of birth :</strong> {inforUser?.namSinh ? inforUser.namSinh : (
                                <>
                                    Update... <Spin />
                                </>
                            )}
                        </p>
                    </Flex>
                </Flex>
            </div>
            {/* </div> */}
            {/* <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div className="proflie_detail">
                    <p>
                        Name : {inforUser?.name ? inforUser.name : (
                            <>
                                Update... <Spin />
                            </>
                        )}
                    </p>
                    <p>
                        Email : {inforUser?.email ? inforUser.email : (
                            <>
                                Update... <Spin />
                            </>
                        )}
                    </p>
                    <p>
                        Phone Number : {inforUser?.sdt ? inforUser.sdt : (
                            <>
                                Update... <Spin />
                            </>
                        )}
                    </p>
                    <p>
                        Gender : {inforUser?.gioiTinh ? inforUser.gioiTinh : (
                            <>
                                Update... <Spin />
                            </>
                        )}
                    </p>
                    <p>
                        Date of birth : {inforUser?.namSinh ? inforUser.namSinh : (
                            <>
                                Update... <Spin />
                            </>
                        )}
                    </p>
                </div>

            </div> */}
            <Flex className='box_btnEditProfile' justify='center'>
                <Button onClick={() => setOpen(true)} type="primary" style={{ minWidth: '120px', minHeight: '35px' }} >
                    Edit Profile
                </Button>
            </Flex>
            <Modal
                title=" Edit Profile"
                centered
                open={open}
                footer={null}
                onCancel={() => setOpen(false)}
                destroyOnClose
                width={1000}

            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <div className="" style={{ display: 'flex', gap: 20 }}>
                        <div className="">
                            <div className="" style={{ display: 'flex', gap: 20 }}>
                                <Form.Item label="FullName" name="name" style={{ minWidth: '300px' }} >
                                    <Input placeholder='Enter full name' />
                                </Form.Item>
                                <Form.Item label="Giới Tính" name="gioiTinh" style={{ minWidth: '300px' }}>
                                    <Radio.Group>
                                        <Radio value="Nam"> Nam </Radio>
                                        <Radio value="Nữ"> Nữ </Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </div>

                            <div className="" style={{ display: 'flex', gap: 20 }}>
                                <Form.Item label="Phone Number" name="sdt" style={{ minWidth: '300px' }}>
                                    <Input type='number' placeholder='Enter phone number' />
                                </Form.Item>
                                <Form.Item label="Address" name="diaChi" style={{ minWidth: '300px' }}>
                                    <Input type='text' placeholder='Enter address' />
                                </Form.Item>
                            </div>
                            <div className="" style={{ display: 'flex', gap: 20 }}>
                                <Form.Item label="Password" name="password" style={{ minWidth: '300px' }}>
                                    <Input type='text' placeholder='Enter password' />
                                </Form.Item>
                                <Form.Item label="Date of birth" name="namSinh" style={{ minWidth: '300px' }}>
                                    <DatePicker />
                                </Form.Item>
                            </div>
                        </div>
                        <Form.Item
                            label="Avatar"
                            name="image"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}

                            style={{ margin: '0 auto' }}

                        >
                            <Upload listType="picture"  showUploadList={false}   {...props}>
                                <Button icon={<UploadOutlined />}>Upload</Button>
                            </Upload>
                        </Form.Item>
                    </div>
                    <Flex justify='center' style={{ width: '100%' }}>
                        <Form.Item >
                            <Button type="primary" htmlType="submit" style={{ width: '150px', height: '35px', fontWeight: 'bold' }}>
                                Save
                            </Button>
                        </Form.Item>
                    </Flex>
                </Form>
            </Modal>
        </div>
    )
}
