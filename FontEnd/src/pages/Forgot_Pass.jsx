import React from 'react'
import { Form, Input, Button, message } from 'antd';
import { forgotPassword } from '../componnents/Api';
export default function Forgot_Pass({ onBackToLogin }) {
    const onFinishForgotPassword = (values) => {
        console.log('Forgot Password form values:', values);
        forgotPassword(values).then((res) => {
           console.log(res);
           if(res.err == -1){
               message.error('Tài khoản không tồn tại!');
           }
           else{
                message.success('Vui lòng kiểm tra email để đổi mật khẩu!');
           }
        });
    };
    return (
        <div>
            <p>Forgot Password Form</p>
            <Form name="forgotPassword" onFinish={onFinishForgotPassword}>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Reset Password
                    </Button>
                </Form.Item>
            </Form>

            <Button type="link" onClick={onBackToLogin}>
                Back to Login
            </Button>
        </div>
    )
}
