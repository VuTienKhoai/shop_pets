import { Button, Flex, Modal, Radio, message, Table, ConfigProvider } from 'antd'
import React, { useState } from 'react'
import { formatPrice } from '../Common/formatPrice';
import { cleartCart, create_payment_url, insertOrder } from '../Api';

export default function Checkout({ open, setOpen, selectedItems, totalPrice, inforUser,setSelectedItemsDetails,setCartItems }) {
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const idUser = localStorage.getItem('idUser');
    const handlePlaceOrder = async () => {
        const idUser = inforUser?.id
        if (paymentMethod === 'cash') {
            insertOrder(idUser, selectedItems).then((res) => {
                res.err == 0 ? message.success(res.mess) : message.error(res.mess)
                setOpen(false)
                cleartCart(idUser)
                setSelectedItemsDetails([])
                setCartItems([])
            });
            console.log('Tiền mặt')
        } else if (paymentMethod === 'vnpay') {
          
            localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
            await create_payment_url(totalPrice).then((res) => {
                if (res?.err == 0) {
                    window.location.href = res.vnpUrl;
                }
            });
        }
    };
    const columns = [
        {
            title: 'Tên thú cưng',
            dataIndex: 'Pet',
            key: 'Pet',
            align: 'center',
            render: (item) => <p>{item?.name}</p>,
            width: '20%',
        },
        {
            title: 'Giá',
            dataIndex: 'Pet',
            key: 'Pet',
            align: 'center',
            render: (item) => <p>{formatPrice(item?.price)} $</p>,
            width: 150,
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            align: 'center',
            render: (item) => <p>{item}</p>,
            width: 100,
        },
        {
            title: 'Tổng tiền',
            dataIndex: '',
            key: '',
            align: 'center',
            ellipsis: {
                showTitle: false,
            },
            render: (item) => <p> {formatPrice(item.Pet.price * item.quantity)}$</p>,
        },
    ];

    return (
        <div>
            <Modal
                title="Checkout"
                centered
                open={open}
                footer={null}
                onCancel={() => setOpen(false)}
                destroyOnClose
                width={1000}

            >
                <div>
                    <p style={{ fontSize: '25px' }}><strong >Delivery Address</strong></p>
                </div>
                <div>
                    <Flex justify='flex-start' gap={30} style={{ marginTop: '15px' }}>
                        <Flex vertical gap={10}>
                            <p style={{ fontSize: '17px' }}><strong>Last name:</strong> {inforUser?.name}</p>
                            <p style={{ fontSize: '17px' }}><strong>Delivery address:</strong> {inforUser?.diaChi}</p>
                        </Flex>
                        <div>
                            <p style={{ fontSize: '17px' }}><strong>Phone number: {inforUser?.sdt}</strong></p>
                        </div>
                    </Flex>
                </div>
                <div>
                    <p style={{ fontSize: '20px', marginTop: '30px', marginBottom: '10px' }}><strong> Products Ordered</strong></p>
                </div>
                <ConfigProvider
                    theme={{
                        components: {
                            Table: {
                                headerBg: '#3F95FD',
                                headerColor: '#fff',
                                borderColor: '#ccc',
                                borderRadius: 10
                            },
                        },
                    }}
                >
                    <Table
                        dataSource={selectedItems}
                        columns={columns}
                        pagination={{ pageSize: 5 }}
                        bordered={true}
                    />
                </ConfigProvider>
                <div>
                    <p style={{ fontSize: '20px', marginBottom: '10px' }}><strong> Payment Method</strong></p>
                </div>
                <Flex vertical gap="middle">
                    <Radio.Group value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} buttonStyle="solid">
                        <Radio.Button value="cash">Cash on Delivery</Radio.Button>
                        <Radio.Button value="vnpay">VNPAY</Radio.Button>
                    </Radio.Group>
                </Flex>
                <div>
                    <p style={{ fontSize: '20px', margin: '10px 0' }}><strong>Total All :</strong>{formatPrice(totalPrice)} $</p>
                    {/* Total All : {formatPrice(totalPrice)} $ */}
                </div>
                <Flex justify="center" style={{ margin: '20px 0' }} >
                    {selectedItems?.length>0?
                        <Button onClick={handlePlaceOrder} type="primary" style={{ minWidth: '130px', minHeight: '30px' }}>Place Oder</Button>
                        :
                        <Button  disabled type="primary" style={{ minWidth: '130px', minHeight: '30px' }}>Place Oder</Button>
                    }
                </Flex>
            </Modal>
        </div>
    )
}
