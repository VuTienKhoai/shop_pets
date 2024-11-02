// DataContext.js
import { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [isIdCategory, setIsIdCategory] = useState('shop-all');


    const [cartItems, setCartItems] = useState([]);
    const [inforUser, setInforUser] = useState([]);
    const [selectedItem, setSelectedItem] = useState([]);

    const updateCartItems = (newCartItems) => {
        setCartItems(newCartItems);
    };

    return (
        <DataContext.Provider value={{
            isIdCategory,
            setIsIdCategory,
            cartItems,
            setCartItems,
            updateCartItems,
            inforUser,
            setInforUser,
            selectedItem,
            setSelectedItem
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
