import { useLocation, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser } from "react-icons/fa"
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import './header.css';
import Button from '../UI/button/Button';
import IconButton from '../UI/button/IconButton';
import { BooksContext } from '../../context/BookContext';

const Header = () => {
    let userData = useContext(UserContext);
    let {booksInCart, updateBooksInCart} = useContext(BooksContext);
    let navigate = useNavigate();
    let location = useLocation();

    const logOut = () => {
        userData.logOut();
        updateBooksInCart(null)
        navigate("/signin")
    }

    let currentAmountOfBooksInCart = booksInCart.length

    const checkIsDisabledCartButton = () => location.pathname === "/cart" ? true : false

    return (
        <header className="header">
            <div className="container d-flex gap-4x justify-content-between align-items-center">
                <p>JS Band store | Pasha Kisarev</p>

                {userData.user.isLoggedIn && <div className="d-flex align-items-center gap-4x">
                    <IconButton onClick={()=>navigate("/cart")} disabled={checkIsDisabledCartButton()}>
                        <FaShoppingCart size={28} color='#ccc'/>
                        {!!currentAmountOfBooksInCart && <span className="tooltip-info">{currentAmountOfBooksInCart}</span>}
                    </IconButton>

                    <Button 
                        title="Sign Out" 
                        appearence='primary' 
                        size='sm'
                        onClick={logOut} 
                    />

                    <div className="">
                        <FaUser /> <span className='user-name'>{userData.user.name}</span>
                    </div>
                </div>
                }   

            </div>
        </header>
    )
}

export default Header