import { useContext, useState } from "react"
import { IBook  } from "../api/booksApi"
import BookList from "../components/bookList/BookList";
import FormInput from "../components/UI/formInput/FormInput";
import { BooksContext } from "../context/BookContext";


const BooksListPage = () => {

    let {books} = useContext(BooksContext)

    let [searchString, setSearchString] = useState("");
    let [selectedPrice, setSelectedPrice] = useState("");

    const searchStringHandler = (e:any) => {
        setSearchString(e.target.value)
    }

    const onPriceFilterChangeHandler = (e: any) => {
        setSelectedPrice(e.target.value);
    }

    const filterByPrice = (books: IBook[],selectedPriceValue: string) => {
        switch(selectedPriceValue){
            case "1" : return books
            case "2" : return books.filter( it => it.price < 15)
            case "3" : return books.filter( it => it.price >= 15 && it.price <= 30)
            case "4" : return books.filter( it => it.price > 30)
            default: return books
        }
    }

    const filterBySearch = (books: IBook[],searchString: string) => {
        return books.filter( it => it.title.toLowerCase().trim().includes(searchString))
    }

    const getBooksForDisplay = (searchString: string, selectedValuePrice: string) => {
        let result = filterByPrice(books,selectedValuePrice);
        result = filterBySearch(result,searchString)
        return result
    }

    return <>
        <h1>Books</h1>
        <div className="d-flex flex-wrap col-3 pt-8x">
            <div className="col">
                <FormInput type="search" id="book-search" placeholder="Search by book name" value={searchString} onChange={searchStringHandler} />
            </div>
            <div className="col">
                <select name="" id="" className="form-input-base" onChange={onPriceFilterChangeHandler}>
                    <option value="" hidden>Price</option>
                    <option value="1">All</option>
                    <option value="2">0 - 15</option>
                    <option value="3">15 - 30</option>
                    <option value="4">More 30</option>
                </select>
            </div>
        </div>
        <BookList books={getBooksForDisplay(searchString,selectedPrice)} />
    </>
}

export default BooksListPage