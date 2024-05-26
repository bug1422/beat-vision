import { Button, Collapse } from 'react-bootstrap'
import { Link } from 'react-router-dom'
// import logoDark from '/logo-dark.png'
// import logoImg from '/logo.png'
import logoSM from '/logo-sm.png'
import { useToggle } from '@/hooks'
import { Notifications, ProfileDropdown } from './components'
import { notifications } from './data'

const TopNavBar = () => {
	const { isOpen, toggle } = useToggle()
	return (
		<>
		<nav className="navbar py-0 navbar-expand-lg navbar-light header">
				<div className="px-5 container-fluid">
					<Link className="navbar-brand" to="#">
						<img src={logoSM} height={52} className="mr-1" />
					</Link>
					<Collapse in={isOpen} className="navbar-collapse ">
						<div>
						<form className="me-auto d-flex app-search-topbar">
								<div className="input-group">
									<input
										type="text"
										className="form-control"
										placeholder="Search"
										aria-label="Recipient's username"
										aria-describedby="basic-addon2"
									/>
									<Button
										variant="soft-primary"
										type="button"
										id="button-addon2"
									>
										<i className="fas fa-search" />
									</Button>
								</div>
							</form>
							<ul className="navbar-nav mb-2 mb-lg-0">
								<li className="mx-2 my-2 nav-item">
									<Link className="nav-link active header-text" aria-current="page" to="#">
										Home
									</Link>
								</li>
								<li className="mx-2 my-2 nav-item">
									<Link className="nav-link active header-text" aria-current="page" to="#">
										Beats
									</Link>
								</li>
								<li className="mx-2 my-2 nav-item">
									<Link className="nav-link active header-text" to="#">
										Products
									</Link>
								</li>
								<li className="mx-2 my-2 nav-item">
									<Link className="nav-link active header-text" to="#">
										Support
									</Link>
								</li>
							</ul>
						</div>
					</Collapse>
					<Notifications notifications={notifications}/>
					<ProfileDropdown/>
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
