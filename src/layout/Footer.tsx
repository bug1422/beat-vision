import { Col, Row } from "react-bootstrap"
import { FiFacebook } from "react-icons/fi"

const Footer = () => {
	return (
		<footer className="footer text-center text-sm-start">
			<Row>
				<Col>
					<div className="my-3">BeatVision</div>
					<div className="d-flex flex-column">
						<div>About Us</div>
						<div>See Beats</div>
						<div>Support</div>
					</div>
				</Col>
				<Col></Col>
				<Col>
					<div className="my-3">Follow Us</div>
					<div className="d-flex">
						{/* <FiInstagram className="me-4"></FiInstagram>
						<FiTwitter className="me-4"></FiTwitter> */}
						<FiFacebook className="me-4"><a href="https://www.facebook.com/profile.php?id=61560419540654" target="_blank"></a></FiFacebook>
					</div>
				</Col>
			</Row>
		</footer>
	)
}

export default Footer
