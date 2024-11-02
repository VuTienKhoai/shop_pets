import { Form, Input, Button, Tabs, message, Flex } from 'antd';

import React from 'react'
import Reg from './Reg'
import { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import Forgot_Pass from './Forgot_Pass';
import { login } from '../componnents/Api';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { fetchDataUser } from '../componnents/isCheckAuth';

export default function Login({ setInforUser }) {
    return (
        <div>
            <div className="mt-header"></div>
            <div className="container-m">
                <Tabs defaultActiveKey="login" centered>
                    <Tabs.Items tab="Login" key="login" >
                        <LoginForm setInforUser={setInforUser} />
                    </Tabs.Items>
                    <Tabs.Items tab="Register" key="register" >
                        <Reg />
                    </Tabs.Items >
                </Tabs>
            </div>
        </div>
    )
}

const LoginForm = ({ setInforUser }) => {
    const navigate = useNavigate()
    const [showLoginForm, setShowLoginForm] = useState(true);
    const onFinishLogin = (values) => {
        console.log('Login form values:', values);
        login(values)
            .then(res => res)
            .then((res) => {
                if(res?.mess==="Đăng nhập thành công"){
                    localStorage.setItem('access_token', res.access_token);
                    checkLogin()
                }
                else{
                    message.warning(res?.mess)
                }
            });
    };
    const navigateLogin = (role_id) => {
        console.log("được rồi:"+role_id)
        switch (role_id) {
            case 'R1':
                navigate('/admin');
                break;
            case 'R2':
                navigate('/admin');
                break;
            case 'R3':
                navigate('/');
                break;
            default:
                console.log('Role không hợp lệ.');
        }
    }
    const checkLogin = async () => {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken != "null") {
            const decode = accessToken ? jwtDecode(accessToken) : null
           console.log(decode)
            try {
                if (decode.id) {

                    localStorage.setItem('idUser', decode.id);
                    const inforData = await fetchDataUser(decode.id);
                    setInforUser(inforData);
                    await message.success(`Đăng nhập thành công`);
                    navigateLogin(decode.role_id)
                    // navigate('/')
                }
                else{
                    await message.warning("Đăng nhập thất bại")
                }
            }
            catch {

            }
            finally {

            }
        }
    }
    const handleForgotPassword = () => {
        setShowLoginForm(false);
    };

    const handleBackToLogin = () => {
        setShowLoginForm(true);
    };

    return (
        <div>
            {showLoginForm ? (
                <Form name="login" onFinish={onFinishLogin} >
                    <Form.Item
                        className='form_item'
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                        labelCol={{ span: 24 }} // Chiếm hết 24 cột (1 hàng) cho label
                        wrapperCol={{ span: 24 }} // Chiếm hết 24 cột (1 hàng) cho input
                    >
                        <Input prefix={<UserOutlined />} className='input_form' />
                    </Form.Item>


                    <Form.Item
                        className='form_item'
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                    >
                        <Input.Password prefix={<LockOutlined />} className='input_form' />
                    </Form.Item>
                    <Form.Item>
                        <Button type="link" onClick={handleForgotPassword}>
                            Forgot password?
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Flex justify='center'>
                        <Button type="primary" htmlType="submit"  style={{minWidth:'120px'}}>
                            Login
                        </Button>
                        </Flex>
                    </Form.Item>


                </Form>
            ) : (
                <Forgot_Pass onBackToLogin={handleBackToLogin} />
            )}
        </div>
    );
};