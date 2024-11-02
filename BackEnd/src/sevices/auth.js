import db from '../models'
import crypto from 'crypto';
import bcrypt from 'bcryptjs'
const moment = require('moment');

export const getAllThuCung = () => new Promise(async (resolve, reject) => {
    try {
        const pets = await db.Pet.findAndCountAll();
        resolve({
            err: 0,
            mess: 'Lấy thông tin tất cả thú cưng thành công',
            pets: pets ? pets : ''
        });
    } catch (errol) {
        reject(errol);

    }
})

export const getThuCung = ({ idThuCung }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Pet.findByPk(idThuCung)
        resolve({
            err: 0,
            mess: 'Lấy thông tin thú cưng thành công',
            pet: response ? response : ' '
        })
    } catch (e) {
        reject(e)
    }
})

export const getNew = ({ idNew }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.New.findByPk(idNew)

        resolve({
            err: 0,
            mess: 'Lấy thông tin tin tức thành công',
            New: response ? response : 'Không tồn tại tin tức này'
        })
    } catch (e) {
        reject(e)
    }
})

export const getIdDanhmuc = ({ idDanhMuc }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Category.findByPk(idDanhMuc)
        resolve({
            err: 0,
            mess: "Lấy thông tin danh mục thành công",
            category: response ? response : "Không tồn tại id danh mục này"
        })
    } catch (e) {
        reject(e)
    }
})
export const getAllDanhMuc = () => new Promise(async (resolve, reject) => {
    try {
        const categorys = await db.Category.findAll();
        resolve({
            err: 0,
            mess: 'Lấy thông tin tất cả danh mục thành công',
            categorys: categorys ? categorys : ''
        })
    } catch (errol) {
        reject(errol);
    }
})

export const getDanhMuc = () => new Promise(async (resolve, reject) => {
    try {
        const categorys = await db.Category.findAndCountAll({
            where: {
            },
            limit: 3
        });
        resolve({
            err: 0,
            mess: 'Lấy danh mục thành công',
            category: categorys ? categorys : ''
        })
    } catch (e) {
        reject(e)
    }
})

export const getOrderSatus = (idUser, status) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Order.findAndCountAll({
            where: {
                id_user: `${idUser}`,
                status: `${status}`
            }
        });
        resolve({
            err: 0,
            mess: "Lấy thông tin đơn hàng thành công",
            Order: response ? response : ' '
        })
    } catch (e) {
        reject(e)
    }
})

export const getCart = (idUser) => new Promise(async (resolve, reject) => {
    try {
        const isChecked = await db.User.findByPk(idUser)
        if (isChecked) {
            const response = await db.Cart.findAndCountAll({
                where: {
                    idUser: `${idUser}`,
                    status: 'Chưa thanh toán'
                },
                include: [{
                    model: db.Pet
                }]
            });
            const price_pets = response?.rows?.map(item => item?.dataValues?.total_Product)
            const total_products = price_pets?.reduce((total_producs, item_producs) => total_producs + item_producs)
            resolve({
                err: 0,
                mess: 'Lấy thông tin giỏ hàng thành công',
                Cart: response ? response : "Không lấy được giỏ hàng",
                Total_products: total_products ? total_products : "Có sản phẩm đang không có giá trong giỏ hàng"
            })
        }
        else {
            resolve({
                err: -1,
                mess: "Không tồn tại người dùng"
            })
        }

    } catch (e) {
        reject(e)
    }
})
export const getAllBill = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Bill.findAndCountAll({
            where: {

            },
            include: [{
                model: db.Pet,
                attributes: ['name']
            }],
        });
        resolve({
            err: 0,
            mess: 'Lấy thông tin tất cả các hóa đơn thành công',
            Bills: response ? response : ''
        })
    } catch (error) {
        reject(error)
    }
})

export const getAllNews = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.New.findAll();
        resolve({
            err: 0,
            mess: 'Lấy thông tin tất cả các tin tức thành công',
            News: response ? response : ''
        })
    } catch (e) {
        reject(e)
    }
})

export const getAllOrder = (status) => new Promise(async (resolve, reject) => {

    try {
        if (!status) {

            const response = await db.Order.findAndCountAll({
                include: [{
                    model: db.User,
                    attributes: ['name', 'email', 'gioiTinh', 'namSinh', 'sdt', 'diaChi', 'avatar']
                }]
            }
            )
            resolve({
                err: 0,
                mess: 'Lấy thông tin tất cả các đơn hàng thành công',
                Orders: response ? response : ''
            })
        }
        else {
            const response = await db.Order.findAndCountAll({
                where: {
                    status: `${status}`
                },
                include: [{
                    model: db.User,
                    attributes: ['name', 'email', 'gioiTinh', 'namSinh', 'sdt', 'diaChi', 'avatar']
                }]
            }
            )
            resolve({
                err: 0,
                mess: 'Lấy thông tin tất cả các đơn hàng thành công',
                Orders: response ? response : ''
            })
        }
    } catch (e) {
        reject(e)
    }
})


export const themThuCung = ({ name, price, describe, species, id_category, avatar }) => new Promise(async (resolve, reject) => {
    try {

        const isChecked = await db.Category.findByPk(id_category)
        if (isChecked) {
            const response = await db.Pet.findOrCreate({
                where: { name, price, describe, species, id_category },
                defaults: {
                    name,
                    price,
                    describe,
                    species,
                    id_category,
                    avatar
                }
            })
            resolve({
                err: response[1] ? 0 : 1,
                mess: response[1] ? "Thêm thú cưng thành công" : "Thú cưng đã tồn tại"
            })
        }
        else {
            resolve({
                err: -1,
                mess: 'Danh mục sản phẩm này không tồn tại'
            })
        }

    } catch (e) {
        reject(e);
    }
})


export const insertCart = ({ idUser, idPet, quantity }) => new Promise(async (resolve, reject) => {
    try {
        const isChecked = await db.Pet.findByPk(idPet)
        const pricePet = isChecked?.dataValues?.price
        const isCheckedUser = await db.User.findByPk(idUser)
        if (isChecked && isCheckedUser) {
            const response = await db.Cart.findOrCreate({
                where: {
                    idPet: `${idPet}`,
                    status: 'Chưa thanh toán',
                    idUser: `${idUser}`
                },
                defaults: {
                    idUser,
                    idPet,
                    quantity: quantity ? quantity : 1,
                    status: 'Chưa thanh toán',
                    total_Product: pricePet
                }
            })
            resolve({
                err: response[1] ? 0 : 1,
                mess: response[1] ? "Thêm vào giỏ hàng thành công" : "Sản phẩm đã có trong giỏ hàng"
            })
        }
        else {
            resolve({
                err: 0,
                mess: "Không có thông tin thú cưng này "
            })
        }
    }
    catch (e) {
        reject(e)
    }
})


export const updateCart = ({ idCart, quantity, status }) => new Promise(async (resolve, reject) => {
    try {
        const dataCart = await db.Cart.findByPk(idCart)
        const quantityCart = dataCart?.dataValues?.quantity
        const totalProduct = dataCart?.dataValues?.total_Product
        const totalProducs = quantityCart * totalProduct


        const response = await db.Cart.update(
            {
                quantity,
                total_Product: totalProducs
            },
            {
                where: {
                    id: idCart
                }
            }
        );
        resolve({
            err: 0,
            mess: response ? "Cập nhật thông tin giỏ hàng thành công" : "Không tìm thấy sản phẩm này"
        })
    } catch (e) {
        reject(e)
    }
})
export const suaThuCung = ({ idThuCung, name, price, describe, species, id_category, avatar, quantity }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Pet.update(
            {
                avatar,
                name,
                price,
                describe,
                species,
                id_category,
                quantity
            },
            {
                where: { id: idThuCung },
            }
        );

        resolve({
            err: response ? 0 : 1,
            mess: response ? "Sửa thông tin thú cưng thành công" : " "

        })
    } catch (e) {
        reject(e);
    }
})

export const suaDanhMuc = ({ idDanhMuc, name }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Category.update(
            {
                name
            },
            {

                where: { id: idDanhMuc },
            }
        );
        resolve({
            err: response[0] ? 0 : 1,
            mess: response[0] ? "Sửa thành công danh mục" : "Danh mục không tồn tại"
        })

    } catch (e) {
        reject(e);
    }
})

export const xoaThuCung = ({ idThuCung }) => new Promise(async (resolve, reject) => {

    try {
        const response = await db.Pet.destroy({
            where: {
                id: idThuCung
            }
        })
        resolve({
            err: response ? 0 : 1,
            mess: response ? "Xóa thành công thú cưng" : "Thú cưng không tồn tại"

        })
    } catch (e) {
        reject(e);
    }
})
export const xoaUser = ( {idUser} ) => new Promise(async (resolve, reject) => {
console.log(idUser?.idUser)
    try {
        const response = await db.User.destroy({
            where: {
                id: idUser
            }
        })
        resolve({
            err: response ? 0 : 1,
            mess: response ? "Xóa thành công người dùng" : "Người dùng không tồn tại"

        })
    } catch (e) {
        reject(e);
    }
})
export const themDanhMuc = ({ name }) => new Promise(async (resolve, reject) => {
    try {

        const response = await db.Category.findOrCreate({
            where: { name },
            defaults: {
                name,
            }
        })

        resolve({
            err: response[1] ? 0 : 1,
            mess: response[1] ? "Thêm thành công danh mục" : "Danh mục đã tồn tại"
        })
    } catch (e) {
        reject(e)
    }
})

export const themNews = ({ title, describe, author, avatar }) => new Promise(async (resolve, reject) => {
    try {

        const response = await db.New.create({
            title,
            describe,
            author,
            avatar
        }, {
            timestamps: false
        })
        resolve({
            err: response ? 0 : 1,
            mess: response ? "Thêm tin tức thành công" : "Lỗi không thêm được tin tức"
        })

    } catch (e) {
        reject(e)
    }
})

export const updateNews = ({ idNew, title, describe, author }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.New.update({
            title,
            describe,
            author
        },
            {
                where: { id: idNew }
            })
        resolve({
            err: response[0] ? 0 : 1,
            mess: response[0] ? "Sửa tin tức thành công" : "Tin tức này không tồn tại"
        })
    } catch (e) {
        reject(e);
    }
})

export const changeStatusOrder = (idOrder) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Order.update({
            status: 'Đã thanh toán'
        },
            {
                where: { id: idOrder }
            })
        resolve({
            err: response[0] ? 0 : 1,
            mess: response[0] ? "Thanh toán thành công" : "Chuyển trạng thái đơn hàng thất bại"
        })
    } catch (e) {
        reject(e)
    }
})
export const cancelOrder = (idOrder) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Order.update({
            status: 'Đơn hàng đã hủy'
        },
            {
                where: { id: idOrder }
            })
        resolve({
            err: response[0] ? 0 : 1,
            mess: response[0] ? "Đơn hàng đã được hủy" : "Chuyển trạng thái đơn hàng thất bại"
        })
    } catch (e) {
        reject(e)
    }
})

export const updateOrder = (idOrder, thuCung, tongTien) => new Promise(async (resolve, reject) => {
    try {

        const response = await db.Order.update({
            tongTien,
            thuCung
        },
            {
                where: { id: idOrder }
            })
        resolve({
            err: response ? 0 : 1,
            mess: response ? "Đơn hàng đã được cập nhật thành công" : "Đã xảy ra lỗi cập nhật"
        })
    } catch (e) {
        reject(e)
    }
})

export const updateBill = (idBill, status) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Bill.update({
            status
        },
            {
                where: { id: idBill }
            })
        resolve({
            err: response[0] ? 0 : 1,
            mess: response[0] ? "Sửa thông tin hóa đơn thành công" : "Không tìm thấy id này "
        })
    } catch (e) {
        reject(e)
    }
})
export const deleteNews = ({ idNew }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.New.destroy({
            where: { id: idNew }
        })
        resolve({
            err: response ? 0 : 1,
            mess: response ? "Xóa tin tức thành công" : "Tin tức này không tồn tại"
        })
    } catch (e) {
        reject(e);
    }
})
export const xoaDanhMuc = ({ idDanhMuc }) => new Promise(async (resolve, reject) => {
    try {

        const response = await db.Category.destroy({
            where: {
                id: idDanhMuc
            }
        })
        resolve({
            err: response ? 0 : 1,
            mess: response ? "Xóa thành công danh mục" : "Danh mục không tồn tại"
        })
    } catch (e) {
        reject(e)
    }
})

export const deleteOrder = ({ idOrder }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Order.destroy({
            where: { id: idOrder }
        })
        resolve({
            err: response ? 0 : 1,
            mess: response ? "Xóa đơn hàng" : "Tin tức này không tồn tại"
        })
    } catch (e) {
        reject(e);
    }
})

export const deleteCart = (idCart) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Cart.destroy({
            where: { id: idCart }
        })
        resolve({
            err: response ? 0 : 1,
            mess: response ? " Xóa sản phẩm ra giỏ hàng thành công" : "Sản phẩm này không tồn tại trong giỏ"
        })
    } catch (e) {
        reject(e)
    }
})
export const cleartCart = (idUser) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Cart.destroy({
            where: { idUser: idUser }
        })
        resolve({
            err: response ? 0 : 1,
            mess: response ? " Xóa sản phẩm ra giỏ hàng thành công" : "Sản phẩm này không tồn tại trong giỏ"
        })
    } catch (e) {
        reject(e)
    }
})
export const choThanhToanCart = ({ idCart }) => new Promise(async (resolve, reject) => {
    try {
        for (const id of idCart) {
            const isChecked = await db.Cart.findByPk(id)
            if (isChecked) {
                const response = await db.Cart.update({
                    status: 'Chờ thanh toán'
                },
                    {
                        where: { id: id }
                    })
                resolve({
                    err: response ? 0 : 1,
                    mess: response ? "Thay đổi trạng thái sang chờ thanh toán" : "Sản phẩm này không tồn tại trong giỏ hàng"
                })
            }
            else {
                resolve({
                    err: -1,
                    mess: 'Không tìm thấy id của giỏ hàng này'
                })
            }
        }


    } catch (e) {
        reject(e)
    }
})
export const getCategoryThuCung = (idDanhMuc) => new Promise(async (resolve, reject) => {
    try {
        const isChecked = await db.Category.findByPk(idDanhMuc)
        if (isChecked) {
            const response = await db.Pet.findAndCountAll({
                where: {
                    id_category: idDanhMuc

                }
            })

            resolve({
                err: 0,
                mess: 'Lấy thông tin thú cưng thành công',
                response: response ? response : ''
            });
        }
        else {
            resolve({
                err: 0,
                mess: 'Không tìm thấy danh mục này '
            })
        }
    } catch (e) {
        reject(e)
    }
})

export const getSearchBill = ({ idNhanVien, idThuCung, soLuong, donGia, status, createdAt }) => new Promise(async (resolve, reject) => {
    try {

        const response = await db.findAndCountAll({
            where: {
                idThuCung: { [Op.like]: `${idThuCung}` },
                idNhanVien: { [Op.like]: `${idNhanVien}` },
                soLuong: { [Op.like]: `${soLuong}` },
                donGia: { [Op.like]: `${donGia}` },
                status: { [Op.like]: `${status}` },
            }
        })
        resolve({
            err: 0,
            mess: 'Lấy thông tin hóa đơn thành công',
            Bills: response ? response : ''
        })
    } catch (e) {
        reject(e)
    }
})
export const insertOrder = (id_user, thuCung, status) => new Promise(async (resolve, reject) => {
    try {
        console.log("djád"+status)
        let isStatus = status ? status : "Chưa thanh toán"
        const check_IDUser = await db.User.findByPk(id_user)

        const price_pets = thuCung?.map(item => item?.total_Product)

        const Pet = thuCung?.map(item => item.Pet)
        const quantity_Pet = thuCung?.map(item => item.Pet?.quantity)
        const top_quantity = thuCung?.map(item => item.Pet?.top_quantity)
        const quantity_Pet_Oder = thuCung?.map(item => item?.quantity)
        const idPet = thuCung?.map(item => item.idPet)
        const invalidOrder = quantity_Pet.some((quantity, index) => quantity < quantity_Pet_Oder[index]);


        if (invalidOrder) {
            // If any quantity is less, reject with an error message
            resolve({
                err: 1,
                mess: "Số lượng đặt hàng vượt quá số lượng có sẵn"
            });
            return;
        }
        idPet.forEach(async (element, index) => {
            const newQuantity = quantity_Pet[index];
            const newQuantity_Oder = quantity_Pet_Oder[index];
            const new_Top_quantity = top_quantity[index];
            await db.Pet.update(
                {
                    quantity: newQuantity - newQuantity_Oder,
                    top_quantity: new_Top_quantity + newQuantity_Oder
                },
                {
                    where: { id: element },
                }
            );
        });

        const total_products = price_pets?.reduce((total_producs, item_producs) => total_producs + item_producs)

        if (check_IDUser) {
            console.log("isStatus", isStatus,)
            const response = await db.Order.create({
                id_user,
                thuCung,
                tongTien: total_products,
                status: isStatus == "Đã thanh toán" ? isStatus : 'Chưa thanh toán'
            })
            resolve({
                err: response ? 0 : 1,
                mess: response ? "Tạo đơn hàng thành công" : "Tạo đơn hàng thất bại",
            })
        }
        else {
            resolve({
                err: -1,
                mess: "Không tồn tại id này"
            })
        }

    } catch (e) {
        reject(e)
    }
})
export const insertBill = (id_user, id_ThuCung, soLuong, tongTien, status) => new Promise(async (resolve, reject) => {
    try {

        const check_IdPet = await db.Pet.findByPk(id_ThuCung);
        const check_IDUser = await db.User.findByPk(id_user)
        if (check_IDUser && check_IdPet) {
            const response = await db.Bill.create({
                id_user,
                id_ThuCung,
                soLuong,
                tongTien,
                status
            }, {
                timestamps: true,
            })

            resolve({
                err: response ? 0 : 1,
                mess: response ? "Tạo hóa đơn thành công" : "Tạo hóa đơn thất bại"
            })
        }
        else {
            resolve({
                err: -1,
                mess: "Không tồn tại id này"
            })
        }

    } catch (e) {
        reject(e)
    }
})


export const getTop10 = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Pet.findAndCountAll({
            // attributes: ['name' ,'top_quantity'],
            where: {
                // Your filtering conditions here, if any
            },
            order: [
                ['top_quantity', 'DESC'] // Sort by 'columnName' in descending order
            ],
            limit: 10,
        })
        resolve({
            err: 0,
            mess: 'Lấy thông tin thú cưng thành công',
            pet: response ? response : ' '
        })
    } catch (e) {
        reject(e)
    }
})


export const createPayment = ({ amount, language, bankCode, ipAddr }) => new Promise(async (resolve, reject) => {
    try {
        console.log(bankCode)
        process.env.TZ = 'Asia/Ho_Chi_Minh';
        let date = new Date();
        let createDate = moment(date).format('YYYYMMDDHHmmss');
        let tmnCode = process.env.vnp_TmnCode;
        let secretKey = process.env.vnp_HashSecret;
        let vnpUrl = process.env.vnp_Url;
        let returnUrl = process.env.vnp_ReturnUrl;
        let orderId = moment(date).format('DDHHmmss');
        if (language === null || language === '') {
            language = 'vn';
        }

        if (amount === null || amount === '') {
            amount = 10000;
        }
        let currCode = 'VND';
        let vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = tmnCode;
        vnp_Params['vnp_Locale'] = 'vn';
        vnp_Params['vnp_CurrCode'] = currCode;
        vnp_Params['vnp_TxnRef'] = orderId;
        vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
        vnp_Params['vnp_OrderType'] = 'other';
        vnp_Params['vnp_Amount'] = amount * 100;
        vnp_Params['vnp_ReturnUrl'] = returnUrl;
        vnp_Params['vnp_IpAddr'] = ipAddr;
        vnp_Params['vnp_CreateDate'] = createDate;
        if (bankCode !== null && bankCode !== '') {
            vnp_Params['vnp_BankCode'] = bankCode;
        }


        vnp_Params = sortObject(vnp_Params);
        let querystring = require('qs');
        let signData = querystring.stringify(vnp_Params, { encode: false });
        let crypto = require("crypto");
        let hmac = crypto.createHmac("sha512", secretKey);
        let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

        // Trả về thông tin lịch khám
        resolve({
            err: 0,
            mess: vnpUrl ? 'Tạo đơn hàng thành công' : '',
            vnpUrl
        });
    } catch (error) {
        reject(error);
    }
});
export const returnPayment = ({ vnp_Params }) => new Promise(async (resolve, reject) => {
    try {
        let secureHash = vnp_Params['vnp_SecureHash'];

        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];

        vnp_Params = sortObject(vnp_Params);
        let tmnCode = process.env.vnp_TmnCode;
        let secretKey = process.env.vnp_HashSecret;

        let querystring = require('qs');
        let signData = querystring.stringify(vnp_Params, { encode: false });
        let crypto = require("crypto");
        let hmac = crypto.createHmac("sha512", secretKey);
        let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");

        if (secureHash === signed) {
            //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
            resolve({
                err: 0,
                code: vnp_Params['vnp_ResponseCode']
            });
        } else {
            vnp_Params['vnp_ResponseCode']

        }
        // Trả về thông tin lịch khám
        resolve({
            err: 0,
            code: vnp_Params['vnp_ResponseCode']
        });

    } catch (error) {
        reject(error);
    }
});
function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}