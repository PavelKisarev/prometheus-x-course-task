import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom"
import NotFoundPage from "../pages/NotFoundPage"
import SignInPage from "../pages/SignInPage"
import BooksListPage from "../pages/BooksListPage"
import BooksSinglePage from "../pages/BooksSinglePage"
import CartPage from "../pages/CartPage"
import App from "../App"

const AppRoutes = () => {
    return (
    <BrowserRouter basename="/prometheus-x-course-task">
    {/* // <BrowserRouter> */}
        <Routes>
            <Route path="/" element={<App />} >
                <Route path='*' element={ <NotFoundPage />} />
                <Route path='/signin' element={ <SignInPage />} />
                <Route path='/books' element={ <BooksListPage />} />
                <Route path='/books/:id' element={ <BooksSinglePage />} />
                <Route path='/cart' element={ <CartPage />} />
            </Route>
        </Routes>
    </BrowserRouter>
    )
}

export default AppRoutes