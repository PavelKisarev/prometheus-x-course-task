import { useNavigate, useLocation, Outlet} from "react-router-dom"
import { useEffect, useState } from 'react';
import Header from './components/header/Header';
import './App.css';
import Footer from "./components/footer/Footer";
import { UserProvider } from './context/UserContext';
import { BooksProvider } from "./context/BookContext";

function App() {
  let navigate = useNavigate();
  let location = useLocation();

  let [isOnSignInPage, setIsOnSignInPage] = useState(true);

  useEffect(()=>{
    let isAuth = localStorage.getItem("isLoggedIn")

    if(!isAuth) {
      navigate('/signin')
    } else {
      if(location.pathname === "/" || location.pathname === '/signin'){
        navigate('/books')
      }
    }
    location.pathname === "/signin" ? setIsOnSignInPage(true) : setIsOnSignInPage(false)
  }, [])

  useEffect(()=>{
    location.pathname === "/signin" ? setIsOnSignInPage(true) : setIsOnSignInPage(false)
  },[location.pathname])

  return (
    <>
      <UserProvider>
        <BooksProvider>
          <Header />
          <main>
            <div className="container pt-8x">
              <Outlet />
            </div>
          </main>
          <div className="pY-8x"></div>
          {!isOnSignInPage && <Footer />}
        </BooksProvider>
      </UserProvider>
    </>
  );
}

export default App;
