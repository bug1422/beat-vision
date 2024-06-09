import { TrackDto } from "@/types/ApplicationTypes/TrackType"
import { Suspense, lazy, useEffect, useState } from "react"
import { Badge, Button, Col, FormControl, Row } from "react-bootstrap"
import { Link, useNavigate, useParams } from "react-router-dom"
import DefaultBeatThumbnail from "/default-image/defaultSoundwave.jpg"
import { FiPlay, FiPlayCircle, FiShoppingBag } from "react-icons/fi"
import { useAuthContext } from "@/context"
import { PageMetaData } from "@/components"
import { TagDto } from "@/types/ApplicationTypes/TagType"
import { AxiosResponse } from "axios"
import { HttpClient } from "@/common"
import { PagingResponseDto } from "@/types/ApplicationTypes/PagingResponseType"
import { toast } from "sonner"
const MusicPlayer = lazy(() => import("@/components/MusicPlayer"))

export const Tag = (props: { className?: string, name: string }) => {
    const { className, name } = props
    return (
        <Badge className={className} bg="secondary" style={{ height: "fit-content" }}>
            {name}
        </Badge>
    )
}


const Search = () => {
    const { user } = useAuthContext()
    const navigate = useNavigate()

    const [tags, setTags] = useState<TagDto[]>([])
    const [filtered, setFiltered] = useState<TagDto[]>([])
    const [selectedTags, setSelectedTags] = useState<TagDto[]>([])
    const [key, setKey] = useState("")
    let { keyword } = useParams()

    const [searchTagValue, setSearchTagValue] = useState("")

    const [list, setList] = useState<TrackDto[]>([])
    const [tracks, setTracks] = useState<TrackDto[]>([])

    const itemsPerPage = 5
    const [currentPage, setCurrentPage] = useState<number>(1)

    const [error1, setError1] = useState("")
    const [error2, setError2] = useState("")
    const [selected, setSelected] = useState<TrackDto>()

    const fetchTags = async () => {
        setError2("")
        try {
            const res: AxiosResponse<TagDto[]> =
                await HttpClient.get("/api/ManageTag")
            if (res?.data) {
                setTags(res?.data)
                setFiltered(res?.data)
                console.log(filtered)
            }
            else setError2("Can't get data")
        }
        catch (e: any) {
            console.log(e)
            setError2("Internal error")
        }
    }

    const AddPlayCount = async (trackId: number) => {
        try {
          const res: AxiosResponse<Blob> =
            await HttpClient.get("/api/ManageTrack/plus-play-count", {
              params: {
                trackId: trackId
              }
            })
            if(res){
                
            }
        }
        catch (e: any) {
          console.log(e)
        }
      }

    const fetchTracks = async (curr: number) => {
        setError1("")
        try {
            const res: AxiosResponse<PagingResponseDto<TrackDto[]>> =
                await HttpClient.get("/api/ManageTrack/get-range?currentPage=" + (curr - 1) + "&amount=" + itemsPerPage)
            if (res?.data) {
                if (res?.data.Value.length > 0) {
                    const tempt = res?.data.Value.filter(p => p.IsPublished)
                    setList([...list, ...tempt])
                    console.log(list)
                    return true
                }
                else {
                    return false
                }
            }
            else setError1("Can't get data")
        }
        catch (e: any) {
            console.log(e)
            setError1("Internal error. Try again later")
        }
    }

    useEffect(() => {
        fetchTracks(currentPage)
        fetchTags()
        console.log(list)
        setKey(keyword ?? "")
    }, [keyword])

    useEffect(() => {
        const tempt = tags.filter(p => p.Name.toLowerCase().includes(searchTagValue))
        setFiltered([...tempt])
    }, [searchTagValue])

    useEffect(() => {
        console.log(key)
        if (key == "") {
            setTracks([...list])
            setSelectedTags([])
            console.log(list)
            console.log(tracks)
        }
        else {
            const tempt = tags.slice().filter(p => p.Name.toLowerCase().includes(key.toLowerCase()))
            setSelectedTags([...tempt])
            console.log(selectedTags)
        }
    }, [list, key])

    useEffect(() => {
        let filtered = [...list]
        filtered = filtered.filter(p => {
            if (selectedTags.length == 0) return true
            for (let i = 0; i < p.Tags.length; i++) {
                if (selectedTags.find(k => k.Name == p.Tags.at(i)?.Name)) return true
            }
            return false
        })
        let tempt: TrackDto[] = [...filtered]
        setTracks([...tempt])
    }, [selectedTags, currentPage])


    const HandleLoadMore = async () => {
        const res = await fetchTracks(currentPage + 1)
        if (res) setCurrentPage(currentPage + 1)
        else {
            toast.error("No more track", { position: "bottom-right", duration: 2000 })
        }
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

    return (
        <div className="search-page">
            <PageMetaData title="Search" />
            <Row className="search d-flex justify-content-center">
                <Col className="d-flex justify-content-end border-end left-col me-2" sm={3} xl={2}>
                    <div className="tags text-end">
                        Tags
                        <div>
                            {error2 != "" ?
                                <div className="text-danger error2">
                                    {error2}
                                </div> :
                                <div className="d-flex flex-column">
                                    <FormControl name="tagSearch" placeholder="find a tag" onChange={(e) => { setSearchTagValue(e.target.value.toLowerCase()) }} />
                                    <div className="mt-3 d-flex flex-wrap">
                                        {filtered && filtered.length > 0 ? <>
                                            {filtered.map((tag, idx) => (
                                                <div key={idx} onClick={() => { if (!selectedTags.includes(tag)) setSelectedTags([...selectedTags, tag]) }}>
                                                    <Tag className={"mx-2 my-1 tag-search"} name={tag.Name} key={idx} />
                                                </div>
                                            ))}
                                        </> : <div>No tags found</div>}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>

                </Col>
                <Col xl={6} className="px-3 mt-5 right-col  mb-4">
                    <div >
                        <div className="search-title fw-bold">
                            Tracks
                        </div>
                        <div className="search-result-title">
                            Filtering:
                            <div className="mt-3 d-flex flex-wrap">
                                {
                                    selectedTags.map((tag, idx) =>
                                        <div onClick={() => { const filtered = selectedTags.filter(p => p.Name != tag.Name); setSelectedTags(filtered); }}>
                                            <Tag className="mx-2 my-1 tag-search" name={tag.Name} key={idx} />
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className="my-2 search-section d-flex align-items-center">
                    </div>
                    <div className="search-container">
                        {error1 != ""? <>
                            {(tracks && tracks?.length > 0) ?
                            <div className="search-body pt-2 d-flex flex-column">
                                {tracks.map((track, index) => (
                                    <Row className="track align-items-center" key={index} onClick={() => { setSelected(track); AddPlayCount(track.Id)}} >
                                        <Col xl={1} className="d-flex">
                                            <div className="rank">{index + 1} </div>
                                            <FiPlayCircle className="play" />
                                        </Col>
                                        <Col xl={1}>
                                            <img className="img-fluid icon" src={track.ProfileBlobUrl ?? DefaultBeatThumbnail}></img>
                                        </Col>
                                        <Col className="d-flex justify-content-between">
                                            <div className="desc1 d-flex flex-column">
                                                <Link to={"/music-detail/detail/" + track.Id} className="name">{track.TrackName}</Link>
                                                <div className="mt-1 producer"><FiPlay />{track.PlayCount}</div>
                                            </div>
                                            <div className="desc2 d-flex justify-content-end align-items-center">
                                                {
                                                    track.Tags.map((tag, idx) => <Tag className={`py-2 me-2 ${(selectedTags.length > 0 && selectedTags.find(p => p.Name == tag.Name)) ? "highlighted" : ""}`} name={tag.Name} key={idx} />)
                                                }
                                                <Button onClick={() => {
                                                    if (user) {
                                                        AddToCart(track.Id)
                                                    } else {
                                                        navigate("/auth/login")
                                                    }
                                                }}><FiShoppingBag className="me-2" />{track.Price != null ? track.Price > 0 ? track.Price?.toLocaleString('vn-VN', { style: 'currency', currency: 'VND' }) : "Free" : "Null"}</Button>
                                            </div>
                                        </Col>
                                    </Row>
                                ))}
                                <div className="btn btn-primary" onClick={() => { HandleLoadMore() }}>Load more</div>
                            </div> :
                            <div className="search-empty text-center py-5">
                                <div className="title">
                                    No beats found :{'('}
                                </div>
                                <div>
                                    {/* set popular beat here */}
                                </div>
                            </div>
                        }
                        </> : <div>Can't get data</div>}
                    </div>
                </Col>
            </Row>
            {selected != undefined ?
                <Suspense fallback={<div />}>
                    <MusicPlayer tracks={tracks} trackId={selected.Id} />
                </Suspense>
                : <></>
            }
        </div>
    )
}
export default Search