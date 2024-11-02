import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import ShopAll from '../../pages/ShopAll';
import Dogs from '../../pages/Dogs';
import Cat from '../../pages/Cat';
import Birds from '../../pages/Birds';
export default function AppRoutes() {
    return (
        <Routes>
            {/* <Route path='/' element={<Home />} /> */}
            <Route path='/shop-all' element={<ShopAll />} />
            <Route path='/dogs' element={<Dogs />} />
            <Route path='/cats' element={<Cat />} />
            <Route path='/birds' element={<Birds />} />
            {/* <Route path='/contacts' element={<Contatc />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Reg />} />
            <Route path='/forgot-password' element={<Forgot_Pass />} /> */}
        </Routes>
    )
}
