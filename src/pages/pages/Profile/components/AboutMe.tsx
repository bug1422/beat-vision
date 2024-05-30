import {
	Card,
	CardBody,
	Col,
	Row,
} from 'react-bootstrap'

import { UserProfileDto } from '@/types/ApplicationTypes/UserProfileType'

const AboutMe = (props: { userData: UserProfileDto | undefined | null }) => {
	const { userData } = props
	return (
		<Row>
			<Col >
				<Card>
					<CardBody>
						<p className="fs-2 bold">Description</p>
						<div className="ps-2 post-title mt-4">
							<p className="font-15 mb-0">
								{userData?.Description ?? "No Info"}
							</p>
						</div>
					</CardBody>
				</Card>
			</Col>
		</Row>
	)
}

export default AboutMe
