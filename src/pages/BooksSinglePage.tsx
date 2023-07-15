import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/UI/button/Button";
import { useContext, useEffect, useState } from "react";
import { IBook } from "../api/booksApi";
import BookSingle from "../components/bookSingle/BookSingle";
import { BooksContext } from "../context/BookContext";

const BooksSinglePage = () => {
    const navigate = useNavigate()
    const goBack = () => navigate(-1)
    let {books} = useContext(BooksContext)

    let [book, setBook] = useState<IBook>()

    let {id : bookId} = useParams()
    let currentBookId: number = bookId ? +bookId : 0

    useEffect(()=>{
        getCurrentBookById(currentBookId);
    },[books])

    const getCurrentBookById = async (id: number) => {
        let existingBookIndex = books.findIndex(it => it.id === id)
        existingBookIndex !== -1 ? setBook(books[existingBookIndex]) : setBook(undefined)
    }

    return <>
        <div className="d-flex justify-content-between alignh-items-center">
            <Button appearence="link" title="Back" onClick={goBack} />
        </div>
        {book ? <BookSingle book={book} /> : <div className="not-found-alert-block">No items found</div>}
    </>
}

export default BooksSinglePage