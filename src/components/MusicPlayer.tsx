import { TrackDto } from "@/types/ApplicationTypes/TrackType"
import { Badge, Button, Col, Row } from "react-bootstrap"
import DefaultBeatThumbnail from "/default-image/defaultSoundwave.jpg"
import { FiPlayCircle, FiShoppingBag, FiSkipBack, FiSkipForward, FiStopCircle, FiVolume, FiVolume1, FiVolume2, FiVolumeX } from "react-icons/fi"
import { useState } from "react"
import FormRange from "react-bootstrap/esm/FormRange"

const MusicPlayer = (props: { track: TrackDto }) => {
    const { track } = props
    const [autoStart, setAutoStart] = useState<boolean>(true)
    const [volumne, setVolume] = useState<number>(0)
    const [isMuted, setMuted] = useState<boolean>(false)
    const [isPlaying, setPlaying] = useState<boolean>(autoStart)

    return (<>
        <Row className="music-player align-items-center">
            <Col xl={5} className="music-player-content d-flex justify-content-end ">
                <img className="img-fluid icon me-2" src={DefaultBeatThumbnail}></img>
                <div className="info me-2">
                    <div className="name">{track?.TrackName}</div>
                    <div className="tag">{track.Tags.map((tag, idx) => (
                        <Badge bg="secondary" key={idx}>{tag.Name}</Badge>
                    ))}</div>
                </div>
                <Button><FiShoppingBag className="me-2" />{track?.Price?.toLocaleString('vn-VN', { style: 'currency', currency: 'VND' })}</Button>
            </Col>
            <Col xl={2} className="center d-flex justify-content-center align-items-center">
                <FiSkipBack />
                <div className="play mx-3" onClick={() => { setPlaying(!isPlaying) }}>
                    {isPlaying ? <FiPlayCircle /> : <FiStopCircle />}
                </div>
                <FiSkipForward />
            </Col>
            <Col xl={5} className="d-flex justify-content-start align-items-center">
                <div className="volumne" onClick={() => { setMuted(!isMuted) }}>
                    {
                        isMuted ? <FiVolumeX /> : (
                            volumne <= 25 ? <FiVolume /> : (
                                volumne <= 75 ? <FiVolume1 /> : (
                                    <FiVolume2 />
                                )
                            )
                        )
                    }
                </div>
                <div className="volumne-bar align-items-center">
                    <FormRange value={volumne} onChange={(e) => {
                        let value = parseInt(e.target.value)
                        if (!(isMuted && value > volumne)) setVolume(value)
                        else {
                            setMuted(false)
                        }
                    }} className="ms-2" />
                </div>
            </Col>
        </Row>
    </>)
}

export default MusicPlayer