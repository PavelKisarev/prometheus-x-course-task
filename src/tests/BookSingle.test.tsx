import { render, fireEvent } from "@testing-library/react"
import BookSingle from "../components/bookSingle/BookSingle"
import { IBook } from "../api/booksApi"

describe("Test Book Single Component" , () => {

    let bookInCatalogue:IBook = {
        id:1,
        title:"Testing Book",
        author:"Pasha",
        description:"",
        amount:1,
        image:"",
        level:"beginner",
        price:10,
        shortDescription:"",
        tags:[]
    }

    test("Amount input shoud be rendered" , () => {
        const {getByTestId} = render(<BookSingle book={bookInCatalogue} />)

        let amountInput = getByTestId("amount-test-input")

        expect(amountInput).toBeInTheDocument()
    })

    test("Amount of books must be increased to 5" , () => {
        const {getByLabelText} = render(<BookSingle book={bookInCatalogue} />)

        let amountInput = getByLabelText("Amount", {selector: 'input'}) as HTMLInputElement
        fireEvent.change(amountInput, {target : { value: '5' }})
        
        expect(amountInput.value).toBe('5')
    })

    test("Amount of books must be increased to 5 and then decreassed to 2" , () => {
        const {getByLabelText} = render(<BookSingle book={bookInCatalogue} />)

        let amountInput = getByLabelText("Amount", {selector: 'input'}) as HTMLInputElement
        fireEvent.change(amountInput, {target : { value: '5' }})
        fireEvent.change(amountInput, {target : { value: '2' }})
        
        expect(amountInput.value).toBe('2')
    })

    test("Total Price must be changed if amount of books changes" , () => {
        const {getByTestId,getByLabelText} = render(<BookSingle book={bookInCatalogue} />)

        let totalPriceNode = getByTestId("total-price")
        let priceNode = getByTestId("price")
        let amountInput = getByLabelText("Amount", {selector: 'input'}) as HTMLInputElement
        fireEvent.change(amountInput, {target : { value: '5' }})
        let result = (Number(priceNode.textContent) * Number(amountInput.value)).toString()
        expect(totalPriceNode.textContent).toBe(result)
    })

})