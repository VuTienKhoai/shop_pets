export const api = "https://thu-cung-jjr4.onrender.com/api/v1/"
// Đăng nhập
export const login = (data) => {
    return fetch(api + "users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
            data
        ),
    }).then((res) => res.json());
};
// Đăng ký
export const register = (data) => {
    return fetch(api + "users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
            data
        ),
    }).then((res) => res.json());
};
// Quên mật khẩu
export const forgotPassword = (email) => {
    return fetch(api + "users/forgotPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
            email
        ),
    }).then((res) => res.json());
};

export const updateUser = (idUser,dataUser)=>{
    console.log(dataUser)
    return fetch(api+`users/updateUser/${idUser}`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(
            dataUser
        ),
    }).then((res)=>res.json())
}

const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);
  
    try {
      const response = await fetch(api +'users/uploadImage', {
        method: 'POST',
        body: formData,
      });
   response.ok ? console.log('response') : console.log(response)
     // return data;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };
  
  export { uploadImage };
  
  
  

// .....Phương thức get....... //
// ........................... //
// ........................... //
  

// Lấy tất cả sản phẩm
export const getTop10 = () => {
    return fetch(api + 'users/gettop10')
        .then(res => res.json())
}
export const getAllProDucts = () => {
    return fetch(api + 'users/getAllThuCung')
        .then(res => res.json())
}
// Lấy tất cả danh mục
export const getAllCategory = () => {
    return fetch(api + 'users/getAllDanhMuc')
        .then(res => res.json())
}
// Lấy thú cưng theo danh mục
export const getCategoryThuCung = (idDanhMuc) => {
    return fetch(api + 'users/getCategoryThuCung/' + idDanhMuc)
        .then(res => res.json())
}






//Lấy thông tin của một danh mục
export const getCategory = (idDanhMuc)=>{
    return fetch(api+'users/getIdDanhmuc/'+idDanhMuc)
    .then(res=>res.json())
}
// Lấy danh sách giỏ hàng theo id người dùng
export const getCart = (idUser) => {
    return fetch(api + 'users/getCart/' + idUser)
        .then(res => res.json())
}
// Lấy thông tin tất cả người dùng
export const getAllUser = () => {
    return fetch(api + 'users/getAllUser')
        .then(res => res.json())
}
// Lấy thông tin tất cả người dùng
export const getUser = (userId) => {
    return fetch(api + 'users/getUser/' + userId)
        .then(res => res.json())
}
// Lấy thông tin khách hàng
export const getAllCustomer = () => {
    return fetch(api + 'users/getAllCustomer')
        .then(res => res.json())
}
// Lấy thông tin nhân viên
export const getAllEmployee = () => {
    return fetch(api + 'users/getAllEmployee')
        .then(res => res.json())
}
// Lấy thông tin 1 thú cưng
export const getThuCung = (idThuCung) => {
  
    return fetch(api + 'users/getThuCung/' + idThuCung)
        .then(res => res.json())
}
// Lấy thông tin tất cả hóa đơn
export const getAllBill = () => {
    return fetch(api + 'users/getAllBill')
        .then(res => res.json())
}
// Lấy thông tin 1 hóa đơn
export const getBill = () => {
    return fetch(api + 'users/getBill')
        .then(res => res.json())
}
// Lấy tất cả thông tin về tin tức
export const getAllNews = () => {
    return fetch(api + 'users/getAllNews')
        .then(res => res.json())
}
// Lấy thông tin về 1 tin tức
export const getNew = (idNew) => {
    return fetch(api + 'users/getAllNews' + idNew)
        .then(res => res.json())
}
// Lấy thông tin trả về 3 danh mục đầu tiên getDanhMuc
export const getDanhMucLM3 = () => {
    return fetch(api + 'users/getDanhMuc')
        .then(res => res.json())
}
//Lấy thông tin tất cả đơn hàng
// export const getAllOrder=()=>{
//     return fetch(api+'users/getAllOrder')
//     .then(res=>res.json())
// }

export const getAllOrder = (status) => {
    return fetch(api + "users/getAllOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            status
        }),
    }).then((res) => res.json());
};

export const getAllOrderCancel = () => {
    return fetch(api + "users/getAllOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            status:'Đơn hàng đã hủy'
        }),
    }).then((res) => res.json());
};
export const getAllOrderUnpaid = () => {
    return fetch(api + "users/getAllOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            status:'Chưa thanh toán'
        }),
    }).then((res) => res.json());
};
export const getAllOrderSuccess = () => {
    return fetch(api + "users/getAllOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            status:'Đã thanh toán'
        }),
    }).then((res) => res.json());
};


//Lấy đơn hàng theo user
export const  getOrder=(idUser)=>{
    return fetch(api+'users/getOrder/'+idUser)
    .then(res=>res.json())
}
//Lấy đơn hàng theo idUser+ trạng thái
export const getOrderStatus=(idUser,status)=>{
    return fetch(api+"users/getOrderStatus/"+idUser,{
        method:"POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
            {status}
        ),
    }).then((res)=>res.json());
}

//Lấy đơn hàng theo idOrder 
export const  getOrderPK=(idOrder)=>{
    return fetch(api+'users/getOrderPK/'+idOrder)
    .then(res=>res.json())
}

//Chuyền trạng thái => Đã thanh toán Order
export const  changeStatusOrder=(idOrder)=>{
    return fetch(api+'users/changeStatusOrder/'+idOrder)
    .then(res=>res.json())
}
//Chuyển trạng thái =>Đơn hàng đã hủy
export const  cancelOrder=(idOrder)=>{
    return fetch(api+'users/cancelOrder/'+idOrder)
    .then(res=>res.json())
}
//

// .....Phương thức post....... //
// ........................... //
// ........................... //

// Thêm sp vào giỏ hàng
export const addToCart = (userId, idPet,quantity) => {
    return fetch(api + "users/insertCart/" + userId, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            idPet,
            quantity
        }),
    }).then((res) => res.json());
};
// Thêm danh mục
export const themDanhMuc = (name) => {
    return fetch(api + "users/themDanhMuc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name
        }),
    }).then((res) => res.json());
};
export const suaDanhMuc = (idDanhMuc, data) => {
    return fetch(api + "users/suaThuCung" + idDanhMuc, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            data
        }),
    }).then((res) => res.json());
};
// Thêm thú cưng
export const themThuCung = (data) => {
    return fetch(api + "users/themThuCung", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
            data
        ),
    }).then((res) => res.json());
};
export const suaThuCung = (idThuCung, data) => {
    return fetch(api + "users/suaThuCung/" + idThuCung, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
            data
        ),
    }).then((res) => res.json());
};
export const addNews = (data) => {
    return fetch(api + "users/themNews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            data
        }),
    }).then((res) => res.json());
};
export const suaNews = (idNew, data) => {
    return fetch(api + "users/updateNews/" + idNew, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            data
        }),
    }).then((res) => res.json());
};
export const updateCart = (idCart, quantity) => {
    return fetch(api + "users/updateCart/" + idCart, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            quantity
        }),
    }).then((res) => res.json());
};

// sửa danh mục 
export const updateCategory = (idCategory,name)=>{

    return fetch (api+"users/suaDanhMuc/"+idCategory,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name
        }),
    }).then((res)=>res.json());
} 
//thêm đơn hàng 
export const insertOrder=(idUser,thuCung, status)=>{

    return fetch (api+"users/insertOrder/"+idUser,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          thuCung,
          status
        }),
    }).then((res)=>res.json());
}


export const updateOrder=(idOrder,status)=>{
    return fetch(api+"users/updateOrder/"+idOrder,{
        method:"POST",
        headers:{"Content+Type":"application/json"},
        body:JSON.stringify(
            status
        ),
    }).then((res)=>res.json())
}

export const insertBill=(id_user,id_ThuCung, soLuong, tongTien, status )=>{
    return fetch(api+'users/insertBill/'+id_user,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            id_ThuCung, soLuong, tongTien, status 
        })
    }).then((res)=>res.json())
}




// ....Phương thức delete..... //
// ........................... //
// ........................... //


//Xóa user 
export const deleteUser=(idUser)=>{
    
    return fetch(api+'users/xoaUser/'+idUser,{method:'DELETE'})
    .then(res=>res.json())
}



//Xóa thú cưng
export const deletePet=(idPet)=>{
   
    return fetch(api+'users/xoaThuCung/'+idPet,{method:'DELETE'})
    .then(res=>res.json())
}

//Cleart cart
export const cleartCart=(idUser)=>{
    return fetch(api+'users/cleartCart/'+idUser,{method:'DELETE'})
    .then(res=>res.json())
}
// Xóa sp khỏi giỏ hàng
export const deleteCart = (idCart) => {
    return fetch(api + 'users/deleteCart/' + idCart, { method: 'DELETE' })
        .then(res => res.json())
}

export const deleteCategory=(idDanhMuc)=>{
    return fetch(api+'users/xoaDanhMuc/'+idDanhMuc,{method: 'DELETE'})
        .then(res=>res.json())
}

export const deleteOrder=(idOrder)=>{
    return fetch(api+'users/deleteOrder'+idOrder,{method:'DELETE'})
    .then(res=>res.json())
}




// VNPay

export const create_payment_url = (amount) => {
    return fetch(api + "users/create_payment_url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
            {amount,bankCode: ""}
        ),
    }).then((res) => 
        res.json()
    );
};


export const vnPay_Return = (params) => {
    // Biến đổi object params thành query parameters
    const queryString = Object.keys(params)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
        .join('&');

    // Thêm query parameters vào URL
    const urlWithParams = api + 'users/vnpay_return?' + queryString;
    return fetch(urlWithParams, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(res => res.json())
}

