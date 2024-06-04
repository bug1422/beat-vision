import { Col, Row } from "react-bootstrap"
import success from '/default-image/success-icon.png'
import fail from '/default-image/fail-icon.png'
import { FiFacebook, FiInstagram } from "react-icons/fi"


const PaymentResult = (props: { isSuccess: boolean }) => {
    const { isSuccess } = props
    const res = isSuccess ? success : fail
    return (
        <div className="pt-5 payment-result d-flex align-items-center">
            <Row className="w-100 d-flex justify-content-center">
                <Col xs={4} className="result-container d-flex flex-column text-center justify-content-center p-4">

                    {isSuccess ?
                        <div className="fw-bold text-success result-title">Transaction Complete</div> :
                        <div className="fw-bold text-danger result-title">Transaction Failed</div>
                    }
                    <div>
                        <img src={res} alt="result" className="result-icon" />
                    </div>
                    <div className="border-bottom pb-4">
                        {isSuccess ?
                            <div>
                                <div className="result-description">Please check your email to get your purchase</div>
                            </div> :
                            <div>
                                <div className="result-descripiton">Your transaction failed to progress further. Please try again</div>
                            </div>
                        }
                    </div>
                    <div className="d-flex flex-column result-support mt-3">
                        <div className="mb-3">If you have any question, contact us:</div>
                        <div className="d-flex justify-content-around link">
                            <a target="_blank" href={import.meta.env.VITE_FACEBOOK_URL}>
                                <FiFacebook className="mx-3 icon" />
                                Facebook
                            </a>
                            <a target="_blank" href={import.meta.env.INSTAGRAM_URL}>
                                <FiInstagram className="mx-3 icon" />
                                Instagram
                            </a>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default PaymentResult