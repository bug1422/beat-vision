import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	Image,
} from 'react-bootstrap'

import { FiArchive , FiPower, FiSettings, FiShoppingCart, FiUser } from 'react-icons/fi'
import { useAuthContext } from '@/context'
import { useNavigate } from 'react-router-dom'
import { fetchAvt } from '@/testing/FetchFakeData'

const ProfileDropdown = () => {
	const { removeSession, user } = useAuthContext()
	const navigate = useNavigate()

	const logout = () => {
		removeSession()
		setTimeout(() => {
			navigate('/auth/login')
		}, 500)
	}

	return (
		<Dropdown as="div" className='align-self-center'>
			<DropdownToggle
				as="a"
				className="nav-link arrow-none waves-effect waves-light nav-user"
			>
				<Image
					src={fetchAvt}
					alt="profile-user"
					className="rounded-circle thumb-md"
				/>
			</DropdownToggle>
			<DropdownMenu className="dropdown-menu-end">
				<DropdownItem onClick={() => navigate("/profile/" + user?.userid)}>
					<FiUser className="align-self-center icon-xs icon-dual me-1" />{' '}
					Profile
				</DropdownItem>
				<DropdownItem onClick={() => navigate("/cart/" + user?.userid)}>
					<FiShoppingCart className="align-self-center icon-xs icon-dual me-1" />{' '}
					Carts
				</DropdownItem>
				<DropdownItem onClick={() => navigate("/payment/history/" + user?.userid)}>
					<FiArchive  className="align-self-center icon-xs icon-dual me-1" />{' '}
					Purchases
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
