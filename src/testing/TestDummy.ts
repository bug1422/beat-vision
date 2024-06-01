import { User } from "@/types"

export function FetchUser() {
    const user: User = {
        userid: "0",
        email: "test@gmail.com",
        username: "test",
        role: "USER",
        exp: 0,
        iss: "test",
        aud: "test",
        refreshToken: "abc",
    }
    const password = "123"
    return {user,password}
}