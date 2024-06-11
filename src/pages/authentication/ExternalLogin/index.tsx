import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { jwtDecode } from 'jwt-decode'
import { User } from "@/types"
import { useAuthContext } from "@/context"
import { toast } from "sonner"
import { AxiosResponse } from "axios"
import { HttpClient } from "@/common"
import { UserProfileDto } from "@/types/ApplicationTypes/UserProfileType"

const ExternalLogin = () => {
    const { saveSession } = useAuthContext()
    const { jwtToken } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        Fetch()
    })
    const Fetch = async () => {
        if (jwtToken && jwtToken != "") {
            try {
                var decoded = jwtDecode<User>(jwtToken)
                const res2: AxiosResponse<UserProfileDto> = await HttpClient.get('/api/ManageUser/' + decoded.userid)
                decoded.profileId = res2.data.Id
                saveSession(jwtToken, decoded)
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
    }
    return (<>
    </>)
}

export default ExternalLogin