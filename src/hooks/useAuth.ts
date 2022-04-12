import { createContext, useContext } from "react"

const TOKEN_KEY = 'mvp_token'

export type Session = {
    id: string,
    username: string,
    role: 'buyer' | 'seller',
    pem: string[]
}

export const AuthContext = createContext<{ currentUser: Session | null }>({ currentUser: null })
AuthContext.displayName = 'Auth Context'

const parseJwt = (token: string) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

export const maybeGetUserFromLocalStorage = () => {
    const token = getTokenFromLocalStorage()
    if (token && token.length > 0) {
        const data = parseJwt(token)
        console.log(data)
        return {
            id: data.sub,
            username: data.username,
            role: data.role,
            pem: data.pem
        }
    }

    return null
}

export const getTokenFromLocalStorage = () => {
    return localStorage.getItem(TOKEN_KEY)
}

export const persistTokenToLocalStorage = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token)
}

export const removeTokenFromLocalStorage = () => {
    localStorage.removeItem(TOKEN_KEY)
}


export const useAuth = () => {
    const { currentUser } = useContext(AuthContext)

    return { isLoggedIn: !!currentUser, currentUser }
}