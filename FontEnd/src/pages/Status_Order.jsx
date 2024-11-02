import { Tabs, ConfigProvider, Table, Avatar, Flex } from 'antd'
import React, { useEffect, useState } from 'react'
import '../css/Status_Order.css'
import { getOrderStatus } from '../componnents/Api'
export default function Status_Order({ inforUser }) {
    const [dataUnpaid, setDataUnpaid] = useState();
    const [dataPaid, setDataPaid] = useState();
    const [dataCancel, setDataCancel] = useState();
    const columns = [
        {
            title: 'id Order',
            dataIndex: 'id',
            key: 'id',
            render: (text) => <p>{text}</p>,
            width: '10%',

        },
        {
            title: 'Order content',
            children: [

                {
                    title: 'Name Pet',
                    dataIndex: 'thuCung',
                    key: 'thuCung',
                    width: '25%',
                    render: (item) => {
                        return (
                            <div>
                                {item?.map((item1) => (
                                    <div className="box_item1" key={item1?.idPet}>
                                        <div className="">
                                            <p style={{ textAlign: 'center' }}>{item1?.Pet?.name}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        );
                    }
                },
                {
                    title: 'Image Pet',
                    dataIndex: 'thuCung',
                    key: 'thuCung',
                    width: '10%',
                    render: (item) => {
                        return (
                            <div>
                                {item?.map((item1) => (
                                    <div className="box_item1" key={item1?.idPet}>
                                        <div className="">
                                            <Avatar
                                                size={{
                                                    xs: 24,
                                                    sm: 32,
                                                    md: 40,
                                                    lg: 64,
                                                    xl: 80,
                                                    xxl: 100,
                                                }}
                                                src={item1?.Pet?.avatar}
                                            />

                                        </div>
                                    </div>
                                ))}
                            </div>
                        );
                    }
                },
                {
                    title: 'Quanity ',
                    dataIndex: 'thuCung',
                    key: 'thuCung',
                    width: '10%',
                    render: (item) => {
                        return (
                            <div>
                                {item?.map((item1) => (
                                    <div className="box_item1" key={item1?.idThuCung}>
                                        <div className="">
                                            <p style={{ textAlign: 'center' }}>{item1?.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        );
                    }
                },
                {
                    title: 'Price',
                    dataIndex: 'thuCung',
                    key: 'thuCung',
                    width: '10%',
                    render: (item) => {
                        return (
                            <div>
                                {item?.map((item1) => (
                                    <div className="box_item1" key={item1?.idThuCung}>
                                        <div className="">
                                            <p style={{ textAlign: 'center' }}>{item1?.Pet?.price}$</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        );
                    }
                },
            ],
        },
        {
            title: 'Total_Order',
            dataIndex: 'tongTien',
            key: 'tongTien',
            render: (text) => <p>{text}$</p>,
            with: '5%'                                                                                                                                               
        },


    ];

    // dataUnpaid count rows
    const handleGetData = async () => {
        await getOrderStatus(inforUser?.id, "Chưa thanh toán").then((res) => (
            setDataUnpaid(res?.Order)
        ))
        await getOrderStatus(inforUser?.id, "Đã thanh toán").then((res) => (
            setDataPaid(res?.Order)
        ))
        await getOrderStatus(inforUser?.id, "Đơn hàng đã hủy").then((res) => (
            setDataCancel(res?.Order)
        ))
    }
    useEffect(() => {
        if (inforUser?.id) {
            handleGetData()
        }
    }, [])
    return (
        <div className="container">
            <div className="container_StatusOrder">
                <ConfigProvider
                    theme={{
                        components: {
                            Tabs: {
                                cardHeight: 100
                            },
                        },
                    }}
                >
                    <Tabs defaultActiveKey="login" centered tabPosition='left' >
                        <Tabs.Items tab="Unpaid_Order" key="Unpaid_Order" >
                            {dataUnpaid?.count !== 0 ?
                                (
                                    <div className="item_OrderUnpaid">
                                        <p className='text_itemUnpaid'>Number of orders: {dataUnpaid?.count}</p>
                                        <ConfigProvider
                                            theme={{
                                                components: {
                                                    Table: {
                                                        headerBg: '#FF5F42',
                                                        headerColor: '#fff',
                                                        borderColor: '#ccc',
                                                        borderRadius: 10
                                                    },
                                                },
                                            }}
                                        >
                                            <Table
                                                columns={columns}
                                                dataSource={dataUnpaid?.rows}
                                                pagination={{ pageSize: 5 }}
                                                bordered={true}
                                            />
                                        </ConfigProvider>
                                    </div>
                                ) : (
                                    <Flex justify='center' align='center' style={{ width: '100%' }} gap={10} vertical>
                                        <Avatar
                                            src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/4e653cf704e352fd.png'
                                            style={{ width: '150px',height:'150px' }}
                                            visible={false}
                                        />
                                        <p style={{ fontSize: '18px' }}>There are no orders</p>
                                    </Flex>
                                )}
                        </Tabs.Items>
                        <Tabs.Items tab="Paid_Order" key="Paid_Order" >
                            {dataPaid?.count !== 0 ?
                                (
                                    <div className="item_OrderUnpaid">
                                        <p className='text_itemUnpaid'>Number of orders: {dataPaid?.count}</p>
                                        <ConfigProvider
                                            theme={{
                                                components: {
                                                    Table: {
                                                        headerBg: '#FF5F42',
                                                        headerColor: '#fff',
                                                        borderColor: '#ccc',
                                                        borderRadius: 10
                                                    },
                                                },
                                            }}
                                        >
                                            <Table
                                                columns={columns}
                                                dataSource={dataPaid?.rows}
                                                pagination={{ pageSize: 5 }}
                                                bordered={true}
                                            />
                                        </ConfigProvider>
                                    </div>
                                ) : (
                                    <Flex justify='center' align='center' style={{ width: '100%' }} gap={10} vertical>
                                        <Avatar
                                            src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/4e653cf704e352fd.png'
                                            style={{ width: '150px',height:'150px' }}
                                            visible={false}
                                        />
                                        <p style={{ fontSize: '18px' }}>There are no orders</p>
                                    </Flex>
                                )}
                        </Tabs.Items >
                        <Tabs.Items tab="Cancel_Order" key="Cancel_Order"  >
                            {dataCancel?.count !== 0 ?
                                (
                                    <div className="item_OrderUnpaid">
                                        <p className='text_itemUnpaid'>Number of orders: {dataCancel?.count}</p>
                                        <ConfigProvider
                                            theme={{
                                                components: {
                                                    Table: {
                                                        headerBg: '#FF5F42',
                                                        headerColor: '#fff',
                                                        borderColor: '#ccc',
                                                        borderRadius: 10
                                                    },
                                                },
                                            }}
                                        >
                                            <Table
                                                columns={columns}
                                                dataSource={dataCancel?.rows}
                                                pagination={{ pageSize: 5 }}
                                                bordered={true}
                                            />
                                        </ConfigProvider>
                                    </div>
                                ) : (
                                    <Flex justify='center' align='center' style={{ width: '100%' }} gap={10} vertical>
                                        <Avatar
                                            src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/4e653cf704e352fd.png'
                                            style={{ width: '150px',height:'150px' }}
                                            visible={false}
                                        />
                                        <p style={{ fontSize: '18px' }}>There are no orders</p>
                                    </Flex>
                                )}
                        </Tabs.Items >
                    </Tabs>
                </ConfigProvider>

            </div>
        </div>
    )
}
