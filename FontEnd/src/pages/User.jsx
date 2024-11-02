import { Button, Flex, Tabs, message } from 'antd'
import React from 'react'
import Status_Oder from './Status_Order'
import Profile from './Profile'
import { useNavigate } from 'react-router-dom'
import { logout } from '../componnents/isCheckAuth'
import '../css/Status_Order.css'
export default function User({ inforUser, setInforUser }) {
    const navigate = useNavigate()
    const handLogout = () => {
        logout();
        message.success('Đã đăng xuất!!')
        setInforUser('')
        navigate('/')
    }
    return (
        <div>
            <div className="mt-header"></div>
            <div className="">
                <Tabs defaultActiveKey="login" centered>
                    <Tabs.Items tab="Status_Order" key="login" >
                        <Status_Oder inforUser={inforUser}/>
                    </Tabs.Items>
                    <Tabs.Items tab="Profile" key="register" >
                        <Profile inforUser={inforUser} setInforUser={setInforUser} />
                    </Tabs.Items >
                    <Tabs.Items onClick={handLogout} tab="Logout" key="logout"  >
                        <Flex justify='center'>
                            <Button
                                onClick={handLogout}
                                style={{width:'100px'}}
                                danger
                            >
                                Logout
                            </Button>
                        </Flex>
                    </Tabs.Items >
                </Tabs>
            </div>
        </div>
    )
}
