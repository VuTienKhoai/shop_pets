import * as controller from '../controller'
import express from 'express'
import uploadCloud from '../mid/cloudinary-upload'
const router = express.Router();

// router.post('/' ,uploadCloud.single('image'),controller.dangKi)
router.post('/register',uploadCloud.single('image'),controller.dangKi) 
router.post('/login' ,controller.dangNhap) 
router.post('/forgotPassword' ,controller.forgotPassword) // tham khảo và xử lí token
router.get('/reset-password/:token', controller.renderResetPasswordPage);
router.post('/reset-password/:token', controller.resetPassword);
router.get('/getAllUser',controller.getAllUser) // đã
router.get('/getUser/:idUser',controller.getUser)// đã xong
router.get('/getAllCustomer',controller.getAllCustomer) 
router.get('/getAllEmployee',controller.getAllEmployee)
router.post('/updateUser/:userId', uploadCloud.single('image'),controller.updateUserController);
module.exports = router