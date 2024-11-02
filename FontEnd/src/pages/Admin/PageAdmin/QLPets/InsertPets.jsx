
import React, { useEffect, useState, memo } from 'react';
import { Button, Modal, Space, Upload, Input, message, Dropdown } from 'antd';
import { UserAddOutlined, UploadOutlined, DownOutlined } from '@ant-design/icons';
import { themThuCung, getAllCategory, getAllProDucts } from '../../../../componnents/Api';
import '../../css/QLPets/InsertPets.css'
import '../../css/QLUser/ModalUser.css'
import { api } from './../../../../componnents/Api/index';
const LocalizedModalPets = ({ setProducts }) => {
    const [open, setOpen] = useState(false);
    const [dataModalUser, setDataModalUser] = useState({
        category: "",
        id_category: "",
        name: "",
        price: "",
        describe: "",
        species: "",
        avatar: "https://wallpapercave.com/wp/wp9015508.jpg",
    })
    console.log(dataModalUser)
    const [dataCategory, setCategory] = useState([])
    const handleGetData = () => {
        getAllCategory().then(res => (
            setCategory(res?.categorys)
        ))
        showModal();
    }
    const items = dataCategory?.map(item => {
        return {
            key: item?.id,
            label: item?.name
        }
    })
   
    const onClick = ({ key }) => {
        const categoryFilter = items.filter(item => item.key == key);
        handleChangeDataUser("id_category", categoryFilter[0].key)
        handleChangeDataUser("category", categoryFilter[0].label)
    };
    const showModal = () => {
        setOpen(true);
    };
    const hideModal = () => {
        setOpen(false)
    }
    const handleChangeDataUser = (key, value) => {
        if (value) {
            setDataModalUser(prev => ({
                ...prev,
                [key]: value
            }))
        }
    }
    const loadDataPets = () => {
        getAllProDucts().then((res) => (
            setProducts(res?.pets?.rows)
        ))
    }
    const handleInsertPets = (key, value) => {
       
        if (dataModalUser?.name === "" || dataModalUser?.price === "" || dataModalUser?.describe === "" || dataModalUser?.species === "" || dataModalUser?.category === "") {
            setOpen(true)
            message.warning("Vui lòng điền đầy đủ thông tin")
            console.log(2)
        }
        else {
            themThuCung(dataModalUser).then((res) => {
                if(res?.mess==="Thêm thú cưng thành công"){
                    setDataModalUser({
                        name: "",
                        avatar: "https://wallpapercave.com/wp/wp9015508.jpg",
                        price: "",
                        describe: "",
                        species: "",
                        id_category: ""
                    })
                    loadDataPets();
                    hideModal();
                    message.success(res?.mess)
                }
                else{
                    message.warning(res?.mess)
                }
            })
        }
    }
    const props = {
        action: api+ 'users/uploadImage',
        onChange({ file }) {
          if (file.status === 'done') {
            const url = file.response
            handleChangeDataUser("avatar",url)  
          }
        },
      };
    useEffect(() => {
        getAllCategory()
    }, [])

    return (
        <>
            <Button type="primary" onClick={handleGetData}>
                <UserAddOutlined />Thêm thú cưng
            </Button>
            <Modal
                title="Thông tin thú cưng"
                open={open}
                onOk={handleInsertPets}
                onCancel={hideModal}
                okText="Xác nhận"
                cancelText="Hủy bỏ"
            >
                <p className='lable_center'>
                    <Upload  {...props}>
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                </p>
                <div className="information_user p-infomrmation_user bold_inf_user">
                  
                    <Dropdown
                        menu={{
                            items,
                            onClick
                        }}
                    >
                        
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                {/* Chọn danh mục */}
                                {dataModalUser?.category ? dataModalUser?.category : "Chọn Danh Mục"}
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>

                    <p className='p-infomrmation_user bold_inf_user bold_inf_user'> Tên thú cưng:
                        <Input placeholder={'Nhập tên thú cưng'}
                            allowClear
                            defaultValue={dataModalUser?.name}
                            onChange={e => handleChangeDataUser("name", e.target.value)}
                        />

                    </p>
                    <p className='p-infomrmation_user bold_inf_user bold_inf_user'>Giá thành:</p>
                    <Input
                        placeholder={'Nhập giá thành'}
                        defaultValue={dataModalUser?.price}
                        allowClear
                        onChange={e => handleChangeDataUser("price", e.target.value)} />

                    <p className='p-infomrmation_user bold_inf_user'>Mô tả:
                        <Input placeholder={'Nhập mô tả'}
                            allowClear
                            defaultValue={dataModalUser?.describe}
                            onChange={e => handleChangeDataUser("describe", e.target.value)}
                        />
                    </p>
                    <p className='p-infomrmation_user bold_inf_user'>Thuộc giống:
                        <Input placeholder={'Nhập giống loài'}
                            allowClear
                            defaultValue={dataModalUser?.describe}
                            onChange={e => handleChangeDataUser("species", e.target.value)}
                        />
                    </p>

                </div>
            </Modal>
        </>
    )
}
const InsertPets = ({ setProducts }) => {
    const [modal, contextHolder] = Modal.useModal();
    return (
        <>
            <Space>
                <LocalizedModalPets setProducts={setProducts} />
            </Space>
            {contextHolder}
        </>
    );
}
export default memo(InsertPets)
