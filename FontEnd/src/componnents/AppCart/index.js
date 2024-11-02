import React, { useEffect, useState, useCallback } from 'react';
import { ShoppingCartOutlined, DeleteOutlined } from '@ant-design/icons';
import { Badge, Drawer, InputNumber, Space, Table, Checkbox, Button } from 'antd';
import Column from 'antd/es/table/Column';
import { useData } from '../../DataContext';
import { deleteCart, getCart, updateCart } from '../Api';
import { formatPrice } from '../Common/formatPrice';

import Checkout from '../CheckOut/checkout';

const AppCart = ({ inforUser }) => {
    const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const { cartItems, setCartItems } = useData();
    const [open, setOpen] = useState(false);
    const [selectedItemsDetails, setSelectedItemsDetails] = useState([]);
    const fetchData = useCallback(async () => {
        try {
            if (inforUser) {
               
                const response = await getCart(inforUser.id);
                const cartItems = response.Cart.rows;
                console.log(cartItems)
                setCartItems(cartItems);
                // console.log(response?.Total_products)
                // setTotalPrice(response?.Total_products)
            } else {
                console.log('Người dùng chưa đăng nhập => cart = null');
                setCartItems(0);
            }
        } catch (error) {
            console.log('Lỗi kết nối đến api' + error);
        }
    }, [inforUser, setCartItems]);

    useEffect(() => {
        fetchData();
    }, [fetchData,selectedItemsDetails]);
    const TotalPrice = useCallback(() => {
        let total = 0;
        for (const itemId of selectedItems) {
            const selectedItem = cartItems?.find(item => item.id === itemId);
            if (selectedItem) {
                total += selectedItem.Pet.price * selectedItem.quantity;
            }
        }
        setTotalPrice(total);
    }, [selectedItems, cartItems]);

    useEffect(() => {
        TotalPrice();
    }, [TotalPrice]);
    const DeleteItem = (record) => {
        deleteCart(record.id).then(() => {
            setCartItems(res => res.filter(item => item.id !== record.id));
            setSelectedItems(res => res.filter(id => id !== record.id));
        });
    };
    const handleCheckboxChange = (record, checked) => {
        if (record === 'selectAll') {
            const updatedSelectedItems = checked ? cartItems?.map(item => item.id) : [];
            setSelectedItems(updatedSelectedItems);
            const selectedItemsDetails = cartItems?.filter(item => updatedSelectedItems.includes(item.id));
            setSelectedItemsDetails(selectedItemsDetails);
        } else {
            setSelectedItems(res => {
                const updatedSelectedItems = checked
                    ? [...res, record.id]
                    : res.filter(id => id !== record.id);

                // Lấy thông tin chi tiết của sản phẩm đã chọn
                const selectedItemsDetails = cartItems?.filter(item => updatedSelectedItems.includes(item.id));
                setSelectedItemsDetails(selectedItemsDetails);

                return updatedSelectedItems;
            });
        }
    };



    const handleQuantityChange = (value, record) => {
        updateCart(record.id, value)
            .then(() => {
                setCartItems(res => res?.map(item => (item.id === record.id ? { ...item, quantity: value } : item)));
                
            })
            .catch((error) => {
                console.error('Error updating cart:', error);
            });
    };
  
    return (
        <div>
            <Badge
                onClick={() => setCartDrawerOpen(true)}
                count={cartItems.length}
                style={{ fontSize: 14 }}
                className="shoppingCartIcon"
            >
                <ShoppingCartOutlined style={{ fontSize: 24 }} />
            </Badge>
            <Drawer
                width={700}
                open={cartDrawerOpen}
                onClose={() => setCartDrawerOpen(false)}
                title={inforUser?.name ? `${inforUser?.name} Shopping Cart` : 'Your Cart'}
                style={{ maxHeight: '100vh', overflowY: 'auto' }}
                key="id"
            >
                <Table pagination={false} dataSource={cartItems}>
                    <Column
                        title={
                            <Checkbox
                                checked={selectedItems.length === cartItems.length}
                                onChange={(e) => handleCheckboxChange('selectAll', e.target.checked)}
                            />
                        }
                        dataIndex="id"
                        render={(value, record) => (
                            <Checkbox
                                checked={selectedItems.includes(record.id)}
                                onChange={(e) => handleCheckboxChange(record, e.target.checked)}
                            />
                        )}
                    />
                    <Column title="Name" dataIndex={['Pet', 'name']} />
                    <Column
                        title="Price"
                        dataIndex={['Pet', 'price']}
                        render={(text, record) => <span>{formatPrice(record.Pet.price)} $</span>}
                    />
                    <Column
                        title="Quantity"
                        dataIndex="quantity"
                        render={(value, record) => (
                            <InputNumber
                                min={1}
                                value={value}
                                onChange={(newValue) => handleQuantityChange(newValue, record)}
                                onStep={(value, info) => handleQuantityChange(value, record)}
                            />
                        )}
                    />
                    <Column
                        title="Total"
                        dataIndex="quantity"
                        render={(value, record) => <span>{formatPrice(record.Pet.price * value)} $</span>}
                    />
                    <Column
                        title="Action"
                        render={(text, record) => (
                            <Space style={{ cursor: 'pointer' }} onClick={() => DeleteItem(record)}>
                                <DeleteOutlined />

                            </Space>
                        )}
                    />
                </Table>
                <div style={{ marginTop: '16px', marginBottom: '16px' }}>
                    <p>Total: {formatPrice(totalPrice)} $</p>
                </div>
                <Button type="primary" onClick={() => setOpen(true)} disabled={selectedItems?.length === 0}>
                    Checkout
                </Button>
                <Checkout open={open} setOpen={setOpen} selectedItems={selectedItemsDetails} totalPrice={totalPrice} inforUser={inforUser} setSelectedItemsDetails={setSelectedItemsDetails} setCartItems={setCartItems} />
            </Drawer>

        </div>
    );
};

export default AppCart;
