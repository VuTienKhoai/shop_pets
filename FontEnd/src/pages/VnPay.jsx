import React, { useEffect } from 'react'
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { insertOrder, vnPay_Return } from '../componnents/Api';

export default function VnPay() {

    const idUser = localStorage.getItem('idUser');
    const selectedItem = JSON.parse(localStorage.getItem('selectedItems'));
    const navigate = useNavigate()
    const searchParams = new URLSearchParams(window.location.search.substring(1));
    const vnpParams = {
        vnp_Amount: searchParams.get('vnp_Amount'),
        vnp_BankCode: searchParams.get('vnp_BankCode'),
        vnp_CardType: searchParams.get('vnp_CardType'),
        vnp_OrderInfo: searchParams.get('vnp_OrderInfo'),
        vnp_PayDate: searchParams.get('vnp_PayDate'),
        vnp_ResponseCode: searchParams.get('vnp_ResponseCode'),
        vnp_TmnCode: searchParams.get('vnp_TmnCode'),
        vnp_TransactionNo: searchParams.get('vnp_TransactionNo'),
        vnp_TransactionStatus: searchParams.get('vnp_TransactionStatus'),
        vnp_TxnRef: searchParams.get('vnp_TxnRef'),
        vnp_SecureHash: searchParams.get('vnp_SecureHash')
    };

    // const [mess, setMess] = useState()
    const fetchData = async () => {
        try {
            const response = await vnPay_Return(vnpParams);
          
            if (response.code == "00") {
                console.log("first")
                insertOrder(idUser, selectedItem, "Đã thanh toán").then((res) => {
                    // if (res.err == 0) {
                    if (res.err == 0) {
                        
                        console.log(res)
                        message.success('Thanh toán thành công')
                        // setCartItems([])
                        navigate("/")
                        localStorage.removeItem('selectedItems');
                    }
                    // setMess('Thanh toán thành công')

                    // }
                })

            } else {
                // Check thêm mã lỗi nhé 
                message.error('Giao dịch đã xảy lỗi quy khách vui lòng thanh toán lại')
                navigate("/profile")
                // setMess('Thanh toán thất bại')

            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div className='mt-header'>
            {/* <div>VnPay_return: {mess}</div> */}
        </div>
    )
}
