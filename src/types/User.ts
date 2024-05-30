export type User = {
    userid: string
    email?: string
    username?: string
    role: string
    exp: number
    iss?: string
    aud?: string
    refreshToken: string
}



export type AuthContextType = {
    user: User | undefined,
    isAuthenticated: boolean
    saveSession: (session: User) => void
    removeSession: () => void
}