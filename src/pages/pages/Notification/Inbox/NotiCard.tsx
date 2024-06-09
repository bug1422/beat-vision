import { MessageResponse } from '@/types/ApplicationTypes/MessageType'

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
const NotiCard = ({ noti }: { noti: MessageResponse }) => {
	return (
		<>
			<div className="mt-3 ms-3 mb-4">
				<small className="float-end text-muted me-2 mt-3 ps-2">
					{timeSince(noti.Message.CreatedDate)}
				</small>
				<div className="media-body align-self-center ms-2 text-truncate">
					<h6 className={`my-0 fs-3 ${noti.IsReaded ? "fw-normal text-secondary" : "fw-bold text-dark"}`}>{noti.Message.MessageName}</h6>
					<small className={`text-muted fs-4 ${noti.IsReaded ? "fw-normal text-secondary" : "fw-bold text-dark"}`}>
						{noti.Message.Content}
					</small>
				</div>
			</div>
			<hr></hr>
		</>
	)
}

export default NotiCard
