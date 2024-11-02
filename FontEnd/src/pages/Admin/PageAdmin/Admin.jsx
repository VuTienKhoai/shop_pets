import React, { useEffect } from 'react'
import HeaderAdmin from '../componnents/HeaderAdmin';
import AdminMenu from './AdminMenu';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
export default function Admin({ dataUser, setInforUser }) {
  const navigate = useNavigate()
  const handleCheckRole = () => {
    if (dataUser?.role_id === 'R3') {
      message.warning("Tài khoản của bạn không phải tài khoản quản lý!")
      navigate("/")
    }
  }
  useEffect(()=>{
    handleCheckRole();
  },[dataUser])
  return (
    <div className="">
      <div className="header_Admin">
        {/* <HeaderAdmin /> */}
        <div className="content_Admin">
          <AdminMenu dataUser={dataUser} setInforUser={setInforUser} />
        </div>
      </div>
    </div>
  )
}
