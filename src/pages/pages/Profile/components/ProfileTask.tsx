import {
	Button,
	Card,
	CardBody,
	Col,
	Form,
	FormControl,
	Image,
	Nav,
	NavItem,
	NavLink,
	Row,
	TabContainer,
	TabContent,
	TabPane,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AboutMe from './AboutMe'
import Comments from './Comments'
import { CustomIdentityUserDto } from '@/types/ApplicationTypes/IdentityType'

const ProfileTask = (props: { user: CustomIdentityUserDto | undefined }) => {
	const { user } = props;
	return (
		<TabContainer defaultActiveKey="2">
			<div className="pb-4">
				<Nav
					className="nav-border nav-pills mb-0"
					id="pills-tab"
					role="tablist"
				>
					<NavItem>
						<NavLink eventKey="1">About Me</NavLink>
					</NavItem>
					<NavItem>
						<NavLink eventKey="2">Comments</NavLink>
					</NavItem>
				</Nav>
			</div>

			<Row>
				<Col xs={12}>
					<TabContent className="chat-list" id="pills-tabContent">
						<TabPane eventKey="1" className="fade">
							<AboutMe userData={user?.UserProfile}/>
						</TabPane>
						<TabPane eventKey="2" className="fade">
							<Comments userData={user?.UserProfile} />
						</TabPane>
					</TabContent>
				</Col>
			</Row>
		</TabContainer>
	)
}

export default ProfileTask
