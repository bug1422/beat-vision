import httpClientAuth from "@/common/helpers/httpClientAuth"
import { AxiosResponse } from "axios"
import { useEffect } from "react"
import { Card, CardBody, Col, Row } from "react-bootstrap"


const EmailConfirm = () => {
    useEffect(() => {
        RequestConfirm()
    })

    const RequestConfirm = async () => {
        try {
            const res: AxiosResponse =
                await httpClientAuth.get('/api/ManageIdentity/send-confirmation-email')
            if (res.status == 200)
            console.log(res)
        } catch (e: any) {
            console.log(e)
        }
    }

    return (<>
        <div className="d-flex align-items-center" style={{ height: "800px" }}>
            <Row className="w-100 d-flex justify-content-center">
                <Col xs={7} >
                    <Card>
                        <CardBody>
                            <div className="fs-1 fw-bold text-success text-center">
                                Confirmation sent, check your email
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div >
    </>)
}
export default EmailConfirm