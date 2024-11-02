import React, { memo, useEffect, useState } from 'react'
import { Flex } from 'antd';
import '../../css/AdminHome.css'
import ChartAdminHome from './ChartAdminHome';
import { UserOutlined, ShoppingCartOutlined, GithubOutlined, DollarOutlined } from '@ant-design/icons';
import { getAllUser, getAllOrder, getAllProDucts } from '../../../../componnents/Api';
import { formatPrice } from './../../../../componnents/Common/formatPrice';
const AdminHome = () => {
    const [dataInfomation, setDataInfomation] = useState({
        account: "0",
        countOrder: "0",
        quantity: "0",
        income: 0
    })
    const handleChangeDataUser = (key, value) => {
        if (value) {
            setDataInfomation(prev => ({
                ...prev,
                [key]: value
            }))
        }
        if (key === 'income') {
            const price_pets = value.map(item => item.tongTien)
            const total_products = price_pets.reduce((total_producs, item_producs) => total_producs + item_producs)
            setDataInfomation(prev => ({
                ...prev,
                [key]: total_products
            }))
        }
    }

    const handleGetData = () => {
        getAllUser()?.then((res) => (
            handleChangeDataUser("account", res?.users?.count)
        ))
        getAllOrder("")?.then((res) => (
            handleChangeDataUser("countOrder", res?.Orders?.count)
        ))
        getAllProDucts()?.then((res) => (
            handleChangeDataUser("quantity", res?.pets?.count)
        ))
        getAllOrder("")?.then((res) => (
            handleChangeDataUser("income", res?.Orders?.rows)
        ))

    }
    useEffect(() => (
        handleGetData()
    ), [])

    return (
        <div className="container">
            <div className="haeder_AdminHome">
                <Flex gap={30}>
                    <div className="item_AdminHome bgr_AdminUser">
                        <Flex className="boxText_AdminHome" vertical gap={10}>
                            <p className='title_AdminHome'>Số lượng tài khoản</p>
                            <p className='text_AdminHome'>{dataInfomation?.account}</p>
                        </Flex>
                        <div className="icon_AdminHome_header">
                            <UserOutlined style={{ fontSize: 40, color: '#fff' }} />
                        </div>
                    </div>
                    <div className="item_AdminHome bgr_AdminOrder">
                        <Flex className="boxText_AdminHome" vertical gap={10}>
                            <p className='title_AdminHome'>Số lượng đơn hàng</p>
                            <p className='text_AdminHome'>{dataInfomation?.countOrder}</p>
                        </Flex>
                        <div className="icon_AdminHome_header">
                            <ShoppingCartOutlined style={{ fontSize: 40, color: '#fff' }} />

                        </div>
                    </div>
                    <div className="item_AdminHome bgr_AdminPets">
                        <Flex className="boxText_AdminHome" vertical gap={10}>
                            <p className='title_AdminHome'>Số lượng thú cưng</p>
                            <p className='text_AdminHome'>{dataInfomation?.quantity}</p>
                        </Flex>
                        <div className="icon_AdminHome_header">
                            <GithubOutlined style={{ fontSize: 40, color: '#fff' }} />
                        </div>
                    </div>
                    <div className="item_AdminHome bgr_AdminIncome">
                        <Flex className="boxText_AdminHome" vertical gap={10}>
                            <p className='title_AdminHome'>Tổng thu nhập</p>
                            <p className='text_AdminHome'>
                                {formatPrice(dataInfomation?.income)}

                            </p>
                        </Flex>
                        <div className="icon_AdminHome_header">
                            <DollarOutlined style={{ fontSize: 40, color: '#fff' }} />
                        </div>
                    </div>
                </Flex>
            </div>
            <div className="chart_AdminHome">
                <ChartAdminHome />
            </div>
        </div>
    )
}
export default memo(AdminHome)
