import React, {useState , useEffect} from "react";

const AuthContext = React.createContext({
    isLoggedIn : false,
    onLogOut : () => {},
    onLogIn : ()=> {}
})

export const AuthContextProvider = (props)=> {

    useEffect( ()=> {
        const storedUserLoggedIn = localStorage.getItem('Logged_In');
        if (storedUserLoggedIn === '1'){
           setIsLoggedIn(true);
        }
      },
         []
      )

    const [isLoggedIn,setIsLoggedIn] = useState()

    const logOutHandler = ()=> {
        localStorage.removeItem('Logged_In');
        setIsLoggedIn(false)
    }

    const logInHandler = ()=> {
        setIsLoggedIn(true)
        localStorage.setItem('Logged_In','1')
    }
    return <AuthContext.Provider value={{isLoggedIn : isLoggedIn , onLogOut : logOutHandler , onLogIn : logInHandler}}>{props.children}</AuthContext.Provider>
}


export default AuthContext