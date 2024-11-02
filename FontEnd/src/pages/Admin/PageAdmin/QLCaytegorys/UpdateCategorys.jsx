import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import { Button, Input, message, Flex } from 'antd';
import { getCategory, updateCategory } from '../../../../componnents/Api'
import { LeftOutlined } from '@ant-design/icons';
import '../../css/QLUser/UpdateUser.css'
export default function UpdateCategorys() {
  const history = useNavigate();
  let { idDanhMuc } = useParams();
  const [dataCategory, setDataCategory] = useState();
  const [nameCategory, setNameCategory] = useState("");
  const handleCategory = (name) => {
    setNameCategory(name)
  }
  const handleStatusPost = () => {
    updateCategory(idDanhMuc, nameCategory).then((res) => {
      message.success(res.mess)
      history(-1)
    })
  }
  useEffect(() => {
    getCategory(idDanhMuc).then((res) => {
      setDataCategory(res?.category)
    })
  }, [])

  return (
    <div className="content_updateUser">
      <div className="backgr_updateUser">
      </div>
      <div className="backgr_color">

      </div>
      <div className="content_inf">
        <div className="icon_back" onClick={() => { history(-1) }}>
          <LeftOutlined /> Về trang chủ
        </div>
        <div className="information_user_updateUser">
          <p className='text_gt_inf' style={{ marginTop: '10px', fontWeight: 'bold' }}> Mã thú cưng:  <span>{idDanhMuc}</span> </p>
          <div className="item_infUpdateUser">
            <p className='text_updateInf'><strong>Tên danh mục:</strong></p>
            <Input placeholder={`${dataCategory?.name ? dataCategory.name : 'Đang cập nhật'} `}
              onChange={e => handleCategory(e.target.value)} />
            <Flex justify='center' style={{ marginTop: '30px' }} >
              <Button onClick={() => handleStatusPost()} type="primary" size='middle'> Cập nhật thông tin</Button>
            </Flex>
          </div>

        </div>
      </div>
    </div>
  )
}
