import React, { useState } from 'react'
import { Button, Modal, Space, Input, message } from 'antd';
import { FolderAddFilled } from '@ant-design/icons';
import { getAllCategory, themDanhMuc } from '../../../../componnents/Api';

const LocalizedCatergori = ({setFilterCategory}) => {
    const [openCategori, setOpenCategori] = useState(false)
    const [nameCategori, setNameCategori] = useState("")
    const showModal = () => {
        setOpenCategori(true)
    }
    const handleChangeCategori = (value) => {
        setNameCategori(value)
       
    }
    const loadDataCategory=()=>{
        getAllCategory().then((res)=>(
            setFilterCategory(res?.categorys)
        ))
    }
    const handleAddCategori = () => {
        if(nameCategori===""){
            message.warning("Vui lòng điền đầy đủ tên danh mục")
        }
        else{
            themDanhMuc(nameCategori).then((res) => {
                if(res?.mess==="Thêm thành công danh mục"){
                    message.success(res?.mess)
                    loadDataCategory();
                    setOpenCategori(false)
                }
                else{
                    message.warning(res?.mess)
                }
            })
        }
    }
    const hideModalCategori = () => {
        setOpenCategori(false)
    }
    return (
        <>
            <Button type='primary' onClick={showModal}>
                <FolderAddFilled /> Thêm danh mục
            </Button>
            <Modal
                title="Thông tin danh mục"
                open={openCategori}
                onOk={handleAddCategori}
                onCancel={hideModalCategori}
                okText="Xác nhận"
                cancelText="Hủy bỏ"
            >
                <div className="information_categori">
                    <p style={{paddingBottom:'5px'}}> Tên danh mục:

                    </p>
                        <Input placeholder={'Nhập tên danh mục'}
                            allowClear
                            onChange={e => handleChangeCategori(e.target.value)}
                        />
                </div>
            </Modal>
        </>
    )
}
export default function InsertCategory({setFilterCategory}) {
    const [modal, contextHolder] = Modal.useModal();
    return (
        <>
            <Space>
                <LocalizedCatergori  setFilterCategory={setFilterCategory}/>

            </Space>
            {contextHolder}
        </>
    )
}
