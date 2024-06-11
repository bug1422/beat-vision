import { AuthContextType, User } from "@/types"
import { deleteCookie, getCookies, hasCookie, setCookie } from 'cookies-next'
import { ReactNode, createContext, useContext, useState } from "react"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuthContext() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuthContext must be used within an AuthProvider')
    }
    return context
}

const authSessionKey = '_BEATVISION_AUTH_'

export function AuthProvider({ children }: { children: ReactNode }) {

    const saveSession = (access:string, user:User) => {
        setCookie(authSessionKey, JSON.stringify(user))
        setUser(user)
        setCookie("BEATVISION",access)
    }

    const removeSession = () => {
        deleteCookie("BEATVISION")
        setUser(undefined)
        deleteCookie(authSessionKey)
    }

    const getSession = () => {
        const data = getCookies()[authSessionKey]
        if (data) {
            const decoded = decodeURIComponent(data)
            const user: User = JSON.parse(decoded)
            console.log(user)
            return user
        }
        return undefined
    }

    const [user, setUser] = useState<User | undefined>(getSession())
    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: hasCookie(authSessionKey),
                saveSession,
                removeSession,
            }}>
            {children}
        </AuthContext.Provider>
    )
}