import { useNavigate, useSearchParams } from "react-router-dom"
import { FormInputPassword } from "@/components"
import { yupResolver } from "@hookform/resolvers/yup"
import { AxiosResponse } from "axios"
import { Card, CardBody, CardFooter, CardTitle, Col, FormLabel, Row } from "react-bootstrap"
import { useForm } from "react-hook-form"
import * as yup from 'yup'
import { HttpClient } from "@/common"
import { useEffect, useState } from "react"

const PasswordConfirm = () => {
    const [searchParams] = useSearchParams()
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const Email = searchParams.get("Email")
    const ResetToken = searchParams.get("ResetToken")

    useEffect(() => {
        if (!Email || !ResetToken) navigate("/")
    })
    const schemaResolver = yup.object().shape({
        NewPassword: yup.string().required("Please enter new password"),
    })
    const { control, handleSubmit } = useForm({
        resolver: yupResolver(schemaResolver),
    })
    type PasswordChange = yup.InferType<typeof schemaResolver>

    const change = handleSubmit(async function (value: PasswordChange) {
        setLoading(true)
        if (value) {
            try {
                const res: AxiosResponse =
                    await HttpClient.get("/api/ManageIdentity/reset-password", {
                        params: {
                            Email: Email,
                            NewPassword: value.NewPassword,
                            ResetToken: ResetToken
                        }
                    })
                if (res) {
                    setSuccess(true)
                    setTimeout(()=>{
                        navigate("/auth/login")
                    },3000) 
                }
                console.log(res)
            } catch (error) {
                console.log(error)
                setError("Something went wrong")
            }
        }
        setLoading(false)
    })

    return (<>
        <div>
            <Row className="d-flex justify-content-center mt-5">
                <Col xs={4}>
                    {success ? <div className="text-center mt-5">
                        <div className='fs-1 fw-bold text-success'>Password changed</div>
                        <div className='my-3'>Redirecting to Login...</div>
                    </div> :
                        <Card>
                            <CardTitle className="my-2 ms-3">
                                Change password
                            </CardTitle>
                            <CardBody>
                                <form onSubmit={change}>
                                    <FormLabel>Enter new password</FormLabel>
                                    <FormInputPassword control={control} name="NewPassword" className="my-2" />
                                    <button type="submit"
                                        disabled={loading}
                                        className="btn btn-primary">
                                        Update Password
                                    </button>
                                </form>
                            </CardBody>
                            <CardFooter>
                                {error != "" ? error : ""}
                            </CardFooter>
                        </Card>
                    }
                </Col>
            </Row>
        </div>
    </>)
}

export default PasswordConfirm