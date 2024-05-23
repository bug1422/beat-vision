import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	Image,
} from 'react-bootstrap'

import user5 from '@/assets/images/users/user-5.jpg'
import { FiPower, FiSettings, FiUser } from 'react-icons/fi'
import { useAuthContext } from '@/context'
import { useNavigate } from 'react-router-dom'
import { fetchAvt } from '@/testing/FetchFakeData'

const ProfileDropdown = () => {
	const { removeSession } = useAuthContext()
	const navigate = useNavigate()

	const logout = () => {
		removeSession()
		navigate('/auth/login')
	}

	return (
		<Dropdown as="li" className='align-self-center'>
			<DropdownToggle
				as="a"
				className="nav-link arrow-none waves-effect waves-light nav-user"
			>
				<Image
					src={fetchAvt}
					alt="profile-user"
					className="rounded-circle thumb-xs"
				/>
			</DropdownToggle>
			<DropdownMenu className="dropdown-menu-end">
				<DropdownItem>
					<FiUser className="align-self-center icon-xs icon-dual me-1" />{' '}
					Profile
				</DropdownItem>
				<DropdownItem>
					<FiSettings className="align-self-center icon-xs icon-dual me-1" />{' '}
					Settings
				</DropdownItem>
				<div className="dropdown-divider mb-0"></div>
				<DropdownItem onClick={() => logout()}>
					<FiPower className="align-self-center icon-xs icon-dual me-1" />{' '}
					Logout
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	)
}

export default ProfileDropdown
