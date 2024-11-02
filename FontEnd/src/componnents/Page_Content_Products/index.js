import React, { useEffect, useState } from 'react';
import { useData } from '../../DataContext';
import { Avatar, Card, Image, Row, Col, Spin } from 'antd';
import { getAllProDucts, getCategoryThuCung } from '../Api';
import AddToCartButton from '../AddToCard';
import Show_Detail from '../Show_Detail';
import out from '../../img/sold_3211463.png'
import { formatPrice } from '../Common/formatPrice';
import CardLoading from '../Card_Loading';
export default function Page_Content_Products({ id_category }) {
    const { isIdCategory, setIsIdCategory } = useData();
    const [data, setData] = useState([]);
    const [CountRows, setCountRows] = useState();
    const [loading, setLoading] = useState(false);
    const [cartLoaded, setCartLoaded] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                if (id_category) {
                    const response = await getCategoryThuCung(id_category);
                    const responseData = response?.response?.rows || [];
                    setData(responseData);
                    setCountRows(response?.response?.count)
                }
                else
                    if (isIdCategory !== 'shop-all') {
                        const response = await getCategoryThuCung(isIdCategory);
                        const responseData = response?.response?.rows || [];
                        setData(responseData);
                        setCountRows(response?.response?.count)
                    } else {
                        const response = await getAllProDucts();
                        const responseData = response?.pets?.rows || [];
                        console.log(response)
                        setData(responseData);
                        setCountRows(response?.pets?.count)
                    }
            } catch (error) {
                console.error("Lỗi lấy dữ liệu:", error);
            } finally {
                setLoading(false);
                setCartLoaded(true);
            }
        };
        fetchData();
    }, [isIdCategory, id_category, CountRows]);
    return (
        <div style={{ width: '100%', }}>
            {cartLoaded ? (
                <div className='container' style={{ margin: 'auto' }}>
                   <p style={{marginLeft:'20px',fontSize:'20px'}}>Total Pets : {CountRows ? CountRows : <Spin />} pets</p>
                    {data.length > 0 ? (
                        <Row style={{display:'flex',justifyContent:'center'}}>
                            {data?.map((pet) => (
                                <Col key={pet.id}>
                                    <Card
                                        loading={loading}
                                        style={{ width: 360, margin: 20 }}
                                        hoverable
                                        cover={
                                            <Image
                                                src={pet.avatar}
                                                style={{ height: 250 }}

                                            />
                                        }
                                        actions={[
                                            <AddToCartButton item={pet} />,
                                            <Show_Detail item={pet} />
                                        ]}
                                    >
                                        <Card.Meta
                                            title={
                                                <div style={{ display: 'flex',flexDirection:'column', justifyContent: 'space-between' }}>
                                                    {pet.name}
                                                    <div style={{ fontSize: 16, fontWeight: 'normal' }}> {pet.price ? `${formatPrice(pet.price)} $` : 'Update...'}</div>
                                                </div>
                                            }
                                            description={pet.describe}
                                            avatar={<Avatar src={pet.avatar}  />}
                                        />
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <>
                            <div style={{ display: 'flex', justifyContent: 'center', height: '100vh', margin: 'auto' }}>
                                <Image
                                    preview={false}
                                    src={out}
                                />
                            </div>
                        </>
                    )}
                </div>
            ) : (
                <div className='container' style={{ margin: 'auto' }}>

                    {CountRows ? CountRows : <Spin />} pets
                    <CardLoading loading={loading} />
                </div>
            )}
        </div>
    );
}
