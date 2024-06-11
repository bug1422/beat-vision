import {
	Col,
	Row,
} from 'react-bootstrap'

import { UserProfileDto } from '@/types/ApplicationTypes/UserProfileType'

const AboutMe = (props: { userData: UserProfileDto | undefined | null }) => {
	const { userData } = props
	return (
		<Row>
			<Col className='ms-2'>
				<p className="fs-2 bold text-white">Description</p>
				<div className="ps-2 post-title mt-4 text-white">
					<p className="font-15 mb-0 text-white">
						{userData?.Description ?? "No Info"}
					</p>
				</div>
			</Col>
		</Row>
	)
}

export default AboutMe
