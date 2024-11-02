import db from '../models'
import Sequelize from 'sequelize'
import jwt from 'jsonwebtoken'
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs'
const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(9))
export const dangKi = ({ name, email, password, gioiTinh, sdt, diaChi, namSinh, role_id, avatar }) => new Promise(async (resolve, reject) => {
    try {
        
        const response = await db.User.findOrCreate({
            where: { email },
            defaults: {
                name,
                email,
                password: hashPassword(password),
                gioiTinh,
                namSinh,
                sdt,
                diaChi,
                role_id,
                avatar 
            }
        })
        const token = response[1] ? jwt.sign({
            id: response[0].id,
            email: response[0].email,
            role_id: response[0].role_id,
        }, process.env.JWT_SECRET,
            {
                expiresIn: '90d'
            })
            : null

        resolve({
            err: response[1] ? 0 : 1,
            mess: response[1] ? 'Đăng kí thành công' : 'Tài khoản đã tồn tại',
            'access_token': token ? token : token
        })
    }
    catch (e) {
        reject(e)
    }
})
export const dangNhap = ({ email, password }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOne({
            where: { email },
            raw: true,
        })

        const isChecked = response && bcrypt.compareSync(password, response.password)

        const token = isChecked ? jwt.sign({
            id: response.id,
            email: response.email,
            role_id: response.role_id,
        }, process.env.JWT_SECRET,
            {
                expiresIn: '90d'
            })
            : null
        resolve({
            err: token ? 0 : 1,
            mess: token ? 'Đăng nhập thành công' : response ? 'Mật khẩu sai' : 'Tài khoản chưa được đăng kí',
            'access_token': token ? `${token}` : token
        })
    }
    catch (e) {
        reject(e)
    }
})

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'quocthangforwork@gmail.com',
        pass: 'oauuhkqpbqrnaqgy',
    },
});
export const forgotPassword = async (email) => {
    const token = crypto.randomBytes(20).toString('hex')// tạo ra một token ngẫu nhiên và biến thành chuỗi hexadecimal
    const user = await db.User.findOne({ where: { email: email } })

    let errorMessage = null;
    if (user) {

        user.resetToken = token;
        user.resetTokenExpiry = Date.now() + 90000000
        await user.save();
        const resetLink = process.env.URL_SERVER + `/api/v1/users/reset-password/${token}`;
        const mailOptions = {
            from: 'shopThuCung@gmail.com',
            to: email,
            subject: 'Đặt lại mật khẩu',
            html: `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn. Link này sẽ hết hạn sau 15 phút kể từ bây giờ. ${resetLink}`
        }
        await transporter.sendMail(mailOptions)
    }
    else {
        throw errorMessage = 'Người dùng không tồn tại'
    }
    return errorMessage
}
export const resetPassword = async (token, newPassword) => {

    const user = await db.User.findOne({
        where: {
            resetToken: token,
        },
    });

    if (user) {
        const saltRounds = 10; // Số lượng vòng lặp hash
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
        user.password = hashedPassword;
        user.resetToken = null;
        user.resetTokenExpiry = null;
        await user.save();
    } else {
        throw new Error('Token không hợp lệ hoặc đã hết hạn.');
    }
};
export const getAllUser = () => new Promise(async (resolve, reject) => {
    try {
        const Users = await db.User.findAndCountAll();
        resolve({
            err: 0,
            mess: "Lấy thông tin tất cả người dùng thành công",
            users: Users ? Users : ''
        })
        const categorys = await db.Category.findAll();
        resolve({
            err: 0,
            mess: 'Lấy thông tin tất cả danh mục thành công',
            categorys: categorys ? categorys : ''
        })
    } catch (e) {
        reject(e)
    }
})


export const getUser = ({ idUser }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findByPk(idUser);
        resolve({
            err: 0,
            mess: 'Lấy thông tin người dùng thành công',
            User: response ? response : 'Không có thông tin người dùng'
        })
    } catch (e) {
        reject(e)
    }
})

export const getOrder = ({ idUser }) => new Promise(async (resolve, reject) => {
    try {
        let idPet = [];
        const response = await db.Order.findAndCountAll({

            where: {
                id_user: idUser
            }
        })


        const Pet = [];
        const me = await Promise.all(response?.rows.map(async (item) => {
            if (item.dataValues?.thuCung) {
                const pets = await Promise.all(item.dataValues.thuCung.map(async (element) => {
                    const pet = await db.Pet.findByPk(`${element?.idThuCung}`);
                    Pet.push(pet);
                    return pet;
                }));
                console.log(pets)
                return pets;

            }
        }));


        


        resolve({
            err: 0,
            mess: 'Lấy thông tin đơn hàng thành công',
            Order: response?.count == !0 ? response : 'Không có thông tin đơn hàng',
            Pets: response ? me : "Không lấy được thông tin thú cưng"
        })
    } catch (e) {
        reject(e)
    }
})

export const getOrderPK= ({idOrder})=>new Promise(async (resolve,reject)=>{
    try{
        const response =await db.Order.findByPk(`${idOrder}`)
        
        const Pet = [];
        console.log(response)
        const Pets=await Promise.all(response.dataValues.thuCung.map(async (element)=>{
            const pet=await db.Pet.findByPk(`${element?.idThuCung}`);
            Pet.push(pet);
            return pet;
        }))
        // const me = await Promise.all(response?.rows.map(async (item) => {
        //     if (item.dataValues?.thuCung) {
        //         const pets = await Promise.all(item.dataValues.thuCung.map(async (element) => {
        //             const pet = await db.Pet.findByPk(`${element?.idThuCung}`);
        //             Pet.push(pet);
        //             return pet;
        //         }));
                
        //         return pets;

        //     }
        // }));

        resolve ({
            err:0,
            mess:"Lấy thông tin đơn hàng thành công",
            Order:response?response:"Không có thông tin đơn hàng",
            Pets:response ? Pets : "Không lấy được thông tin thú cưng"
        })
    }catch(e){
        reject(e)
    }
})
export const getBill = (idBill) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Bill.findAndCountAll({
            where: {
                idBill: idBill
            },
            include: [{
                model: db.User,
                attributes: ['name', 'email', 'gioiTinh', 'namSinh', 'sdt', 'diaChi', 'avatar']
            }, {
                model: db.Pet,
                attributes: ['name', 'price', 'describe', 'avatar', 'species']
            }],
        });
        resolve({
            err: 0,
            mess: 'Lấy thông tin hóa đơn thành công',
            Bill: response ? response : 'Không có hóa đơn này'
        })
    } catch (e) {
        reject(e)
    }
})
export const getAllCustomer = () => new Promise(async (resolve, reject) => {
    try {

        const response = await db.User.findAndCountAll({
            where: {
                role_id: "R3"
            },
        })
        resolve({
            err: 0,
            mess: 'Lấy thông tin khách hàng thành công',
            Users: response ? response : " "
        })
    } catch (e) {
        reject(e);
    }
})

export const getAllEmployee = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findAndCountAll({
            where: {
                role_id: "R2"
            },

        })
        resolve({
            err: 0,
            mess: "Lấy thông tin nhân viên thành công",
            User: response ? response : " "
        })
    } catch (e) {
        reject(e);
    }
})

export const updateUserController = (idUser, name, sdt, diaChi, gioiTinh, namSinh, image) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.update(
            {
                name,
                sdt,
                diaChi,
                gioiTinh,
                namSinh,
                // image
            },
            {
                where: {
                    id: idUser
                }
            }
        );
        resolve({
            err: 0,
            mess: response ? "Cập nhật thông tin người dùng thành công" : "Không có id người dùng này"
        })
    } catch (e) {
        reject(e);
    }
})
export const updateUser = async ({userId, name, newEmail, newPassword, namSinh, gioiTinh, sdt, diaChi, image }) => {
    try {
        const updateValues = {
            name: name || undefined,
            email: newEmail || undefined,
            password: newPassword ? hashPassword(newPassword) : undefined,
            gioiTinh: gioiTinh || undefined,
            namSinh: namSinh || undefined,
            sdt: sdt || undefined,
            diaChi: diaChi || undefined,
            avatar: image || undefined,
        };

        // Lọc bỏ các giá trị undefined để giữ nguyên giá trị nếu không được cung cấp
        const filteredUpdateValues = Object.fromEntries(Object.entries(updateValues).filter(([key, value]) => value !== undefined));

        const response = await db.User.update(
            filteredUpdateValues,
            {
                where: { id: userId },
            }
        );
console.log(response);
        if (response === 0) {
            return {
                err: 1,
                mess: 'Người dùng không tồn tại',
            };
        }

        return {
            err: 0,
            mess: 'Cập nhật thông tin người dùng thành công',
        };
    } catch (e) {
        throw e;
    }
};