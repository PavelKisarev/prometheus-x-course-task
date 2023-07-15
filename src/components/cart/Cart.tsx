import { FaShoppingCart } from "react-icons/fa"
import { Link } from "react-router-dom"
import { IBookInCart } from "../../api/booksApi"
import { FC } from "react"
import "./cart.css"

const Cart:FC<{booksInCart: IBookInCart[]}> = ({booksInCart}) => {

    const countTotalPriceOfCart = (booksInCart: IBookInCart[]) => {
        return booksInCart.reduce((accumulator, currentValue) => accumulator + currentValue.totalPrice, 0).toFixed(2)
    }

    const renderCartItems = (booksInCart: IBookInCart[]) => {
        return booksInCart.map( it => {
            return <div className="table__row" key={it.id}>
                <div className="table__data">{it.title}</div>
                <div className="table__data">{it.amount}</div>
                <div className="table__data">${it.pricePerBook}</div>
                <div className="table__data text-right">${it.totalPrice}</div>
            </div>
        })
    }
    
    return <>
    {
        booksInCart.length ? <>
            <div className="table table-cart">
                <div className="table__row">
                    <div className="table__data">Book Title</div>
                    <div className="table__data">Count</div>
                    <div className="table__data">Price per Book</div>
                    <div className="table__data text-right">Total price $</div>
                </div>
                {renderCartItems(booksInCart)}
            </div>
            <div className="d-flex justify-content-end pt-8x">
                <p><b>Total price: ${countTotalPriceOfCart(booksInCart)}</b></p>
            </div>
        </>
            :
        <div className="d-flex justify-content-center align-items-center flex-direction-column gap-8x pt-8x">
            <FaShoppingCart size={100} color="#ccc" />
            <p className="text-center">Cart is empty <Link className="link" to={"/books"}>Return to book catalogue</Link></p>
        </div>
    }
    </>
}

export default Cart