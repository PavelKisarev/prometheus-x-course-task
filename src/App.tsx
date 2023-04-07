import './App.css';
import {Routes, Route, useNavigate, useLocation} from "react-router-dom"
import SignInPage from './pages/SignInPage';
import BooksListPage from './pages/BooksListPage';
import BooksSinglePage from './pages/BooksSinglePage';
import CartPage from './pages/CartPage';
import NotFoundPage from './pages/NotFoundPage';
import { useEffect } from 'react';

function App() {
  let navigate = useNavigate();
  let location = useLocation();

  useEffect(()=>{
    if(location.pathname === "/"){
      navigate("signin")
    }
  }, [])

  return (
    <div>
      <Routes>
        <Route path='*' element={ <NotFoundPage />} />
        <Route path='/signin' element={ <SignInPage />} />
        <Route path='/books' element={ <BooksListPage />} />
        <Route path='/books/:id' element={ <BooksSinglePage />} />
        <Route path='/cart' element={ <CartPage />} />
      </Routes>
    </div>
  );
}

export default App;
