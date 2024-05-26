import { Col, Row } from "react-bootstrap"
import { FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi"

const Footer = () => {
	return (
		<footer className="footer text-center text-sm-start">
			<Row>
				<Col>
					<div className="my-3">BeatVision</div>
					<div className="d-flex flex-column">
						<div>About Us</div>
						<div>Producers</div>
						<div>Contact Us</div>
						<div>Privacy</div>
						<div>Terms of Conditions</div>
					</div>
				</Col>
				<Col></Col>
				<Col>
					<div className="my-3">Follow Us</div>
					<div className="d-flex">
						<FiInstagram className="me-4"/>
						<FiTwitter className="me-4"/>
						<FiFacebook className="me-4"/>
					</div>
				</Col>
			</Row>
		</footer>
	)
}

export default Footer
