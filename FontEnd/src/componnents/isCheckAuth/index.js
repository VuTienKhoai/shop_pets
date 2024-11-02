// auth.js
import { jwtDecode } from 'jwt-decode';
import { getUser } from '../Api';


export const setAccessToken = (token) => {
    localStorage.setItem('access_token', token);
};

export const getAccessToken = () => {
    return localStorage.getItem('access_token');
};

export const decodeAccessToken = () => {
    const token = getAccessToken();
    if (token) {
        return jwtDecode(token);
    }
    return null;
};

export const isAuthenticated = () => {
    const token = getAccessToken();
    return !!token;
};
export const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('idUser');
};
export const fetchDataUser = async (idUser) => {
    try {
        const response = await getUser(idUser);
        const inforUsers = response.User;
        return inforUsers
    } catch (error) {
        console.log('Lỗi server :' + error)
    }
};