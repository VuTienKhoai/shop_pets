import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { getAllOrderCancel, getAllOrderUnpaid, getAllOrderSuccess, getTop10 } from './../../../../componnents/Api/index';
export default function ChartAdminHome() {
    const [dataProducts, setDataProducts] = useState(
        [
            { name: 'Đơn hàng thành công', value: 0 },
            { name: 'Đơn hàng chưa thanh toán', value: 0 },
            { name: 'Đơn hàng bị hủy', value: 0 },
        ]
    )
    const [dataBarChart, setDataBarChart] = useState([])
    //Hàm cập nhật giá trị biểu đồ tròn
    const updateProductValue = (productName, newValue) => {
        setDataProducts(prevProducts => {
            const newDataProducts = [...prevProducts];
            newDataProducts.forEach(product => {
                if (product.name === productName) {
                    product.value = newValue;
                }
            });
            return newDataProducts;
        });
    };
    const handleGetDataChart = async () => {
        getAllOrderUnpaid().then((res) => (
            updateProductValue("Đơn hàng chưa thanh toán", res?.Orders?.count)
        ))
        getAllOrderCancel().then((res) => (
            updateProductValue("Đơn hàng bị hủy", res?.Orders?.count)
        ))
        getAllOrderSuccess().then((res) => (
            updateProductValue("Đơn hàng thành công", res?.Orders?.count)
        ))
    }
    useEffect(() => {
        handleGetDataChart()
        getTop10().then((res) => {
            setDataBarChart(res.pet.rows)
        })
    }, [])
    console.log(dataBarChart)
    const COLORS = ['#0088FE', '#FFBB28', 'red'];

    const PieChartComponent = () => (
        <PieChart width={300} height={300}>
            <Pie data={dataProducts} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={'100%'} fill="#8884d8">
                {dataProducts.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
        </PieChart>
    );

    const BarChartComponent = () => (
        <BarChart width={1080} height={300} data={dataBarChart}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="top_quantity" fill="#8884d8" />
        </BarChart>
    );
    return (
        <div>
            <h2 className='title_contentAdminHome'>Thống kê đơn hàng trong tháng gần nhất</h2>
            <PieChartComponent />
            <h2 className='title_contentAdminHome'>Top 10 mặt hàng được bán chạy nhất</h2>
            <BarChartComponent />
        </div>
    )
}
