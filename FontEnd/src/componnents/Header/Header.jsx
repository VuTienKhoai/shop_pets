import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';
import { ReactComponent as Logo } from '../../img/logo.svg';
import { ReactComponent as Search } from '../../img/search_icon.svg';
import { ReactComponent as User } from '../../img/user_icon.svg';
import { ReactComponent as MenuIcon } from '../../img/menu.svg';
import { ReactComponent as CloseIcon } from '../../img/close.svg';
import AppCart from '../AppCart';
import { formatVietnameseToString } from '../Common/formatVietnameseToString';
import { Avatar, Input } from 'antd';

const Header = ({ category, inforUser }) => {
    const { pathname } = useLocation();
    const [search, setSearch] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const menuRef = useRef();

    const isUpdateUserAdmin = pathname.includes('/admin/UpdateUser');
    const isUpdateCategorysAdmin = pathname.includes('/admin/suaDanhMuc');
    const isUpdatePetsAdmin = pathname.includes('/admin/updatePets');
    const isProfileAdmin = pathname.includes('/Admin/ProfileAdmin');
    const isDetailAdmin = pathname.includes('/admin/DetailOrder');

    const onSearch = (values) => {
        navigate(`/search/${values}`);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && search.trim() !== '') {
            onSearch(search.trim().toLowerCase());
            setSearch('');
        }
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                closeMenu();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef]);

    if (pathname === "/admin" || pathname === "/Admin" || isUpdateUserAdmin || isUpdateCategorysAdmin || isUpdatePetsAdmin || isProfileAdmin || isDetailAdmin) {
        return <div className=""></div>;
    }

    return (
        <div className='header'>
            <div className="header_container">
                <div className="sale">
                    FREE SHIPPING - ORDER TODAY
                </div>
                <div className="header_main">
                    <div className="menu_toggle " onClick={toggleMenu}>
                        {menuOpen ? <CloseIcon /> : <MenuIcon />}
                    </div>
                    <div className="header_logo">
                        <div className="header_logo_img">
                            <Link to='/'><Logo /></Link>
                        </div>
                        <Link to='/'>
                            <div className="header_logo_title">
                                <p>Cute Pets</p>
                                <p>A Pet's Favorite Place</p>
                            </div>
                        </Link>
                    </div>
                    <div className="header_info">
                        <div className="header_search">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <div className="search_icon" onClick={toggleMenu}>
                                <Search />
                            </div>
                        </div>
                        <div className="header_call">
                            <p>Call Us</p>
                            <p>123-456-789</p>
                        </div>
                    </div>

                </div>
                
                <div className={`header_menu ${menuOpen ? 'open' : ''}`} ref={menuRef}>
                    <div className="header_car">
                        <div className="header_menu_item">
                            <Link to='/shop-all' onClick={closeMenu}>Shop all</Link>
                        </div>
                        {category?.map((item) => (
                            <div className="header_menu_item" key={item.id}>
                                <Link to={`category/${formatVietnameseToString(item.name)}/${item.id}`} onClick={closeMenu}>
                                    {item.name}
                                </Link>
                            </div>
                        ))}
                        <div className="header_menu_item">
                            <Link to='contacts' onClick={closeMenu}>Contact</Link>
                        </div>
                    </div>
                    <div className="header_log">
                        <div className="header_log_item">
                            {inforUser ? (
                                <div>
                                    <Link to={{ pathname: '/profile', state: { inforUser } }} onClick={closeMenu}>
                                        {inforUser.avatar ? <Avatar src={inforUser.avatar} /> : <User />}  {inforUser.name}
                                    </Link>
                                </div>
                            ) : (
                                <div>
                                    <Link to='/login' onClick={closeMenu}>
                                        <User />  Login
                                    </Link>
                                </div>
                            )}
                        </div>
                        <div className="header_log_item">
                            <AppCart inforUser={inforUser} /> {menuOpen ? 'giỏ hàng' : ''} 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
