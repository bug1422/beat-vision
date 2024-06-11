import HttpClientAuth from "@/common/helpers/httpClientAuth"
import { FormInputPassword } from "@/components"
import { useAuthContext } from "@/context"
import { CustomIdentityUserDto } from "@/types/ApplicationTypes/IdentityType"
import { yupResolver } from "@hookform/resolvers/yup"
import { AxiosResponse } from "axios"
import { Col, FormLabel, Row } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import * as yup from 'yup'
const PasswordForm = (props: { user: CustomIdentityUserDto }) => {
    const userData = props.user
    const { removeSession } = useAuthContext()
    const navigate = useNavigate()
    const schemaResolver = yup.object().shape({
        NewPassword: yup.string().required("Please enter new password"),
        OldPassword: yup.string().required("Please enter old password")
    })
    const { control, handleSubmit } = useForm({
        resolver: yupResolver(schemaResolver),
    })
    type PasswordChange = yup.InferType<typeof schemaResolver>

    const change = handleSubmit(async function (value: PasswordChange) {
        if (value) {
            try {
                const res: AxiosResponse =
                    await HttpClientAuth.post(`/api/ManageIdentity/change-password?userId=${userData.UserProfile?.Id}`, value, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        }
                    })
                if (res) {
                    toast.info("Password changed", { position: "bottom-right", duration: 2000 })
                }
                console.log(res)
            } catch (error: any) {
                console.log(error)
                if (error.response.status == 401 || error.response.status == 403) {
                    removeSession()
                    toast.error("Your session has ran out, please log in again", { position: "bottom-right", duration: 2000 })
                    navigate("/auth/login")
                    return
                }
                toast.error("Can't change password", { position: "bottom-right", duration: 2000 })
            }
        }
    })

    return (<>
        <Row className="d-flex justify-content-center mt-5">
            <Col xs={7} >
                <div className="d-flex flex-column w-100">
                    <div className="fw-bold text-warning fs-1">Change password</div>
                    <form onSubmit={change} >
                        <FormLabel className="fw-light text-white fs-3">Enter old password</FormLabel>
                        <FormInputPassword control={control} name="OldPassword" className="my-2" />
                        <FormLabel className="fw-light text-white fs-3">Enter new password</FormLabel>
                        <FormInputPassword control={control} name="NewPassword" className="my-2" />
                        <button type="submit" className="mt-4 btn btn-warning fw-bold fs-3">Update Password</button>
                    </form>
                </div>
            </Col>
        </Row>
    </>)

}
export default PasswordForm