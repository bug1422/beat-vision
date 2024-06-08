import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	Image,
} from 'react-bootstrap'
import { FiBell } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'
import { NotificationType } from '../types'
import { useEffect, useState } from 'react'
import { AxiosResponse } from 'axios'
import { MessageResponse } from '@/types/ApplicationTypes/MessageType'
import { HttpClient } from '@/common'

function timeSince(value: string) {
	const date = new Date(value)

	const seconds = Math.floor((new Date().valueOf() - date.valueOf()) / 1000)
	let intervalType: string

	let interval = Math.floor(seconds / 31536000)
	if (interval >= 1) {
		intervalType = 'year'
	} else {
		interval = Math.floor(seconds / 2592000)
		if (interval >= 1) {
			intervalType = 'month'
		} else {
			interval = Math.floor(seconds / 86400)
			if (interval >= 1) {
				intervalType = 'day'
			} else {
				interval = Math.floor(seconds / 3600)
				if (interval >= 1) {
					intervalType = 'hr'
				} else {
					interval = Math.floor(seconds / 60)
					if (interval >= 1) {
						intervalType = 'min'
					} else {
						interval = seconds
						intervalType = 'second'
					}
				}
			}
		}
	}
	if (interval > 1 || interval === 0) {
		intervalType += 's'
	}
	return interval + ' ' + intervalType + ' ago'
}

const Notifications = ({
	userId,
}: {
	userId: number | undefined
}) => {
	const [notis, setNotis] = useState<MessageResponse[]>()
	const [error, SetError] = useState<string>("")
	const [isLoading, SetIsLoading] = useState<boolean>(false)
	const [isNew, setNew] = useState(false)
	useEffect(() => {
		FetchNotification()
	}, [])

	const setRead = async (item: MessageResponse) => {
		if (!item.IsReaded) {
			try {
				const res: AxiosResponse<MessageResponse[]> =
					await HttpClient.get("/api/ManageNotification/read", {
						params: {
							userProfileId: userId,
							messageId: item.MessageId
						}
					})
				if (res) {
					if (notis) {
						const tempt = notis
						tempt?.forEach(p => { if (p.MessageId == item.MessageId) p.IsReaded = true; return true })
						setNotis([...tempt])
					}
				}
			} catch (error) {
				console.log(error)
			}
		}
	}

	const FetchNotification = async () => {
		SetIsLoading(true)
		if (userId != undefined) {
			try {
				const res: AxiosResponse<MessageResponse[]> =
					await HttpClient.get("/api/ManageNotification/get-all", {
						params: {
							userProfileId: userId
						}
					})
				if (res) {
					const tempt = [...res.data.sort((a, b) => Date.parse(a.Message.CreatedDate) - Date.parse(b.Message.CreatedDate)).slice(0, 8)]
					if (tempt.some(p => !p.IsReaded)) setNew(true)
					else setNew(false)
					setNotis([...tempt])
				}
			} catch (error) {
				console.log(error)
			}
		}
		else SetError("please log in again")
		SetIsLoading(false)
	}
	return (
		<Dropdown as="div" className='notification-list'>
			<DropdownToggle
				as="a"
				className="nav-link arrow-none waves-light waves-effect"
			>
				<FiBell className="bell align-self-center topbar-icon" />
				{isNew && notis && notis?.length > 0 ?
					<span className="badge bg-danger rounded-pill noti-icon-badge">{notis?.length}</span> : <></>
				}
			</DropdownToggle>
			<DropdownMenu className="dropdown-menu-end dropdown-lg pt-0 topbar-cart">
				<h6 className="dropdown-item-text font-15 m-0 py-3 border-bottom d-flex justify-content-between align-items-center">
					Carts <span className="badge bg-primary rounded-pill"></span>
				</h6>
				{!isLoading ? <div className="list">
					<ul className="navbar-nav ps-2">
						{notis?.map((noti, index) => (
							<li style={{ cursor: "pointer" }} key={index} className="nav-item my-2 w-100" onClick={() => { setRead(noti) }} >
								<small className="float-end text-muted ps-2">
									{timeSince(noti.Message.CreatedDate)}
								</small>
								<div className="media-body align-self-center ms-2 text-truncate">
									<h6 className={`my-0 ${noti.IsReaded ? "fw-normal text-secondary" : "fw-bold text-dark"}`}>{noti.Message.MessageName.slice(0, 30) + "..."}</h6>
									<small className={`text-muted mb-0 ${noti.IsReaded ? "fw-normal text-secondary" : "fw-bold text-dark"}`}>
										{noti.Message.Content}
									</small>
								</div>
							</li>
						))}
					</ul>
				</div> : <div>{error != "" ? error : "LOADING"}</div>
				}
				<Link to={"/notification"} className="dropdown-item text-center text-primary view-all border-top">
					View all <i className="fi-arrow-right"></i>
				</Link>
			</DropdownMenu>
		</Dropdown >
	)
}

export default Notifications
