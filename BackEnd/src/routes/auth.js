import * as controller from '../controller'
import express from 'express'
import uploadCloud from '../mid/cloudinary-upload';
const router = express.Router();

router.get('/getAllThuCung', controller.getAllThuCung);
router.get('/getThuCung/:idThuCung', controller.getThuCung);
router.get('/getCategoryThuCung/:idDanhMuc', controller.getCategoryThuCung);
router.get('/getAllDanhMuc', controller.getAllDanhMuc)
router.get('/getDanhMuc', controller.getDanhMuc) // get limit=3
router.get('/getIdDanhmuc/:idDanhMuc', controller.getIdDanhmuc)
router.get('/getAllBill', controller.getAllBill)
router.get('/getBill/:idBill', controller.getBill)
router.get('/getAllNews', controller.getAllNews)
router.get('/getNew/:idNew', controller.getNew)
router.post('/getAllOrder', controller.getAllOrder)
router.get('/getOrder/:idUser', controller.getOrder) // get đơn hàng theo idUser
router.get('/getOrderPK/:idOrder',controller.getOrderPK) // get đơn hàng theo id Order



// upload image
router.post('/uploadImage', uploadCloud.single('file'), controller.uploadImg)
// Order có 2 trạng thái (Đã thanh toán, chưa thanh toán)
router.post('/getOrderStatus/:idUser', controller.getOrderStatus) // get theo trạng thái 
router.get('/getCart/:idUser', controller.getCart)
router.post('/suaThuCung/:idThuCung', uploadCloud.single('image'), controller.suaThuCung);
router.delete('/xoaThuCung/:idThuCung', controller.xoaThuCung);
//Xóa user
router.delete('/xoaUser/:idUser', controller.xoaUser);
router.post('/themThuCung', uploadCloud.single('image'), controller.themThucung);
router.post('/themDanhMuc', controller.themDanhMuc);
router.delete('/xoaDanhMuc/:idDanhMuc', controller.xoaDanhMuc);
router.post('/suaDanhMuc/:idDanhMuc', controller.suaDanhMuc);
router.post('/themNews', controller.themNews);
router.post('/updateNews/:idNew', controller.updateNews)
router.post('/deleteNews/:idNew', controller.deleteNews);
router.post('/insertCart/:idUser', controller.insertCart);
router.post('/updateCart/:idCart', controller.updateCart);
router.delete('/cleartCart/:idUser', controller.cleartCart);
router.post('/choThanhToanCart', controller.choThanhToanCart);
router.delete('/deleteCart/:idCart', controller.deleteCart);
router.post('/insertBill/:idUser', controller.insertBill) // id , id_user ,idThuCung , SoLuong ,Tổng tiền , trạng thái(Giao hàng thành công, Giao hàng thất bại)
router.post("/updateBill/:idBill", controller.updateBill)
router.post('/insertOrder/:idUser', controller.insertOrder)// Đã thanh toán, Chưa thanh toán  // Xử lí tính tổng bên fe
//Thanh toán bằng VNPAY
router.get('/changeStatusOrder/:idOrder', controller.changeStatusOrder) // Chuyển trạng thái đơn hàng sang đã thanh toán
router.get('/cancelOrder/:idOrder', controller.cancelOrder) // Chuyển trạng thái đơn hàng sang hủy đơn hàng
router.post('/updateOrder/:idOrder',controller.updateOrder); // Update nội dung đơn hàng bên fe (Dựa theo cái id Order)
router.post('/insertPay/:idNhanVien', controller.insertPay) //Chưa xử lí
router.get('/gettop10', controller.top10) 

// VNPay 

router.post('/create_payment_url', controller.createPayment);
router.get('/vnpay_return', controller.returnPayment);


module.exports = router


//avatar_detail (mảng)
//avatar_pets chưa up được ảnh
// thanh thanh toán baokim vnpay paypal

