import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { getOrderPK } from '../../../../componnents/Api';
export default function DetailOrder() {
    let { idOrder } = useParams();
    const [data,setData]=useState([]);

    console.log(data)
    useEffect(()=>{
      getOrderPK(idOrder).then((res)=>{
        setData(res)
      })
    },[])
  return (
    <div>
        {idOrder}
    </div>
  )
}
