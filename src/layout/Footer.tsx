import { Col, Row } from "react-bootstrap"
import { FiFacebook } from "react-icons/fi"
import { Link } from "react-router-dom"

const Footer = () => {
	return (
		<footer className="footer text-center text-sm-start">
			<Row>
				<Col>
					<div className="my-3">BeatVision</div>
					<div className="d-flex flex-column">
						<Link to={"/beats/"}>See Beats</Link>
					</div>
				</Col>
				<Col></Col>
				<Col>
					<div className="my-3">Follow Us</div>
					<div className="d-flex">
						{/* <FiInstagram className="me-4"></FiInstagram>
						<FiTwitter className="me-4"></FiTwitter> */}
						<a href="https://www.facebook.com/profile.php?id=61560419540654" target="_blank"><FiFacebook className="me-4"></FiFacebook></a>
					</div>
				</Col>
			</Row>
		</footer>
	)
}

export default Footer
