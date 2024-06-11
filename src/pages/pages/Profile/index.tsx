import ProfileInfo from './components/ProfileInfo'
import ProfileTask from './components/ProfileTask'
import FetchUser from './FetchUser'
import { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'


const Profile = () => {
	const { userId } = useParams()
	const { Fetch, isAuthenticated, fetchSuccess, userData } = FetchUser()
	useEffect(() => {
		console.log(isAuthenticated)
		Fetch(userId);
	}, [])
	return (
		<>
			{!isAuthenticated && <Navigate to="/" replace />}
			{
				fetchSuccess ? <>
					{
						userData ? <ProfileInfo userId={userData.Id} roles={userData.Roles} verified={userData.EmailConfirmed} /> : <></>
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