import { Card, Col, Image, Row, Skeleton } from 'antd'
import React from 'react'
import AddToCartButton from '../AddToCard'
import Show_Detail from '../Show_Detail'

export default function CardLoading({ loading }) {
    return (
        <div>
            <Row>
                <Col >
                    <Card
                        loading={loading}
                        style={{ width: 360, margin: 20 }}
                        hoverable
                        cover={
                            <Skeleton.Image loading={loading} style={{ width: 360, height: 200 }}>

                            </Skeleton.Image>
                        }
                        actions={[
                            <AddToCartButton />,
                            <Show_Detail />
                        ]}
                    >
                        <Card.Meta

                        />
                    </Card>
                </Col>
                <Col >
                    <Card
                        loading={loading}
                        style={{ width: 360, margin: 20 }}
                        hoverable
                        cover={
                            <Skeleton.Image loading={loading} style={{ width: 360, height: 200 }}>

                            </Skeleton.Image>
                        }
                        actions={[
                            <AddToCartButton />,
                            <Show_Detail />
                        ]}
                    >
                        <Card.Meta

                        />
                    </Card>
                </Col>
                <Col >
                    <Card
                        loading={loading}
                        style={{ width: 360, margin: 20 }}
                        hoverable
                        cover={
                            <Skeleton.Image loading={loading} style={{ width: 360, height: 200 }}>

                            </Skeleton.Image>
                        }
                        actions={[
                            <AddToCartButton />,
                            <Show_Detail />
                        ]}
                    >
                        <Card.Meta

                        />
                    </Card>
                </Col>
                <Col >
                    <Card
                        loading={loading}
                        style={{ width: 360, margin: 20 }}
                        hoverable
                        cover={
                            <Skeleton.Image loading={loading} style={{ width: 360, height: 200 }}>

                            </Skeleton.Image>
                        }
                        actions={[
                            <AddToCartButton />,
                            <Show_Detail />
                        ]}
                    >

                        <Card.Meta

                        />
                    </Card>
                </Col>
                <Col >
                    <Card
                        loading={loading}
                        style={{ width: 360, margin: 20 }}
                        hoverable
                        cover={
                            <Skeleton.Image loading={loading} style={{ width: 360, height: 200 }}>

                            </Skeleton.Image>
                        }
                        actions={[
                            <AddToCartButton />,
                            <Show_Detail />
                        ]}
                    >
                        <Card.Meta

                        />
                    </Card>
                </Col>
                <Col >
                    <Card
                        loading={loading}
                        style={{ width: 360, margin: 20 }}
                        hoverable
                        cover={
                            <Skeleton.Image loading={loading} style={{ width: 360, height: 200 }}>

                            </Skeleton.Image>
                        }
                        actions={[
                            <AddToCartButton />,
                            <Show_Detail />
                        ]}
                    >
                        <Card.Meta

                        />
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
