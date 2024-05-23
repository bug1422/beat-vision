import { FiMenu } from 'react-icons/fi'
import { Button, NavLink } from 'react-bootstrap'
import { useThemeContext } from '@/context'
import { Notifications, ProfileDropdown, SearchBar } from './components'
import { notifications } from './data'
import { Link } from 'react-router-dom'
import logoDark from '@/assets/images/logo-dark.png'
import logoSM from '@/assets/images/logo-sm.png'
import logoImg from '@/assets/images/logo.png'

const TopNavbar = () => {
	const { settings, updateSideNavMode } = useThemeContext()

	const handleLeftMenuCallBack = () => {
		if (settings.sideNavMode == 'default') {
			updateSideNavMode('sm')
		} else {
			updateSideNavMode('default')
		}
	}

	return (
		<>
			<div className="topbar">
				<nav className="navbar-custom">
					<ul className="list-unstyled topbar-nav float-end mb-0">
						<SearchBar />
						<Notifications notifications={notifications} />
						<ProfileDropdown />
					</ul>
					<ul className="list-unstyled topbar-nav mb-0 ms-2">
						<li>
							<div className="brand">
								<Link to="/" className="logo">
								<div className="d-flex gap-1 justify-content-center">
									<span>
										<img src={logoSM} alt="logo-large" className="logo-sm" />
									</span>
								</div>
								</Link>
							</div>
						</li>
					</ul>
				</nav>
			</div>
		</>
	)
}

export default TopNavbar
