import { TrackDto } from "@/types/ApplicationTypes/TrackType"
import { Badge, Button, Col, Row } from "react-bootstrap"
import DefaultBeatThumbnail from "/default-image/defaultSoundwave.jpg"
import { FiMenu, FiPlayCircle, FiShoppingBag, FiSkipBack, FiSkipForward, FiStopCircle, FiVolume, FiVolume1, FiVolume2, FiVolumeX } from "react-icons/fi"
import { MutableRefObject, useCallback, useEffect, useRef, useState } from "react"
import FormRange from "react-bootstrap/esm/FormRange"
import { FetchAudio, FetchPopularTracks, FetchTrack } from "@/pages/pages/Search/getBeat"
import WaveSurfer from "wavesurfer.js"
import OffcanvasPlacement from "./OffCanvas"

const MusicPlayer = (props: { trackId: number }) => {
    function useToggle(
        initialState: boolean = false
    ): [boolean, () => void, () => void, () => void] {
        const [isOpen, setIsOpen] = useState(initialState)

        const show = useCallback(() => setIsOpen(true), [])
        const hide = useCallback(() => setIsOpen(false), [])
        const toggle = useCallback(() => setIsOpen(!isOpen), [isOpen])

        return [isOpen, toggle, show, hide]
    }

    const [trackId, setTrackId] = useState<number>(props.trackId)
    const [track, setTrack] = useState<TrackDto | undefined>()
    const [playlist, setPlaylist] = useState<TrackDto[]>()
    const [file, setFile] = useState("")

    const container = useRef<HTMLElement>(null);
    const waveSurfer = useRef<WaveSurfer | null>(null);

    const [barValue, setBarValue] = useState<number>(0)
    const [playPercent, setPlayPercent] = useState<number>(0)
    const [volumne, setVolume] = useState<number>(0)

    // const [autoStart, setAutoStart] = useState<boolean>(true)
    const [isOpen, toggle]: any = useToggle()
    const [isMuted, setMuted] = useState<boolean>(false)
    const [isPlaying, setPlaying] = useState<boolean>(false)
    const [isSkipping, setSkipping] = useState<boolean>(false)

    useEffect(() => {
        setTrackId(props.trackId)
    }, [props.trackId])

    const fetchData = async (id: number) => {
        const data = await FetchTrack(id)
        setTrack(data)
        if (track != undefined) setPlaylist([track, ...FetchPopularTracks()])
    }

    useEffect(() => {
        fetchData(trackId)

        console.log(trackId)
        console.log(track)
        setBarValue(0)
        setSkipping(false)
        setPlayPercent(0)
        SetPlaying(false)
        if (track != undefined) {
            const beat = FetchAudio(track?.Id)

            if (beat) {
                setFile(beat.Path)
            }
            if (container.current) {
                // Ensure the previous instance is destroyed before creating a new one
                if (waveSurfer.current) {
                    waveSurfer.current.destroy();
                }
                waveSurfer.current = WaveSurfer.create({
                    container: container.current,
                    url: file,
                });
                setTimeout(async () => {
                    await waveSurfer.current?.playPause();
                    setPlaying(true)
                }, 150)
                // return () => {
                //     if (waveSurfer.current) {
                //         waveSurfer.current.destroy();
                //         waveSurfer.current = null;
                //     }
                // };
            }
        }
    }, [trackId]);
    useEffect(() => {
        if(playPercent == 100){
            setPlayPercent(0)
            handleSkipForward()
            console.log("next")
        }
    })

    useEffect(() => {
        const timeOutId: NodeJS.Timeout = setTimeout(() => {
            if (!isSkipping) {
                if (waveSurfer.current != undefined) {
                    const duration = waveSurfer.current.getDuration();
                    const current = waveSurfer.current.getCurrentTime()
                    if (!isPlaying || isSkipping) return clearTimeout(timeOutId)
                    let calculate = 100 * (current / duration)
                    setPlayPercent(calculate)
                    setBarValue(calculate)
                    console.log(barValue.toString() + " " + calculate.toString())
                }
            }
        }, 600)
    })

    function SetPlaying(value: boolean) {
        if (value) {
            var playPromise = waveSurfer.current?.play();
            if (playPromise != undefined) {
                playPromise
                    .then(_ => { setPlaying(true) })
                    .catch((e: any) => { console.log(e); })
            }
        }
        else {
            waveSurfer.current?.pause()
            setPlaying(false)
        }
    }

    function handleSkip(e: React.ChangeEvent<HTMLInputElement>) {
        if (waveSurfer.current) {
            if (isPlaying) SetPlaying(false)
        }
        setBarValue(parseFloat(e.target.value))
    }

    function endSkip() {
        if (waveSurfer.current) {
            waveSurfer.current.seekTo(barValue / 100);
            setPlayPercent(barValue / 100);
        }
        SetPlaying(true)
        setSkipping(false)
    }

    function handleSkipBack() {
        if (trackId > 1) setTrackId(trackId - 1)
        console.log(trackId)
    }

    function handleSkipForward() {
        if (playlist && trackId < playlist.length) setTrackId(trackId + 1)
        console.log(trackId)
    }

    const OffCanvasItem = () => {
        return (<>
            {playlist?.map((track, index) => (
                <Row className="track align-items-center" key={index} onClick={() => { setTrackId(track.Id) }} >
                    <Col xl={1} className="d-flex">
                        <div className="rank user-select-none">{index + 1} </div>
                        <FiPlayCircle className="play" />
                    </Col>
                    <Col className="d-flex justify-content-between">
                        <div className="desc1 d-flex flex-column">
                            <div className="name user-select-none">{track.TrackName}</div>
                        </div>
                    </Col>
                </Row>
            ))}
        </>)
    }

    return (<div className="music-player">
        <div className="play-bar" >
            <div ref={container as MutableRefObject<HTMLDivElement>} style={{ display: "none" }}></div>
            <input type="range" min={0} step={0.1} max={100} value={barValue} onMouseDown={() => { setSkipping(true) }} onMouseUp={() => { endSkip() }} onChange={(e) => { handleSkip(e) }}
                style={{ background: 'linear-gradient(to right, #5a37e8 0%, #5a37e8 ' + barValue.toString() + '%, #454545 ' + barValue.toString() + '%, #454545 100%)' }}
            />
        </div>
        <Row className=" align-items-center mt-2">
            <Col xl={5} className="music-player-content d-flex justify-content-end ">
                <img className="img-fluid icon me-2" src={DefaultBeatThumbnail}></img>
                <div className="info me-2">
                    <div className="name">{track?.TrackName}</div>
                    <div className="tag">{track?.Tags.map((tag, idx) => (
                        <Badge bg="secondary" key={idx}>{tag.Name}</Badge>
                    ))}</div>
                </div>
                <Button><FiShoppingBag className="me-2" />{track?.Price?.toLocaleString('vn-VN', { style: 'currency', currency: 'VND' })}</Button>
            </Col>
            <Col xl={2} className="center d-flex justify-content-center align-items-center">
                {trackId > 1 ? <FiSkipBack onClick={() => { handleSkipBack() }} /> : <FiSkipBack style={{ color: "grey" }} />}
                <div className="play mx-3" onClick={() => { SetPlaying(!isPlaying) }}>
                    {isPlaying ? <FiStopCircle /> : <FiPlayCircle />}
                </div>
                {playlist && trackId < playlist.length ? <FiSkipForward onClick={() => { handleSkipForward() }} /> : <FiSkipForward style={{ color: "grey" }} />}
            </Col>
            <Col xl={5} className="d-flex justify-content-start align-items-center">
                <div className="volumne" onClick={() => { waveSurfer.current?.setMuted(!isMuted); setMuted(!isMuted); }}>
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
                <div className="volumne-bar align-items-center me-4 mt-1">
                    <FormRange min={0} max={100} onChange={(e) => {
                        let value = parseInt(e.target.value)
                        if (isMuted && value < volumne) {
                            waveSurfer.current?.setVolume(value / 100)
                            setVolume(value)
                        }
                        else {
                            setMuted(false)
                            waveSurfer.current?.setMuted(false)
                            waveSurfer.current?.setVolume(value / 100)
                            setVolume(value)
                        }
                    }} className="ms-2" />
                </div>
                <div >
                    <FiMenu className="playlist" onClick={toggle} />
                </div>
            </Col>
        </Row>
        <OffcanvasPlacement name="Playlist" placement="end" isOpen={isOpen} toggle={toggle} children={OffCanvasItem()} />
    </div>)
}

export default MusicPlayer