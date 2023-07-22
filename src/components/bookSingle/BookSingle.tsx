import { FC, useContext, useEffect, useState } from "react"
import { IBook, IBookInCart } from "../../api/booksApi"
import imgNotFound from "../../images/imageNotFound.png"
import Button from "../UI/button/Button"
import "./bookSingle.css"
import FormInput from "../UI/formInput/FormInput"
import { BooksContext } from "../../context/BookContext"
import { sleep } from "../../helpers/asyncHelpers"
import GlobalSpinner from "../UI/globalSpinner/GlonalSpinner"

const BookSingle:FC<{book:IBook}> = (props) => {
    let { id,
        title,
        author,
        description,
        image,
        level,
        price,
        shortDescription,
        tags
    } = props.book

    let [booksAmount, setBooksAmount] = useState(1);
    let [isLoading, setIsLoading] = useState(false);
    const {booksInCart, updateBooksInCart} = useContext(BooksContext);

    useEffect(()=>{
        let existingBookIndex = booksInCart.findIndex( it => it.id === id)
        if(existingBookIndex !== -1) setBooksAmount(booksInCart[existingBookIndex].amount)
    },[])

    const onBookAmountChangeHandler = (e: any) => {
        // let value = +e.target.value
        const value = parseInt(e.target.value) || 0;
        if(value === 0) {
            setBooksAmount(0)
        } else {
            if(value <= 42 && value >= 1) {
                setBooksAmount(value)
            } else {
                setBooksAmount(1)
            }
        }
    }

    const onBookAmountBlurHandler = (e: any) => {
        const value = parseInt(e.target.value) || 0;
        if(value === 0) {
            setBooksAmount(1)
        }
    }

    const addBookToCart = async () => {
        let book: IBookInCart = {
            id: id,
            title: title,
            amount: booksAmount,
            pricePerBook: price,
            totalPrice: getTotalPrice(booksAmount, price)
        }

        setIsLoading(true)
        await sleep(800)
        updateBooksInCart(book)
        setIsLoading(false)
    }

    const getTotalPrice = (amount: number, price: number) => +(amount * price).toFixed(2)

    const renderTags = (tags: string[]) => tags.map( (it,i) => <span key={i} className="book__tag"><span>{it}</span></span>)

    return <>
        <div className="book-single pt-8x">
            <div className="book-single__left-block">
                {image !== "" ? 
                    <img className="img-full" src={image} alt="" /> 
                    : 
                    <img className="img-full" src={imgNotFound} alt="" />
                }
                <p>{description}</p>
            </div>

            <div className="book-single__center-block">
                <h2>{title}</h2>
                <p>{shortDescription}</p>
                <p>Author: {author}</p>
                <p>Level: {level}</p>
                <div className="book__tags">
                    {renderTags(tags)}
                </div>
            </div>

            <div className="book-single__right-block">
                <div className="d-flex justify-content-between">
                    <p>Price $</p>
                    <p data-testid="price">{price}</p>
                </div>
                <div className="d-flex justify-content-between align-items-center gap-8x">
                    <FormInput 
                        style={{textAlign:"right"}}
                        label="Amount" 
                        type="number" 
                        id="book-amount" 
                        value={booksAmount || ""} 
                        onChange={onBookAmountChangeHandler} 
                        onBlur={onBookAmountBlurHandler}
                        data-testid="amount-test-input"
                    />
                </div>
                <div className="d-flex justify-content-between">
                    <p>Total Price $</p>
                    <p data-testid="total-price">{getTotalPrice(booksAmount, price)}</p>
                </div>
                <div className="d-flex justify-content-end">
                    <Button appearence="primary" title="Add to cart" onClick={addBookToCart} />
                </div>
            </div>
        </div>
        <GlobalSpinner isShow={isLoading} />
    </>
}

export default BookSingle