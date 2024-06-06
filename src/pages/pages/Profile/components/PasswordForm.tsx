import HttpClientAuth from "@/common/helpers/httpClientAuth"
import { FormInputPassword } from "@/components"
import FormDate from "@/components/Form/FormDate"
import FormInput from "@/components/Form/FormTextInput"
import { useAuthContext } from "@/context"
import { UserProfileDto } from "@/types/ApplicationTypes/UserProfileType"
import { yupResolver } from "@hookform/resolvers/yup"
import { AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import { Card, CardBody, CardTitle, Col, Row } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { Form } from "react-router-dom"
import { toast } from "sonner"
import * as yup from 'yup'
const PasswordForm = () => {
    const { user } = useAuthContext()
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
                    await HttpClientAuth?.post(`/api/ManageIdentity/change-password?userId=${user?.userid}`, value, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        }
                    })
                if (res) {
                    toast.info("Password changed", { position: "bottom-right", duration: 2000 })
                }
                console.log(res)
            } catch (error) {
                console.log(error)
                toast.error("Can't change password", { position: "bottom-right", duration: 2000 })
            }
        }
    })

    return (<>
        <div className="d-flex justify-content-center">
            <Card>
                <CardTitle>
                    Change password
                </CardTitle>
                <CardBody>
                    <form onSubmit={change}>
                        <FormInputPassword control={control} name="OldPassword" className="my-2" />
                        <FormInputPassword control={control} name="NewPassword" className="my-2" />
                        <button type="submit" className="btn btn-primary">Update Password</button>
                    </form>
                </CardBody>
            </Card>
        </div>
    </>)

}
export default PasswordForm