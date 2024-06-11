import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { jwtDecode } from 'jwt-decode'
import { User } from "@/types"
import { useAuthContext } from "@/context"
import { toast } from "sonner"

const ExternalLogin = () => {
    const { saveSession } = useAuthContext()
    const { jwtToken } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        if (jwtToken && jwtToken != "") {
            try {
                const decoded = jwtDecode<User>(jwtToken)
                console.log(decoded)
                saveSession({
                    ...(decoded ?? {}),
                })
                toast.success('Successfully logged in. Redirecting....', {
                    position: 'bottom-right',
                    duration: 2000,
                })
                localStorage.setItem("BeatVision", jwtToken)
                navigate("/")
            } catch (error) {
                toast.error('Failed getting info', {
                    position: 'bottom-right',
                    duration: 2000,
                })
                navigate("/auth/login")
            }
        }
        else {
            toast.error('Failed creating account', {
                position: 'bottom-right',
                duration: 2000,
            })
            navigate("/auth/login")
        }
    })

    return (<>
    </>)
}

export default ExternalLogin