import React from 'react';
import { Row, Col } from 'antd';

import { Link,useLocation } from 'react-router-dom';
import { formatVietnameseToString } from '../Common/formatVietnameseToString';
import "./Footer.css"
import { FacebookFilled, InstagramFilled, YoutubeFilled } from '@ant-design/icons';
const Footer = ({ category }) => {
    const { pathname } = useLocation();
    const isUpdateUserAdmin = pathname.includes('/admin/UpdateUser');
    const isUpdateCategorys=pathname.includes('/admin/suaDanhMuc');
    const isUpdatePetsAdmin=pathname.includes('/admin/updatePets');
    const isProfileAdmin=pathname.includes('/Admin/ProfileAdmin');
    const isDetailAdmin=pathname.includes('/admin/DetailOrder')
    if(pathname==="/admin"||pathname==="/Admin" ||isUpdateUserAdmin ||isUpdateCategorys ||isUpdatePetsAdmin ||isProfileAdmin || isDetailAdmin ){
        return (
            <div className="">

            </div>
        )
    }
    return (
        <div className='footer'>
            <Row className='row_footer'>
                <Col span={6} className='box_footer' >
                    <div className="footer_name">
                        <p className='title_footer'> Our Flagship Store</p>
                    </div>
                    <div className="footer_title">
                        <p className='footer_content'>
                            500 Terry Francine Street
                        </p>
                        <p className='footer_content'>
                            San Francisco, CA 94158
                        </p>
                        <p className='footer_content'>
                            Tel: 123-456-7890
                        </p>
                    </div>
                    <Link to='shop-all' className='View_Stores'>
                        View Stores List
                    </Link>
                </Col>
                <Col span={6} className='box_footer'>
                    <div className="footer_name">
                        <p className='title_footer'>Shop</p>
                    </div>
                    <div className="footer_title">
                        {category?.map((item) => (
                            <Link key={item.id} to={`/category/${formatVietnameseToString(item.name ? item.name : "s")}/${item.id}`}>
                                <p className='footer_content'>
                                    {item.name ? item.name : ''}
                                </p>
                            </Link>
                        ))}
                    </div>
                </Col>
                <Col span={6} className='box_footer'>
                    <div className="footer_name">
                        <p className='title_footer'> Information</p>
                    </div>
                    <div className="footer_title">
                        <p className='footer_content'>
                            Our Story
                        </p>
                        <p className='footer_content'>
                            Contact
                        </p>
                        <p className='footer_content'>
                            Shipping & Returns
                        </p>
                        <p className='footer_content'>
                            Store Policy
                        </p>
                        <p className='footer_content'>
                            Forum
                        </p>
                        <p className='footer_content'>
                            FAQ
                        </p>
                    </div>
                </Col>
                <Col span={6} className='box_footer'>
                    <div className="footer_name">
                        <p className='title_footer'>  Get Special Deals & Offers</p>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <p className='lable_footer'>Email Address </p>
                            <p><sup>*</sup></p>
                        </div>
                        <div className="tools_footer">
                            <input type="email" name="" className='input_footer' />
                            <button className='btn_footer'>Subscribe</button>
                        </div>
                        <p className='footer_content footer_thank'>Thanks for submitting!</p>
                        <p className='title_footer'>
                            Become Our Bestie!
                        </p>
                        <div className="logo_contact">
                            <p><FacebookFilled /></p>
                            <p> <YoutubeFilled /></p>
                            <p><InstagramFilled /></p>
                        </div>
                    </div>

                </Col>
            </Row>
        </div>
    );
}

export default Footer;
