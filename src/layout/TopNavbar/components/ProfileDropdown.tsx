import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from 'react-bootstrap'

import { FiArchive, FiBell, FiPower, FiShoppingCart, FiUser } from 'react-icons/fi'
import { useAuthContext } from '@/context'
import { useNavigate } from 'react-router-dom'
import { AxiosResponse } from 'axios'
import { UserProfileDto } from '@/types/ApplicationTypes/UserProfileType'
import { HttpClientAuth } from '@/common'
import { useEffect, useState } from 'react'
import defaultProfile from '/default-image/defaultprofile.png'

const ProfileDropdown = () => {
	const { removeSession, user } = useAuthContext()
	const [imgURL, setImgURL] = useState(defaultProfile)
	const navigate = useNavigate()

	const logout = () => {
		removeSession()
		setTimeout(() => {
			navigate('/auth/login')
		}, 500)
	}

	useEffect(() => {
		FetchUserProfile()
	}, [])

	const FetchUserProfile = async () => {
		try {
			const res: AxiosResponse<UserProfileDto> =
				await HttpClientAuth.get('/api/ManageUser/' + user?.userid,{})
			if (res?.data) {
				const imgurl = res?.data.ProfileBlobUrl 
				if (imgurl) {
					
					var img = new Image()
					img.src = imgurl
					
					if (img.height != 0) setImgURL(imgurl)
				}
			}
		} catch (e: any) {
			console.log(e)
		}
	}

	return (
		<Dropdown as="div" className='align-self-center'>
			<DropdownToggle
				as="a"
				className="nav-link arrow-none waves-effect waves-light nav-user"
			>
				<img
					src={imgURL}
					alt="profile-user"
					className="rounded-circle thumb-md"
				/>
			</DropdownToggle>
			<DropdownMenu className="dropdown-menu-end">
				<DropdownItem onClick={() => navigate("/profile")}>
					<FiUser className="align-self-center icon-xs icon-dual me-1" />{' '}
					Profile
				</DropdownItem>
				<DropdownItem onClick={() => navigate("/cart")}>
					<FiShoppingCart className="align-self-center icon-xs icon-dual me-1" />{' '}
					Carts
				</DropdownItem>
				<DropdownItem onClick={() => navigate("/payment/history")}>
					<FiArchive className="align-self-center icon-xs icon-dual me-1" />{' '}
					Purchases
				</DropdownItem>
				<DropdownItem onClick={() => navigate("/notification")}>
					<FiBell className="align-self-center icon-xs icon-dual me-1" />{' '}
					Notification
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
