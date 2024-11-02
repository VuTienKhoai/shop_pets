import React from 'react'
import { Form, Input, Button, message, Flex } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { register } from '../componnents/Api';
import { useNavigate } from 'react-router-dom';
export default function Reg() {
    const navigate = useNavigate()
    const onFinishRegister = (values) => {
        console.log('Register form values:', values);
        register(values)
            .then(res => res)
            .then((res) => {
                if (res?.mess === "Đăng kí thành công") {
                    message.success(res?.mess)

                }
                else {
                    message.warning(res?.mess)
                }
            });
    };

    return (
        <Form name="register" onFinish={onFinishRegister}>
            <Form.Item
                className='form_item'
                label="Full-name"
                name="name"
                rules={[{ required: true, message: 'Please input your full-name !!' }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
            >
                <Input prefix={<UserOutlined />} className='input_form' allowClear />
            </Form.Item>


            <Form.Item
                className='form_item'
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
            >
                <Input prefix={<UserOutlined />} className='input_form' allowClear />
            </Form.Item>

            <Form.Item
                className='form_item'
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
            >
                <Input.Password prefix={<LockOutlined />} className='input_form' allowClear />
            </Form.Item>
            <Form.Item
                className='form_item'
                label="Number Phone"
                name="sdt"
                rules={[{ required: true, message: 'Please input your number phone!' }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
            >
                <Input prefix={<UserOutlined />} className='input_form' maxLength={10} showCount />
            </Form.Item>
            <Form.Item
                className='form_item'
                label="Address"
                name="diaChi"
                rules={[{ required: true, message: 'Please input your address!' }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
            >
                <Input prefix={<UserOutlined />} className='input_form' allowClear />
            </Form.Item>
            <Form.Item>
                <Flex justify='center'>
                <Button type="primary" htmlType="submit" style={{minWidth:'120px'}}>
                    Register
                </Button>
                </Flex>
            </Form.Item>
        </Form>
    );
}
