import { HttpClient } from "@/common"
import { useAuthContext } from "@/context"
import { AuthReturnType } from "@/types/AuthTypes"
import { AxiosResponse } from "axios"
import { useState } from "react"
import { Button, Card, CardBody, Col, Row } from "react-bootstrap"
import { toast } from "sonner"

const EmailConfirm = () => {
    const { user } = useAuthContext()
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [emailSent, setSent] = useState(false)

    const GetToken = async () => {
        try {
            const res: AxiosResponse<AuthReturnType> = await HttpClient.post('/api/ManageIdentity/login', {
                email: user?.email,
                password: password
            })
            if (res.data) {
                return res.data?.AccessToken
            }
        } catch (e: any) {
            console.log(e)
            setError("Wrong email or password")
        }
        return undefined
    }

    const RequestConfirm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        const jwt = await GetToken()
        if (jwt != undefined) {
            try {
                const res: AxiosResponse =
                    await HttpClient.get('/api/ManageIdentity/send-confirmation-email', {
                        headers: {
                            Authorization: `Bearer ${jwt}`
                        }
                    })
                if (res.status == 200) setSent(true)
                console.log(res)
            } catch (e: any) {
                console.log(e)
                setError("Something went wrong")
            }
        }
        else {
            toast.error("Can't log in", { position: "bottom-right", duration: 2000 })
        }
        setLoading(false)
    }

    return (<>
        <div className="d-flex align-items-center" style={{ height: "800px" }}>
            <Row className="w-100 d-flex justify-content-center">
                <Col xs={7} >
                    <Card>
                        <CardBody>
                            {emailSent ? <>
                                <div className="fs-1 fw-bold text-success text-center">
                                    Confirmation sent, check your email
                                </div>
                            </> :
                                <>
                                    <div className="fs-1 fw-bold" style={{ height: "100px" }}>Email Confirmation</div>
                                    <form onSubmit={RequestConfirm}>
                                        <label className="fs-3">Type in your password</label>
                                        <input type="password" onChange={(e) => { setPassword(e.target.value) }} className="fs-3 my-3 form-control" placeholder="" />
                                        <Button
                                            variant="primary"
                                            className="w-100 waves-effect waves-light"
                                            disabled={loading}
                                            type="submit"
                                        >
                                            Submit
                                        </Button>
                                        {error != "" ? <div className='text-danger fw-bold fs-3'>{error}</div> : <></>}
                                    </form>
                                </>
                            }
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    </>)
}
export default EmailConfirm