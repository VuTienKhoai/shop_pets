import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getThuCung, getCategoryThuCung } from '../componnents/Api';
import { Image, Space } from 'antd';
import Slider from "react-slick";
import { Row, Col } from 'antd';
import { formatVietnameseToString } from '../componnents/Common/formatVietnameseToString'
import AddToCartButton from '../componnents/AddToCard';
import '../css/Detail.css'
export default function Detail() {
    const navigate = useNavigate()
    const handleNavigate = (item) => {
        navigate(`/detail/${formatVietnameseToString(item?.name ? item?.name : '404')}/${item?.id}`)
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 2,

    };
    const { id } = useParams();
    const [itemDetails, setItemDetails] = useState([]);
    const [listLike, setListLike] = useState([])
    const [quantity, setQuantity] = useState(1);

    const ListProducts = (response) => {
        setItemDetails(response);
        getCategoryThuCung(response?.id_category)
            .then(res => res.response?.rows)
            .then((res) => {
                setListLike(res);
            })
            .catch((error) => {
                console.error("Lỗi lấy dữ liệu sản phẩm:", error);
            });
    }

    useEffect(() => {
        getThuCung(id)
            .then(res => res.pet)
            .then((res) => {
                ListProducts(res);
            })
            .catch((error) => {
                console.error("Lỗi lấy dữ liệu sản phẩm:", error);
            });

    }, [id]);
    const handleAddQuantity = () => {
        const newItem = { ...itemDetails }
        newItem.quantity = quantity
        setItemDetails(newItem)
        setQuantity(1)
    };

    const handleQuantity = (event) => {
        if (quantity < 1) {
            setQuantity(1);
        }
        else {
            setQuantity(event.target.value);
            handleAddQuantity()
        }


    }
    return (
        <div className="">
            <div className='mt-header'></div>
            <div className="container">
                <div className="content_detail">
                    <Space className="content_detalProducts">
                        <Row className="image_detail">
                            <Col span={12} className='item_boxDetail'>
                                <Image
                                    src={itemDetails?.avatar}
                                />
                            </Col>
                            <Col span={12} className='item_boxDetail'>
                                <div className="information_products">
                                    <h1 className='title_product'>{itemDetails?.name}</h1>
                                    <h2><strong>Giá:{itemDetails?.price}</strong></h2>
                                    <p className='Quantity_input'><strong>Quantity</strong></p>
                                    <input type="number" name="" id="" className='input_detail' value={quantity} onChange={handleQuantity} />
                                    <Row className="tools_detail">
                                        {/* <button className='btn_detail btn_addCart'> */}
                                            {/* <div className="icon_addCart"> */}
                                                <AddToCartButton item={itemDetails} />
                                            {/* </div>
                                            Add to Cart */}
                                        {/* </button> */}

                                    </Row>
                                    <Row className="tools_detail">
                                        <button className='btn_detail btn_buyNow'>Buy Now</button>
                                    </Row>

                                    <p className='describe_detail'><strong>Describe:</strong> {itemDetails?.describe}</p>
                                    <p className='describe_detail'><strong>Species</strong> {itemDetails?.species}</p>
                                </div>


                            </Col>
                        </Row>


                    </Space>

                </div>
                <div className="content_detail">
                    <h2 className='title_detailList'>You Might Also Like</h2>
                    <div className="slider_detail">
                        <Slider  {...settings}>
                            {listLike?.map((item) => (
                                <div onDoubleClick={()=>handleNavigate(item)}>
                                    <div key={item?.id}>
                                        <Image preview={false} src={`${item?.avatar}`} className='image_listdetail' />
                                        <div className="ifom">
                                            <p>{item?.name}</p>
                                            <p>{item?.price}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </Slider >
                    </div>
                </div>
            </div>

        </div>
    )
}
