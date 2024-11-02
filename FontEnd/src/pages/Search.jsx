import React, { useEffect, useState } from 'react';
import { getAllProDucts } from '../componnents/Api';
import { useParams } from 'react-router-dom';
import { Avatar, Card, Col, Image, Row } from 'antd';
import Show_Detail from '../componnents/Show_Detail';
import AddToCartButton from '../componnents/AddToCard';
import { formatPrice } from '../componnents/Common/formatPrice';

export default function Search() {
    const [data, setData] = useState([]);
    const { nameSearch } = useParams();

    useEffect(() => {
        // Fetch all products from the API
        getAllProDucts()
            .then((res) => {
                console.log(res.pets.rows);
                setData(res.pets.rows);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    }, []);

    console.log(nameSearch);

    // Filter data based on the nameSearch parameter
    const filteredData = data.filter((product) =>
        product.name.toLowerCase().includes(nameSearch.toLowerCase())
    );

    return (
        <>
            <div className="mt-header"></div>
            <div>
                <div className="container">
                    <h2>Search Results for: {nameSearch}</h2>
                </div>
                <div>
                    {filteredData?.length === 0 ? (
                        <div className="container">
                            <p>No products found matching "{nameSearch}".</p>
                        </div>
                    ) : (

                        <div className="container">
                            <Row style={{ justifyContent: 'center' }}>
                                {filteredData?.map((pet) => (
                                    <Col key={pet.id}>
                                        <Card
                                            // loading={loading}
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
                                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                                        {pet.name}
                                                        <div style={{ fontSize: 16, fontWeight: 'normal' }}> {pet.price ? `${formatPrice(pet.price)} $` : 'Update...'}</div>
                                                    </div>
                                                }
                                                description={pet.describe}
                                                avatar={<Avatar src={pet.avatar} />}
                                            />
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
