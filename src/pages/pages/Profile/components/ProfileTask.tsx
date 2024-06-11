import {
	Col,
	Nav,
	NavItem,
	NavLink,
	Row,
	TabContainer,
	TabContent,
	TabPane,
} from 'react-bootstrap'
import AboutMe from './AboutMe'
import Comments from './Comments'
import { CustomIdentityUserDto } from '@/types/ApplicationTypes/IdentityType'
import UpdateForm from './UpdateForm'
import PasswordForm from './PasswordForm'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const ProfileTask = (props: { user: CustomIdentityUserDto | undefined }) => {
	const { user } = props;
	const [tab, setTab] = useState(1)
	const [searchParams] = useSearchParams();
	useEffect(() => {
		let i = searchParams.get("tab")
		if(i) setTab(parseInt(i))
	},[])
	return (
		<div className='profile-task'>
			<TabContainer defaultActiveKey="1" activeKey={tab}>
				<div className="">
					<Nav
						className="nav-border nav-pills"
						id="pills-tab"
						role="tablist"
					>
						<NavItem>
							<NavLink eventKey="1" onClick={() => { setTab(1)}} className='text-white'>About Me</NavLink>
						</NavItem>
						<NavItem>
							<NavLink eventKey="2" onClick={() => { setTab(2)}} className='text-white'>Comments</NavLink>
						</NavItem>
						<NavItem>
							<NavLink eventKey="3" onClick={() => { setTab(3)}} className='text-white'>Update Profile</NavLink>
						</NavItem>
						<NavItem>
							<NavLink eventKey="4" onClick={() => { setTab(4)}} className='text-white'>Password</NavLink>
						</NavItem>
					</Nav>
				</div>

				{
					user ? <Row>
						<Col xs={12}>
							<TabContent className="chat-list" id="pills-tabContent">
								<TabPane eventKey="1" className="fade">
									<AboutMe userData={user?.UserProfile} />
								</TabPane>
								<TabPane eventKey="2" className="fade">
									<Comments userData={user?.UserProfile} />
								</TabPane>
								<TabPane eventKey="3" className="fade">
									<UpdateForm />
								</TabPane>
								<TabPane eventKey="4" className="fade">
									<PasswordForm />
								</TabPane>
							</TabContent>
						</Col>
					</Row> : <></>
				}
			</TabContainer>
		</div>
	)
}

export default ProfileTask
