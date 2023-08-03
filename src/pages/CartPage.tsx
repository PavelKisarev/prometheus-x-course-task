import Button from "../components/UI/button/Button"
import { useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import GlobalSpinner from "../components/UI/globalSpinner/GlonalSpinner"
import { sleep } from "../helpers/asyncHelpers"
import Cart from "../components/cart/Cart"
import { BooksContext } from "../context/BookContext"

const CartPage = () => {
    const navigate = useNavigate()
    const goBack = () => navigate(-1)
    const goBookCatalogue = () => navigate("/books")
    const {booksInCart, updateBooksInCart} = useContext(BooksContext)

    let [isLoading, setIsLoading] = useState(false)

    const checkIsDisabledPurchaseButton = () => booksInCart.length ? false : true

    const purchaseCartItems = async () => {
        setIsLoading(true)
        await sleep(500)
        updateBooksInCart(null)
        setIsLoading(false)
    }
    
    return <>
        <div className="d-flex justify-content-between alignh-items-center">
            <Button appearence="link" title="Back" onClick={goBack} />
            <div className="d-flex gap">
                {!checkIsDisabledPurchaseButton() && <Button appearence="secondary" title="Catalogue" onClick={goBookCatalogue} />}
                <Button appearence="primary" title="Purchase" onClick={purchaseCartItems} disabled={checkIsDisabledPurchaseButton()} />
            </div>
        </div>
        <div className="pY-4x"></div>
        <Cart booksInCart={booksInCart} />
        <GlobalSpinner isShow={isLoading} />
    </>
}

export default CartPage