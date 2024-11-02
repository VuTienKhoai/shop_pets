import { Space } from 'antd'
import React from 'react'
import Sider_menu from '../componnents/Sider_menu'
import Page_Content_Products from '../componnents/Page_Content_Products'

export default function ShopAll({ render }) {
    return (
        <div>
            <div className="mt-header"></div>
            <div className="wrapper">
                <div className="slider">
                    <Sider_menu />
                </div>
                <div className="Page_Content_Products">
                    <Page_Content_Products className="" />
                </div>
            </div>
        </div>
    )
}
