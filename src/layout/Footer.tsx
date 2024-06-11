import { Col, Row } from "react-bootstrap"
import { FiFacebook } from "react-icons/fi"
import { Link } from "react-router-dom"

const Footer = () => {
	return (
		<footer className="footer text-center text-sm-start">
			<Row>
				<Col className="mt-2">
					<Link to="/" className="text-white text-decoration-none">BeatVision</Link>
					<div className="mt-4 d-flex flex-column">
						<Link to={"/beats/"} className="text-white text-decoration-none">See Beats</Link>
					</div>
				</Col>
				<Col></Col>
				<Col>
					<div className="my-3 text-white">Follow Us</div>
					<div className="d-flex">
						{/* <FiInstagram className="me-4"></FiInstagram>
						<FiTwitter className="me-4"></FiTwitter> */}
						<a href="https://www.facebook.com/profile.php?id=61560419540654" target="_blank"><FiFacebook className="me-4 text-white"></FiFacebook></a>
					</div>
				</Col>
			</Row>
		</footer>
	)
}

export default Footer
