///AuthContext.tsx
import { createContext, useEffect, useState } from "react";
import { AuthContextProviderProps, AuthContextType, JwtDecodeType } from "../@types/types";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    isBusiness: false,
    isAdmin: false,
    login: (jwt: string) => { },
    logout: () => { },

});



export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isBusiness, setisBusiness] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            setisBusiness(true);
            const decoded: JwtDecodeType = jwtDecode(token);
            setisBusiness(decoded.isBusiness);
            setIsAdmin(decoded.isAdmin);

        }
    }, [])

    const login = (jwt: string) => {
        setIsLoggedIn(true);
        const decoded: JwtDecodeType = jwtDecode(jwt);
        setisBusiness(decoded.isBusiness);
        setIsAdmin(decoded.isAdmin);
        localStorage.setItem("token", jwt);
        localStorage.setItem("user_id", decoded._id);
    };
    const logout = () => {
        setIsLoggedIn(false);
        setisBusiness(false);
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
    };




    return (
        <AuthContext.Provider value={{ isLoggedIn, isBusiness, login, logout, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};