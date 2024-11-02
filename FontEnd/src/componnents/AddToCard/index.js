import { useState } from "react";
import { addToCart, getCart } from "../Api";
import { Button, message, Flex } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useData } from '../../DataContext';
import { useLocation } from "react-router-dom";

export default function AddToCartButton({ item }) {
    const { pathname } = useLocation()
    const isUpdateUserAdmin = pathname.includes('/detail');
    const { updateCartItems } = useData();
    const idUser = localStorage.getItem('idUser');
    const [statusBtnCart, setStatusBtnCart] = useState(false)
    // nếu có idUser => người dùng đã đăng nhập 
    // gọi api lấy cart theo idUser
    const [loading, setLoading] = useState(false);
    const addProductToCart = () => {
        if (idUser) {
            setLoading(true);
            addToCart(idUser, item.id, 1).then((res) => {
                if (res?.mess === "Thêm vào giỏ hàng thành công") {
                    message.success(`${item.name} đã thêm vào giỏ hàng`);
                    setLoading(false);
                    updateCartData(idUser);
                    setStatusBtnCart(true)
                }

                if (isUpdateUserAdmin || res?.mess === "Sản phẩm đã có trong giỏ hàng") {
                    message.warning(res?.mess)
                    setStatusBtnCart(true)
                }


            });
        }
        else {
            message.warning(`Vui lòng đăng nhập để tiếp tục`);
        }
    };
    const updateCartData = (idUser) => {
        if (idUser) {
            getCart(idUser).then((res) => res.Cart.rows).then((res) => {
                updateCartItems(res);
            });
        }
    };
    if (isUpdateUserAdmin) {
        return (

            <Button
                type="link"
                onClick={() => {
                    addProductToCart();
                }}

                style={{ backgroundColor: '#FF5F42', height: '40px' }}
            >
                {!statusBtnCart ? (
                    <Flex gap={10} justify="center" align="center">
                        <p style={{ color: '#fff', fontSize: '20px' }}>Add To Cart</p>
                        <ShoppingCartOutlined style={{ color: '#fff', fontSize: '25px' }} />
                    </Flex>

                ) : (
                    <Flex gap={10} justify="center" align="center">
                        <p style={{ color: '#fff', fontSize: '15px' }}>Products already in the cart</p>
                    </Flex>
                )}
            </Button>
        );
    }
    return (

        <Button
            type="link"
            onClick={() => {
                addProductToCart();
            }}
            loading={loading}
            style={{ fontSize: 24 }}
        >
            <ShoppingCartOutlined />
        </Button>
    );
}