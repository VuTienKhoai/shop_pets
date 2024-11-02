import { Menu } from 'antd';
import React, { useState, useEffect } from 'react';
import { useData } from '../../DataContext';
import { getAllCategory } from '../Api';

export default function SliderProFlie({ check }) {
    const [category, setCategory] = useState([]);

    useEffect(() => {
        getAllCategory()
            .then(res => res.categorys)
            .then((res) => {
                setCategory(res);
            });
    }, []);
    const { isIdCategory, setIsIdCategory } = useData();
    const [activeItem, setActiveItem] = useState('status');

    const handleMenuClick = (item) => {
        setActiveItem(item.key);
        console.log(item.key)
    };

    // const items = category.map((item) => ({
    //     label: item.name,
    //     key: item.id,
    // }));

    // useEffect(() => {
    //     setActiveItem('status');
    // }, []);
    return (
        <div>
            <div>
                <Menu
                    onClick={handleMenuClick}
                    mode="inline"
                    style={{ width: 256 }}
                    items={[
                        {
                            label: 'Order status',
                            key: 'status',
                        },
                        {
                            label: 'Profile',
                            key: 'profile',
                        },
                    ]}
                    selectedKeys={[activeItem]}
                />
                {/* <Menu
                    onClick={handleMenuClick}
                    mode="inline"
                    style={{ width: 256 }}
                    items={items}
                    selectedKeys={[activeItem]}
                /> */}
            </div>

        </div>
    );
}
