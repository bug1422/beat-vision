export type User = {
    id: number
    email?: string
    username?: string
    firstName?: string
    lastName?: string
    role: string
    exp: number
    accessToken: string
    refreshToken: string
}

export type AuthContextType = {
    user: User | undefined,
    isAuthenticated: boolean
    saveSession: (session: User) => void
    removeSession: () => void
}