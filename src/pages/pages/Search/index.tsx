import { TrackDto } from "@/types/ApplicationTypes/TrackType"
import { Suspense, lazy, useEffect, useState } from "react"
import { Badge, Button, CardBody, CardHeader, Col, FormControl, Row } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import { FetchAllTracks, FetchPopularTracks } from "./getBeat"
import DefaultBeatThumbnail from "/default-image/defaultSoundwave.jpg"
import { FiPlay, FiPlayCircle, FiShoppingBag } from "react-icons/fi"
const MusicPlayer = lazy(() => import("@/components/MusicPlayer"))

const Tag = (props: { className?: string, name: string }) => {
    const { className, name } = props
    return (
        <Badge className={className} bg="secondary" style={{ height: "fit-content" }}>
            {name}
        </Badge>
    )
}


const Search = () => {
    const [tags, setTags] = useState()
    const navigate = useNavigate()
    const { keyword } = useParams()
    const [searchValue, setSearchValue] = useState(keyword ?? "")

    const [tracks, setTracks] = useState<TrackDto[]>(FetchAllTracks())
    const [selected, setSelected] = useState<TrackDto>()
    useEffect(() => {
        setSearchValue(keyword ?? "")
    }, [keyword])

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const input = event.currentTarget.elements[0] as HTMLInputElement
        if (input.value.length > 0) {
            setSearchValue(input.value)
            navigate("/beats/" + input.value)
        }
    }

    return (
        <div className="search-page">
            <Row className="search d-flex justify-content-center">
                <Col className="d-flex justify-content-end border-end left-col me-2" sm={3} xl={2}>
                    <div className="tags">
                        Tags
                    </div>
                </Col>
                <Col xl={6} className="px-3 mt-5 right-col  mb-4">
                    <div >
                        <div className="search-title fw-bold">
                            Tracks
                        </div>
                        <div className="search-result-title">
                            <Tag name={searchValue} />
                        </div>
                    </div>
                    <div className="my-2 search-section d-flex align-items-center">
                        <form className="search-bar" onSubmit={handleSearch}>
                            <FormControl
                                name="Search"
                                placeholder="Search name, creator or genre"
                            />
                        </form>
                        <i className="icon dripicons-search search-icon pt-1" />
                    </div>
                    <div className="search-container">
                        {(tracks && tracks?.length > 0) ?
                            <div className="search-body pt-2 d-flex flex-column">
                                {tracks.map((track, index) => (
                                    <Row className="track align-items-center" key={index} onClick={() => { setSelected(track); }} >
                                        <Col xl={1} className="d-flex">
                                            <div className="rank">{index + 1} </div>
                                            <FiPlayCircle className="play" />
                                        </Col>
                                        <Col xl={1}>
                                            <img className="img-fluid icon" src={DefaultBeatThumbnail}></img>
                                        </Col>
                                        <Col className="d-flex justify-content-between">
                                            <div className="desc1 d-flex flex-column">
                                                <div className="name">{track.TrackName}</div>
                                                <div className="mt-1 producer"><FiPlay />{track.PlayCount}</div>
                                            </div>
                                            <div className="desc2 d-flex justify-content-end align-items-center">
                                                <Tag className="py-2 me-2" name="Trap" />
                                                <Tag className="py-2 me-2" name="Hard Beat" />
                                                <Button><FiShoppingBag className="me-2" />{track.Price?.toLocaleString('vn-VN', { style: 'currency', currency: 'VND' })}</Button>
                                            </div>
                                        </Col>
                                    </Row>
                                ))}
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
                    </div>
                </Col>
            </Row>
            {selected != undefined ?
                <Suspense fallback={<div/>}>
                    <MusicPlayer trackId={selected.Id} />
                </Suspense>
                : <></>
            }
        </div>
    )
}
export default Search