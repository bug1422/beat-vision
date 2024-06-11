import { TrackDto } from "@/types/ApplicationTypes/TrackType"
import { Badge, Button, Col, Row } from "react-bootstrap"
import DefaultBeatThumbnail from "/default-image/defaultSoundwave.jpg"
import { FiMenu, FiPlayCircle, FiShoppingBag, FiSkipBack, FiSkipForward, FiStopCircle, FiVolume, FiVolume1, FiVolume2, FiVolumeX } from "react-icons/fi"
import { MutableRefObject, useCallback, useEffect, useRef, useState } from "react"
import FormRange from "react-bootstrap/esm/FormRange"
import WaveSurfer from "wavesurfer.js"
import OffcanvasPlacement from "./OffCanvas"
import { Link, useNavigate } from "react-router-dom"
import { useAuthContext } from "@/context"
import { toast } from "sonner"
import { AxiosResponse } from "axios"
import { HttpClient } from "@/common"

const MusicPlayer = (props: { trackId: number, tracks: TrackDto[] }) => {
    const { user } = useAuthContext()
    const navigate = useNavigate()
    function useToggle(
        initialState: boolean = false
    ): [boolean, () => void, () => void, () => void] {
        const [isOpen, setIsOpen] = useState(initialState)

        const show = useCallback(() => setIsOpen(true), [])
        const hide = useCallback(() => setIsOpen(false), [])
        const toggle = useCallback(() => setIsOpen(!isOpen), [isOpen])

        return [isOpen, toggle, show, hide]
    }
    const [count, setCount] = useState(0)
    const [trackId, setTrackId] = useState<number>(props.trackId)
    const [track, setTrack] = useState<TrackDto | undefined>()
    const [fileURL, setFileURL] = useState("")

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

    useEffect(() => {
        setFileURL("")
        setTrack(undefined)
        fetchData(trackId)
    }, [trackId])
    useEffect(() => {
        if (fileURL != "" && props.tracks) {
            const tempt = props.tracks.filter(p => p.Id == trackId).at(0)
            setTrack(tempt)
            console.log(track)
        }
    }, [fileURL])

    const fetchData = async (id: number) => {
        try {
            const res: AxiosResponse<Blob> = await HttpClient.get("/api/ManageTrack/get-public-trackfile", {
                params: {
                    trackId: id
                },
                headers: {
                    "Content-Type": "audio/mpeg",
                },
                responseType: "blob"
            })
            if (res?.data) {
                setFileURL(URL.createObjectURL(res?.data))
            }
        }
        catch (e: any) {
            console.log(e)
            if (e.response.status = 500) {
                toast.error("Failed to get the song", { position: "bottom-right", duration: 2000 })
            }
            else {
                if (count > 3) {
                    setCount(0)
                    setTrackId(1)
                }
                else {
                    setTrackId(trackId + 1)
                    setCount(count + 1)
                }
            }
        }
    }

    useEffect(() => {
        setBarValue(0)
        setSkipping(false)
        setPlayPercent(0)
        SetPlaying(false)
        if (trackId != undefined && track != undefined) {
            if (fileURL != "") {
                console.log(fileURL)
                if (container.current) {
                    // Ensure the previous instance is destroyed before creating a new one
                    if (waveSurfer.current) {
                        waveSurfer.current.destroy();
                    }
                    waveSurfer.current = WaveSurfer.create({
                        container: container.current,
                        url: fileURL
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
        }
    }, [track]);
    useEffect(() => {
        if (playPercent == 100) {
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
        const tracks = props.tracks
        const pos = tracks.findIndex(p => p.Id == trackId)
        if (tracks && pos > 0) setTrackId(trackId - 1)
        console.log(trackId)
    }

    function handleSkipForward() {
        const tracks = props.tracks
        console.log(trackId)
        const pos = tracks.findIndex(p => p.Id == trackId)
        console.log(pos)
        if (tracks && (pos >= 0 && pos < tracks.length)) setTrackId(trackId + 1)
    }

    const OffCanvasItem = () => {
        return (<>
            {props.tracks?.map((track, index) => (
                <Row className="track align-items-center border-bottom py-3" key={index} onClick={() => { setTrackId(track.Id) }} >
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

    const AddToCart = async (trackId: number) => {
        try {
            const userId = user?.userid
            const res = await HttpClient.post("/api/ManageOrder/add-cart-item", {
                UserId: userId,
                ItemId: trackId,
            }, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
            if (res?.status == 200) {
                toast.success("Added to cart!", { position: "bottom-right", duration: 2000 })
            }
        } catch (e: any) {
            if (e?.response.data.ErrorMessage) {
                toast.info(e?.response.data.ErrorMessage, { position: "bottom-right", duration: 2000 })
            }
            console.log(e)
        }
    }

    return (<div className="music-player">
        <div className="play-bar" >
            <div ref={container as MutableRefObject<HTMLDivElement>} style={{ display: "none" }}></div>
            <input type="range" min={0} step={0.1} max={100} value={barValue} onMouseDown={() => { setSkipping(true) }} onMouseUp={() => { endSkip() }} onChange={(e) => { handleSkip(e) }}
                style={{ background: 'linear-gradient(to right, #ffb310 0%, #ffb310 ' + barValue.toString() + '%, #454545 ' + barValue.toString() + '%, #454545 100%)' }}
            />
        </div>
        <Row className=" align-items-center my-2">
            <Col xl={5} className="music-player-content d-flex justify-content-end ">
                <img className="img-fluid icon me-2" src={track?.ProfileBlobUrl ?? DefaultBeatThumbnail}></img>
                <div>
                    <div className="name pt-1">
                        <Link to={"/music-detail/detail/" + track?.Id} className="info me-2">
                            <div className="text">{track?.TrackName}</div>
                        </Link>
                    </div>
                    <div className="tag">{track?.Tags.map((tag, idx) => (
                        <Badge bg="secondary" key={idx}>{tag.Name}</Badge>
                    ))}</div>
                </div>
                <div className="w-10 my-1">
                    <Button variant="warning" className="buy d-flex align-items-center" onClick={() => {
                        if (user) {
                            if (track) AddToCart(track.Id)
                            else toast.error("Can't get track", { position: "bottom-right", duration: 2000 })
                        } else {
                            navigate("/auth/login")
                        }
                    }}><FiShoppingBag className="me-2" />{track?.Price != null ? track.Price > 0 ? track.Price?.toLocaleString('vn-VN', { style: 'currency', currency: 'VND' }) : "Free" : "Null"}</Button>
                </div>
            </Col>
            <Col xl={2} className="center d-flex justify-content-center align-items-center">
                {props.tracks && props.tracks.findIndex(p => p.Id == trackId) > 0 ? <FiSkipBack onClick={() => { handleSkipBack() }} /> : <FiSkipBack style={{ color: "grey" }} />}
                <div className="play mx-3" onClick={() => { SetPlaying(!isPlaying) }}>
                    {isPlaying ? <FiStopCircle /> : <FiPlayCircle />}
                </div>
                {props.tracks && (props.tracks.findIndex(p => p.Id == trackId) != props.tracks.length - 1) ? <FiSkipForward onClick={() => { handleSkipForward() }} /> : <FiSkipForward style={{ color: "grey" }} />}
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
                    <input type="range" min={0} step={1} max={100} 
                        style={{
                            background: 'linear-gradient(to right, #ffb310 0%, #ffb310 ' + volumne.toString() + '%, #454545 ' + volumne.toString() + '%, #454545 100%)'
                        }}
                        onChange={(e) => {
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