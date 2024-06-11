import { useState, useEffect } from 'react'
import {
	Button,
	ButtonGroup,
	Card,
	Col,
	Row,
} from 'react-bootstrap'
import { useAuthContext } from '@/context'
import { MessageResponse } from '@/types/ApplicationTypes/MessageType'
import { AxiosResponse } from 'axios'
import { HttpClient } from '@/common'
import NotiCard from './NotiCard'

const Inbox = () => {
	const { user } = useAuthContext()
	const [notis, setNotis] = useState<MessageResponse[]>()
	const [_error, SetError] = useState<string>("")
	const [isLoading, SetIsLoading] = useState<boolean>(false)

	useEffect(() => {
		FetchNotification()
	}, [])

	const setRead = async (item: MessageResponse) => {
		if (!item.IsReaded) {
			try {
				const res: AxiosResponse<MessageResponse[]> =
					await HttpClient.get("/api/ManageNotification/read", {
						params: {
							userProfileId: user?.userid,
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

	const setAllRead = async () => {
		try {
			const res: AxiosResponse<MessageResponse[]> =
				await HttpClient.get("/api/ManageNotification/read-all", {
					params: {
						userProfileId: user?.userid,
					}
				})
			if (res) {
				if (notis) {
					const tempt = notis
					tempt.forEach(p => p.IsReaded = true)
					setNotis([...tempt])
				}
			}
		} catch (error) {
			console.log(error)
		}
	}

	const FetchNotification = async () => {
		SetIsLoading(true)
		if (user?.userid != undefined) {
			try {
				const res: AxiosResponse<MessageResponse[]> =
					await HttpClient.get("/api/ManageNotification/get-all", {
						params: {
							userProfileId: user?.userid
						}
					})
				if (res) {
					const tempt = [...res.data.sort((a, b) => Date.parse(a.Message.CreatedDate) - Date.parse(b.Message.CreatedDate)).slice(0, 8)]
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
		<Row className='mt-5'>
			<Col xs="12">
				{isLoading ? <div className='fs-1 fw-bold text-info text-center'>LOADING</div> :
					<div className="px-5">
						<div className='text-white fw-bold fs-1 border-bottom mb-3'>Notifications</div>
						<div className='btn btn-warning fw-bold' onClick={() => { setAllRead() }}>Mark All As Read</div>
						<Card className="my-3">
							<ul className="message-list">
								{(notis || []).map((noti, idx) => (
									<div onClick={() => { setRead(noti) }} style={{ cursor: "pointer" }} key={idx}>
										<NotiCard noti={noti} />
									</div>
								))}
							</ul>
						</Card>
						<Row className="mb-3">
							<Col xs="7" className="align-self-center">
								Showing 1 - 20 of 1,524
							</Col>
							<Col xs="5">
								<ButtonGroup className="float-end">
									<Button
										type="button"
										size="sm"
										variant="soft-warning"
										className="waves-effect mb-0"
									>
										<i className="fa fa-chevron-left" />
									</Button>
									<Button
										type="button"
										size="sm"
										variant="soft-warning"
										className="waves-effect mb-0"
									>
										<i className="fa fa-chevron-right" />
									</Button>
								</ButtonGroup>
							</Col>
						</Row>
					</div>
				}
			</Col>
		</Row>
	)
}

export default Inbox
