import {createContext, useEffect, useState} from "react";

interface IUserContext {
    user: {
        name: string | null,
        isLoggedIn: boolean | null
    },
    logIn : (name: string) => void
    logOut : () => void
}

const defaultValue = {
    user : {
        name: "",
        isLoggedIn: false
    },
    logIn: () => {},
    logOut: () => {},
}

export const UserContext = createContext<IUserContext>(defaultValue);

export const UserProvider = ({children} : any) => {
    let [userName, setUserName] = useState("");
    let [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(()=>{
        let name = localStorage.getItem("userName");
        let isAuth = localStorage.getItem("isLoggedIn")
        if(name && !!isAuth){
            setUserName(name);
            setIsLoggedIn(true);
        }
    },[])

    const logIn = (name: string) => {
        setUserName(name);
        setIsLoggedIn(true);
        localStorage.setItem("userName", name);
        localStorage.setItem("isLoggedIn", "true")
    }

    const logOut = () => {
        setUserName("");
        setIsLoggedIn(false);
        localStorage.clear()
    }

    return <UserContext.Provider value={{user:{name:userName, isLoggedIn}, logIn, logOut}}>
        {children}
    </UserContext.Provider>
};