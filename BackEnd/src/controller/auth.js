import * as services from '../sevices'
export const uploadImg = async (req, res) => {
    try {
        const fileData = req.file;
        const image = fileData?.path;
        
        return res.status(200).json(image)
    }
    catch (e) {
        return res.status(500).json({
            err: -1,
            mess: "Loi sever"
        })
    }
}
export const getAllThuCung = async (req, res) => {
    try {
        const result = await services.getAllThuCung();
        if (result.err == 0) {
            res.status(200).json(result);
        }
        else {
            res.status(500).json(result);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Lỗi sever", user: null })
    }
}
export const getAllDanhMuc = async (req, res) => {
    try {
        const response = await services.getAllDanhMuc();
        return res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ messsage: "Lỗi sever", Category: null })
    }
}

export const getDanhMuc = async (req, res) => {
    try {
        const response = await services.getDanhMuc();
        return res.status(200).json(response)
    } catch (e) {
        res.status(500).json({
            err: -1,
            message: "Lỗi sever",
        })
    }
}
export const getCategoryThuCung = async (req, res) => {
    try {
        const idDanhMuc = req.params.idDanhMuc;
        const response = await services.getCategoryThuCung(idDanhMuc );
        return res.status(200).json(response)
    }
    catch (error) {
        res.status(400).json({
            err:-1,
            message: "Lỗi sever"
        })
    }
}


export const getAllNews = async (req, res) => {
    try {

        const response = await services.getAllNews();
        return res.status(200).json(response)
    } catch (e) {
        res.status(500).json({
            err: -1,
            mess: "Lỗi sever"
        })
    }
}

export const getNew = async (req, res) => {
    try {
        const idNew = req.params.idNew
        const response = await services.getNew({ idNew });
        return res.status(200).json(response)
    } catch (e) {
        res.status(500).json({
            err: -1,
            mess: "Lỗi sever"
        })
    }
}

export const getIdDanhmuc= async (req,res)=>{
    try{
        const idDanhMuc=req.params.idDanhMuc
        const response= await services.getIdDanhmuc({idDanhMuc})
        return res.status(200).json(response)
    }
    catch(e){
        res.status(500).json({
            err:-1,
            mess:"Lỗi sever"
        })
    }
}
export const getAllOrder = async (req, res) => {
    try {
        const {status}=req.body;
        const response = await services.getAllOrder(status);
        return res.status(200).json(response)
    } catch (error) {
        res.status(500).json({
            err:-1,
            mess:"Lỗi sever"
        })
    }
}

export const getCart = async (req, res) => {
    try {
        const idUser = req.params.idUser;
        const response = await services.getCart(idUser);

        return res.status(200).json(response)

        
    } catch (e) {
        res.status(500).json({
            err: -1,
            mess: "Lỗi sever",
        })
    }
}

export const getOrderStatus = async (req,res)=>{
    try{
        const idUser=req.params.idUser;
        const {status}=req.body;
        console.log(status,idUser)
        const response = await services.getOrderSatus(idUser,status)
        return res.status(200).json(response)
    }catch(e){
        res.status(500).json({
            err:-1,
            mess:'Lỗi sever',
        })
    }
}
export const suaThuCung = async (req, res) => {
    try {
        const fileData = req.file;
        const avatar = fileData?.path ? fileData.path : req.body?.avatar;
        const idThuCung = req.params.idThuCung;
        const { name, price, describe, species, id_category,quantity} = req.body;


        const response = await services.suaThuCung({ idThuCung, name, price, describe, species, id_category,avatar,quantity })
        return res.status(200).json(response)


    } catch (e) {
        return res.status(500).json({
            err: -1,
            mess: 'Lỗi sever'
        })
    }
}

export const choThanhToanCart = async (req, res) => {
    try {
        const {idCart} = req.body;
        const response = await services.choThanhToanCart( {idCart} )
        return res.status(200).json(response)
    } catch (e) {
        return res.status(500).json({
            err: -1,
            mess: "Lỗi sever"
        })
    }
}
export const themThucung = async (req, res) => {
    try {

        const fileData = req.File;
        const avatar = fileData?.path ? fileData.path : req.body?.avatar;
       
        const { name, price, describe, species, id_category } = req.body
        if (!name || !price || !describe || !species || !id_category ) return res.status(400).json(
            {
                err: 1,
                mess: "Điền thông tin đầy đủ"
            }
        )

        const response = await services.themThuCung({ name, price, describe, species, id_category,avatar })
        return res.status(200).json(response)


    } catch (e) {
        return res.status(500).json({
            err: -1,
            mess: 'Lỗi sever'
        })
    }
}

export const insertCart = async (req, res) => {
    try {
        const idUser = req.params.idUser;

        const { idPet,quantity } = req.body
        const response = await services.insertCart({ idUser, idPet,quantity})
        return res.status(200).json(response)
    } catch (e) {
        return res.status(500).json({
            err: -1,
            mess: "Lỗi sever"
        })
    }
}


export const updateCart = async (req, res) => {
    try {
        const idCart = req.params.idCart;
        const { quantity } = req.body;

        const response = await services.updateCart({ idCart, quantity })
        return res.status(200).json(response)
    } catch (e) {
        return res.status(500).json({
            err: -1,
            mess: "Lỗi sever"
        })
    }
}
export const themNews = async (req, res) => {
    try {
        const fileData = req.File;
        const avatar = fileData?.path;

        const { title, describe, author} = req.body;
        if (!title || !describe || !author,avatar) return res.status(400).json(
            {
                err: 1,
                mess: "Điền đầy đủ thông tin"
            }
        )
        const response = await services.themNews({ title, describe, author,avatar })
        return res.status(200).json(response)
    } catch (e) {
        return res.status(500).json({
            err: -1,
            mess: 'Lỗi sever'
        })
    }

}
export const updateNews = async (req, res) => {
    try {
        const idNew = req.params.idNew;
        const { title, describe, author } = req.body;
        const response = await services.updateNews({ idNew, title, describe, author })
        return res.status(200).json(response)
    } catch (e) {
        return res.status(500).json({
            err: -1,
            mess: "Lỗi sever "
        })
    }
}

export const changeStatusOrder = async (req,res)=>{
    try{
        const idOrder=req.params.idOrder
        const response = await services.changeStatusOrder(idOrder)
        return res.status(200).json(response)
    }catch(e){
        return res.status(500).json({
            err:-1,
            mess:"Lỗi sever"
        })
    }
}
export const cancelOrder = async (req,res)=>{
    try{
        const idOrder=req.params.idOrder
        const response = await services.cancelOrder(idOrder)
        return res.status(200).json(response)
    }catch(e){
        return res.status(500).json({
            err:-1,
            mess:"Lỗi sever"
        })
    }
}

export const updateOrder= async (req,res)=>{
    try{
        const idOrder=req.params.idOrder
        const {thuCung,tongTien}=req.body
        const response=await services.updateOrder(idOrder,thuCung,tongTien)
        return res.status(200).json(response)
    }catch(e){
        return res.status(500).json({
            err:-1,
            mess:"Lỗi sever"
        })
    }
}


export const themDanhMuc = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) return res.status(400).json(
            {
                err: 1,
                mess: "Điền thông tin đầy đủ"
            }
        )
        const response = await services.themDanhMuc({ name });
        return res.status(200).json(response)
    } catch (e) {
        return res.status(500).json({
            err: -1,
            mess: 'Lỗi sever'
        })
    }
}

export const xoaDanhMuc = async (req, res) => {
    try {
        const idDanhMuc = req.params.idDanhMuc;
      
        const response = await services.xoaDanhMuc({ idDanhMuc })
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            err: -1,
            mess: "Lỗi sever"
        })
    }
}


export const deleteCart = async (req, res) => {
    try {
        const idCart = req.params.idCart
        const response = await services.deleteCart(idCart)
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            err: -1,
            mess: "Lỗi sever"
        })
    }
}

export const cleartCart = async (req, res) => {
    try {
        const idUser = req.params.idUser
        const response = await services.cleartCart(idUser)
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            err: -1,
            mess: "Lỗi sever"
        })
    }
}
export const deleteNews = async (req, res) => {
    try {
        const idNew = req.params.idNew;
        const response = await services.deleteNews({ idNew })
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            err: -1,
            mess: "Lỗi sever"
        })
    }
}



export const suaDanhMuc = async (req, res) => {
    try {
        const idDanhMuc = req.params.idDanhMuc;
        const { name } = req.body;
       

        const response = await services.suaDanhMuc({ idDanhMuc, name })
        return res.status(200).json(response)
    } catch (e) {
        return res.status(500).json({
            err: -1,
        })
    }
}

export const xoaThuCung = async (req, res) => {
    try {
        const idThuCung = req.params.idThuCung;
      
        const response = await services.xoaThuCung({ idThuCung })
        return res.status(200).json(response)


    } catch (e) {
        return res.status(500).json({
            err: -1,
            mess: 'Lỗi sever'
        })
    }
}
export const xoaUser = async (req, res) => {
    try {
        const idUser = req.params.idUser;
      
        const response = await services.xoaUser({ idUser })
        return res.status(200).json(response)


    } catch (e) {
        return res.status(500).json({
            err: -1,
            mess: 'Lỗi sever'
        })
    }
}

export const idOrder = async (req, res) => {
    try {
        const idOrder = req.params.idOrder
        const response = await services.deleteOrder({ idOrder })
        return res.status(200).json(response)
    } catch (e) {
        return res.status(500), json({
            err: -1,
            mess: 'lỗi sever'
        })
    }
}
export const insertBill = async (req, res) => {
    try {
        const id_user = req.params.idUser;

        const {id_ThuCung, soLuong, tongTien, status } = req.body
        if (!id_user|| !id_ThuCung || !soLuong ||!tongTien|| !status) return res.status(400).json(
            {
                err: 1,
                mess: "Điền thông tin đầy đủ"
            }
        )
        const response = await services.insertBill(id_user,id_ThuCung, soLuong, tongTien, status );
        return res.status(200).json(response)

    } catch (e) {
        return res.status(500).json({
            err: -1,
            mess: "Lỗi sever"
        })
    }
}

export const updateBill = async (req,res)=>{
    try{
        const idBill=req.params.idBill
        const {status}=req.body
        const response = await services.updateBill(idBill,status)
        return res.status(200).json(response)
    }catch(e){
        return res.status(500).json({
            err:-1,
            mess:"Lỗi sever"
        })
    }
}
export const insertOrder = async (req, res) => {
    try {
        const id_user = req.params.idUser;

        const {thuCung,status} = req.body
        if (!id_user|| !thuCung) return res.status(400).json(
            {
                err: 1, 
                mess: "Điền thông tin đầy đủ"
            }
        )
        const response = await services.insertOrder(id_user,thuCung,status);
        return res.status(200).json(response)

    } catch (e) {
        return res.status(500).json({
            err: -1,
            mess: "Lỗi sever"
        })
    }
}
export const insertPay = async (req, res) => {
    try {

    } catch (e) {
        return res.status(500).json({
            err: -1,
            mess: 'Lỗi sever'
        })
    }
}
export const getSearchBill = async (req, res) => {
    try {
        const { idNhanVien, soLuong, donGia, idThuCung, status, createdAt } = req.body

        const response = await services.getSearchBill({ idNhanVien, idThuCung, soLuong, donGia, status, createdAt })
        return res.status(200).json(response)

    } catch (e) {
        return res.status(500).json({
            err: -1,
            mess: 'Lỗi sever'
        })
    }
}

export const getAllBill = async (req, res) => {
    try {
        const response = await services.getAllBill();
        return res.status(200).json(response)
    } catch (e) {
        return res.status(500).json({
            err: -1,
            mess: "Lỗi sever"
        })
    }
}


export const top10 = async (req, res) => {
    try {
        const response = await services.getTop10();
        return res.status(200).json(response)
    } catch (e) {
        return res.status(500).json({
            err: -1,
            mess: "Lỗi sever"
        })
    }
}



export const createPayment = async (req, res) => {
    try {
        const { amount, language, bankCode, ipAddr } = req.body
        const paymentUrl = await services.createPayment({ ipAddr, amount, language, bankCode });

        return res.status(200).json(paymentUrl)
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
export const returnPayment = async (req, res) => {
    try {
        let vnp_Params = req.query;
        const paymentUrl = await services.returnPayment({ vnp_Params });

        return res.status(200).json(paymentUrl)
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};