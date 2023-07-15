export interface IBook {
    id: number
    author: string
    price: number
    image: string
    title: string
    level: string
    tags: string[]
    amount: number
    shortDescription: string
    description: string
}

export interface IBookInCart {
    id: number,
    title: string,
    amount: number,
    pricePerBook: number,
    totalPrice: number
}

const baseUrl = process.env.REACT_APP_API_URL;

export const getBooks = async ():Promise<{ books: IBook[]} | undefined> => {
    const timestamp = Date.now();
    const url = `${baseUrl}books.json?timestamp=${timestamp}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data
    } catch (error) {
        console.log('Error fetching data:', error);
    }
}

export const getBookById = async (id: number):Promise<IBook | undefined> => {
    const timestamp = Date.now();
    const url = `${baseUrl}books.json?timestamp=${timestamp}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.books.find((it:any) => it.id === id)
    } catch (error) {
        console.log('Error fetching data:', error);
    }
}