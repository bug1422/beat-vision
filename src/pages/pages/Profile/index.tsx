import ProfileInfo from './components/ProfileInfo'
import ProfileTask from './components/ProfileTask'
import FetchUser from './FetchUser'
import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'


const Profile = () => {
	const { Fetch, isAuthenticated, fetchSuccess, userData } = FetchUser()
	useEffect(() => {
		console.log(isAuthenticated)
		Fetch();
	}, [])
	return (
		<>
			{!isAuthenticated && <Navigate to="/" replace />}
			{
				fetchSuccess ? <>
					{
						userData && userData.UserProfile ? <ProfileInfo userId={userData?.UserProfile.Id} roles={userData?.Roles} verified={userData.EmailConfirmed} /> : <></>
					}
					<ProfileTask user={userData}/>
				</> : <>
					<div className='text-center text-white fw-bold fs-1'>Can't get data</div>
				</>
			}
		</>
	)
}
export default Profile