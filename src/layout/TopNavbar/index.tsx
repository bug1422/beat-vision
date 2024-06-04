import { Button, Collapse } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
// import logoDark from '/logo-dark.png'
// import logoImg from '/logo.png'
import logoSM from '/logo-sm.png'
import { useToggle } from '@/hooks'
import { Notifications, ProfileDropdown } from './components'
import { notifications } from './data'
import { useAuthContext } from '@/context'
import { useEffect, useRef, useState } from 'react'
import Cart from './components/Carts'

const TopNavBar = () => {
	const { isAuthenticated, user } = useAuthContext();
	const [loggedIn, setLogged] = useState<boolean>(isAuthenticated)
	const { isOpen, toggle } = useToggle()
	const navigate = useNavigate()
	useEffect(() => {
		console.log(isAuthenticated)
		setLogged(isAuthenticated)
	}, [isAuthenticated])

	const keyword = useRef<string>("")
	const handleSearchBeat = (keyword: string) => {
		navigate("/beats/" + keyword, { replace: true })
	}
	return (
		<>
			<nav className="navbar py-0 navbar-expand-lg navbar-light header">
				<div className="px-5 container-fluid">
					<Link className="navbar-brand" to="/">
						<img src={logoSM} height={52} className="mr-1" />
					</Link>
					<Collapse in={isOpen} className="navbar-collapse ">
						<div>
							<form className="me-auto d-flex app-search-topbar" onSubmit={(e) => {
								e.preventDefault()
								handleSearchBeat(keyword.current)
							}}>
								<div className="input-group">
									<input
										type="text"
										className="form-control"
										placeholder="Search"
										aria-label="Recipient's username"
										aria-describedby="basic-addon2"
										onChange={(e) => {
											keyword.current = e.target.value
										}}
									/>
									<Button
										variant="soft-primary"
										type="button"
										id="button-addon2"
									>
										<i className="fas fa-search" onClick={(e) => {
											handleSearchBeat(keyword.current)
										}} />
									</Button>
								</div>
							</form>
							<ul className="navbar-nav mb-2 mb-lg-0">
								<li className="mx-2 my-2 nav-item">
									<Link className="nav-link active header-text" aria-current="page" to="/">
										Home
									</Link>
								</li>
								<li className="mx-2 my-2 nav-item">
									<Link className="nav-link active header-text" aria-current="page" to="/beats/">
										Beats
									</Link>
								</li>
								{/* <li className="mx-2 my-2 nav-item">
									<Link className="nav-link active header-text" to="#">
										Support
									</Link>
								</li> */}
								{!loggedIn ?
									<>
										<li className="mx-2 my-2 nav-item">
											<Link className='nav-link active header-text' to="/auth/login">Log In</Link>
										</li>
										<li className="mx-2 my-2 nav-item">
											<Link className='nav-link active header-text' to="/auth/register">Sign Up</Link>
										</li>
									</> : null}
							</ul>
						</div>
					</Collapse>
					{
						isAuthenticated ?
							<>
								<Cart userId={user != undefined ? parseInt(user.userid) : undefined} />
								<Notifications notifications={notifications} />
								<ProfileDropdown />
							</> :
							null
					}

					<button
						onClick={toggle}
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent2"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon" />
					</button>
				</div>
			</nav>
		</>
	)
}

export default TopNavBar
export { default as AdminTopNavBar } from './AdminTopNavBar'
