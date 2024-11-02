import { Menu } from 'antd';
import React, { useState, useEffect } from 'react';
import { useData } from '../../DataContext';
import { getAllCategory } from '../Api';

export default function SiderMenu({ check }) {
    const [category, setCategory] = useState([]);

    useEffect(() => {
        getAllCategory()
            .then(res => res.categorys)
            .then((res) => {
                setCategory(res);
            });
    }, []);
    const { isIdCategory, setIsIdCategory } = useData();
    const [activeItem, setActiveItem] = useState(null);

    const handleMenuClick = (item) => {
        setIsIdCategory(item.key);
    };

    const items = category.map((item) => ({
        label: item.name,
        key: item.id,
    }));

    useEffect(() => {
        setActiveItem(isIdCategory);
    }, [isIdCategory]);
    return (
        <div>
            {!check ? (
                <div>
                    <Menu
                        onClick={handleMenuClick}
                        mode="inline"
                        style={{ width: 256 }}
                        items={[
                            {
                                label: 'Shop All',
                                key: 'shop-all',
                            }
                        ]}
                        selectedKeys={[activeItem]}
                    />
                    <Menu
                        onClick={handleMenuClick}
                        mode="inline"
                        style={{ width: 256 }}
                        items={items}
                        selectedKeys={[activeItem]}
                    /></div>
            ) : (
                <Menu
                    mode="inline"
                    style={{ width: 256 }}
                    items={[
                        {
                            label: check ? check : 'Default',
                            key: check,
                        }
                    ]}
                    selectedKeys={check ? [check] : ['Default']}
                />
            )}

        </div>
    );
}
