import { createContext, useEffect, useState } from "react";
import { IBook, IBookInCart, getBooks } from "../api/booksApi";

interface IBookContext {
    books: IBook[],
    booksInCart: IBookInCart[],
    updateBooksInCart : (book: IBookInCart | null) => void,
    removeBookFromCart : (id: number) => void,
}

const defaultValue: IBookContext = {
    books: [],
    booksInCart: [],
    updateBooksInCart: (book: IBookInCart | null) => {},
    removeBookFromCart : () => {},
}

export const BooksContext = createContext<IBookContext>(defaultValue);

export const BooksProvider = ({children} : any) => {

    let [books, setBooks] = useState<IBook[]>([]);
    let [booksInCart, setBooksInCart] = useState<IBookInCart[]>([])

    useEffect(() => {
        async function fn(){
            await Promise.all([updateBookList()])
        }
        fn()
    },[])

    const updateBookList = async () => {
        let result = await getBooks();
        if(result){
            setBooks(result.books)
        }
    }

    const updateBooksInCart = (book:IBookInCart | null) => {
        if(book !== null){
            let existingBookIndex = booksInCart.findIndex( it => it.id === book.id)

            if(existingBookIndex !== -1) {
                let copyBookList = [...booksInCart]
                copyBookList[existingBookIndex] = {
                    ...copyBookList[existingBookIndex],
                    amount: book.amount,
                    totalPrice: book.totalPrice
                }

                setBooksInCart(copyBookList)
            } else {
                setBooksInCart([...booksInCart, book]);
            }

        } else {
            setBooksInCart([])
        }
    }

    const removeBookFromCart = (id: number) => {
        setBooksInCart(booksInCart.filter(it => it.id !== id))
    }

    return <BooksContext.Provider value={
            {
                books: books,
                booksInCart: booksInCart,
                updateBooksInCart: updateBooksInCart,
                removeBookFromCart: removeBookFromCart,
            }
        }>
        {children}
    </BooksContext.Provider>
}