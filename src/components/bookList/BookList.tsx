import { FC } from "react"
import { IBook } from "../../api/booksApi"
import Button from "../UI/button/Button"
import imgNotFound from "../../images/imageNotFound.png"
import { useNavigate } from "react-router-dom"
import { truncateString } from "../../helpers/stringHelpers"
import "./bookList.css"

const BookList:FC<{books: IBook[]}> = (props) => {
    let {books} = props

    const navigate = useNavigate();

    const goToCurrentBook = (id: number) => {
        navigate(`/books/${id}`)
    }

    const renderBooks = (books: IBook[]) => {
        return books.map( it => {
            return <div key={it.id} className="book col">
                <div className="book__img-container" onClick={()=>{goToCurrentBook(it.id)}}>
                    {it.image !== "" ? 
                        <img className="img-full book__img" src={it.image} alt="" /> 
                        : 
                        <img className="img-full book__img img-not-found" src={imgNotFound} alt="" />
                    }
                </div>
                <p className="book__title">{truncateString(it.title)}</p>
                <p className="book__author">{it.author}</p>
                <div className="d-flex justify-content-between align-items-center pt-8x">
                    <p className="book__price">Price: {it.price}</p>
                    <Button appearence="primary" title="View" onClick={()=>{goToCurrentBook(it.id)}} />
                </div>
            </div>
        })
    }

    return (
        <>
        {   
            books.length !== 0 ? <div className="d-flex flex-wrap col-3">
                {renderBooks(books)}
            </div> : <div className="not-found-alert-block">No matching items found</div>
        }
        </>
    )
}

export default BookList