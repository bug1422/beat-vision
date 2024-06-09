import { Badge, Button, Card, CardBody, CardHeader, Carousel, CarouselItem, Col, Form, FormControl, Pagination, Row } from "react-bootstrap"
import demoBeat from '/images/products/01.png'
import img1 from '/images/homepage/img1.jpg'
import img2 from '/images/homepage/img2.jpg'
import img3 from '/images/homepage/img3.jpg'
import fpt_logo from '/images/brand-logo/fpt.png'
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AxiosResponse } from "axios"
import { TrackDto } from "@/types/ApplicationTypes/TrackType"
import { HttpClient } from "@/common"
import { PagingResponseDto } from "@/types/ApplicationTypes/PagingResponseType"


const Section1 = () => {
    const navigate = useNavigate()
    const keyword = useRef<string>("")
    const handleSearchBeat = (keyword: string) => {
        navigate("/beats/" + keyword)
    }

    const Title = (title: string) => {
        return (
            <div className="overlay title">
                <div className="home-text text-center">{title}</div>
            </div>
        )
    };
    return (
        <div className="section1">
            <div className="overlay searchbar">
                <div className="icon dripicons-search" onClick={() => {
                    if (keyword.current.length > 0) handleSearchBeat(keyword.current)
                }} />
                <form className="" onSubmit={(e) => {
                    e.preventDefault()
                    if (keyword.current.length > 0) handleSearchBeat(keyword.current)
                }}>
                    <FormControl
                        name="search"
                        type="text"
                        onChange={(e) => {
                            keyword.current = e.target.value
                        }}
                        placeholder="Search name, creator or genre"
                        size="lg" />
                </form>
            </div>
            <Carousel
                fade
                interval={5000}
                controls={false}
                indicators={false}
                id="section#1"
                className="carousel"
                data-bs-ride="carousel"
            >
                <CarouselItem>
                    {Title("Find your audience")}
                    <img src={img1} className="w-100 h-100 img-fluid" alt="img1" />
                </CarouselItem>
                <CarouselItem>
                    {Title("Elevate your content")}
                    <img src={img2} className="w-100 h-100 img-fluid" alt="img2" />
                </CarouselItem>
                <CarouselItem>
                    {Title("Make your impression")}
                    <img src={img3} className="w-100 h-100 img-fluid" alt="img3" />
                </CarouselItem>
            </Carousel>
        </div>
    )
}

const Section2 = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 4;
    const [list, setList] = useState<TrackDto[]>([])
    const lastPage = Math.floor(list.length / itemsPerPage) + 1;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = list.slice(startIndex, endIndex);
    const [error, setError] = useState("")

    const handlePageChange = (pageNumber: number) => {
        if (pageNumber > 0 && pageNumber < lastPage + 1) {
            setCurrentPage(pageNumber);
        }
    }

    const getTracks = async () => {
        setError("")
        try {
            const res: AxiosResponse<PagingResponseDto<TrackDto[]>> =
                await HttpClient.get("/api/ManageTrack/get-range?currentPage=" + (currentPage - 1) + "&amount=" + itemsPerPage)
            if (res?.data) {
                setList(res?.data.Value)
            }
            else setError("Can't get data")
        }
        catch (e: any) {
            console.log(e)
            setError("Internal error. Try again later")
        }
    }
    useEffect(() => {
        getTracks()
    }, [currentPage])

    return (
        <div className="section2 pt-2 pb-4">
            <div className="home-text ps-4 my-3">
                Popular Beats
            </div>
            <div className="content">
                <Row className="justify-content-center">
                    {error != "" ? <div className="text-danger text-center mt-5" style={{fontSize:"52px"}}>{error}</div> :
                        <>
                            {currentItems && currentItems.map((beat, idx) => (
                                <Col xs={4} sm={2} key={idx}>
                                    <Card >
                                        <img src={beat.ProfileBlobUrl ?? demoBeat} className="card-img-top img-fluid bg-light-alt" style={{height: "250px"}} />
                                        <CardHeader style={{height: "80px"}}>
                                            <div>{beat.TrackName}</div>
                                            <div>
                                                {beat.Tags.slice(0, 3).map((tag, ix) => (
                                                    <Badge bg="secondary" key={ix} className="mx-1">{tag.Name}</Badge>
                                                ))}
                                                {beat.Tags.length > 3 ?
                                                    <Badge bg="secondary" className="mx-1">{beat.Tags.length - 3}+...</Badge> : <></>
                                                }
                                            </div>
                                        </CardHeader>
                                    </Card>
                                </Col>
                            ))}
                        </>}
                </Row>
            </div>
            <div className="d-flex justify-content-center">
                <nav aria-label="...">
                    <Pagination size="lg">
                        <div onClick={() => handlePageChange(currentPage - 2)}>
                            {currentPage > 2 ? <div className="pagi-bar mx-1" /> : <div className="pagi-bar-none mx-1" />}
                        </div>
                        <div onClick={() => handlePageChange(currentPage - 1)}>
                            {currentPage > 1 ? <div className="pagi-bar mx-1" /> : <div className="pagi-bar-none mx-1" />}
                        </div>
                        <div onClick={() => handlePageChange(currentPage)}>
                            <div className="pagi-bar mx-1 selected" />
                        </div>
                        <div onClick={() => handlePageChange(currentPage + 1)}>
                            {currentPage <= lastPage - 1 ? <div className="pagi-bar mx-1" /> : <div className="pagi-bar-none mx-1" />}
                        </div>
                        <div onClick={() => handlePageChange(currentPage + 2)}>
                            {currentPage <= lastPage - 2 ? <div className="pagi-bar mx-1" /> : <div className="pagi-bar-none mx-1" />}
                        </div>
                    </Pagination>
                </nav>
            </div>
        </div>
    )
}
const Section3 = () => {
    return (<>
        <Row className="section3 pt-2">
            <Col xl={5} className="left-col d-flex justify-content-end pe-2 align-items-center">
                <div className="home-text">
                    Brough to you by
                </div>
            </Col>
            <Col xl={6} className="right-col ps-3 d-flex justify-content-around align-items-center">
                <div className="sponsor">
                    <img src={fpt_logo} className="img-fluid" />
                </div>
                <div className="sponsor">
                    <img src={fpt_logo} className="img-fluid" />
                </div>
                <div className="sponsor">
                    <img src={fpt_logo} className="img-fluid" />
                </div>
                <div className="sponsor">
                    <img src={fpt_logo} className="img-fluid" />
                </div>
            </Col>
        </Row>
    </>)
}
const Section4 = () => {
    return (<>
        <div className="section4 pt-2">
            <Row>
                <Col xl={4} className="left-col pt-3 mt-3">
                    <div className="home-text">
                        <div>Why choose</div> 
                        <div className="ms-5 text-info">Beat Vision</div> 
                    </div>
                </Col>
                <Col />
                <Col xl={6} className="right-col d-flex flex-column ">
                    <div className="reason my-3">
                        <div className="home-text">Fast Delivery</div>
                    </div>
                    <div className="reason my-3">
                        <div className="home-text">Quality Beats</div>
                    </div>
                    <div className="reason my-3">
                        <div className="home-text">Long-term Support</div>
                    </div>
                </Col>
            </Row>
        </div>
    </>)
}
// const Section5 = () => {
//     return (
//         <div className="section5 pt-2 pb-4">
//             <div className="home-text ps-4 my-3">
//                 Popular Artist
//             </div>
//             <div className="content pt-5">
//                 <Row className="d-flex justify-content-center">
//                     {artists.slice(0, 5).map((artist, idx) => (
//                         <Col className="artist" key={idx}>
//                             <img src={demoBeat} alt="user" className="img rounded-circle thumb-xl" />
//                             <div className="home-text text-end mt-2 me-5">{artist.author}</div>
//                         </Col>
//                     ))}
//                 </Row>
//             </div>
//         </div>
//     )
// }
const Section6 = () => {
    return (<>
        <div className="section6">
            <Row className="content align-items-center">
                <Col xl={6}>
                    <Card className="left-card">
                        <CardBody>
                            <div className="home-text ps-5">FAQ</div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xl={6}>
                    <Card className="right-card">
                        <CardBody>
                            <div className="pb-2">
                                <div className="home-text title ">Don't miss a Beat!</div>
                                <div className="description">Want to learn more about BeatVision? Enter your name and email address below.</div>
                            </div>
                            <Form>
                                <Form.Group className="my-3">
                                    <Form.Control type="text" placeholder="First Name" />
                                </Form.Group>
                                <Form.Group className="my-3">
                                    <Form.Control type="text" placeholder="Email" />
                                </Form.Group>
                                <Button type="submit" className="me-1 submit">
                                    Subscribe
                                </Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    </>)
}
const SectionList = [
    Section1,
    Section2,
    Section3,
    Section4,
    Section6
]
export { SectionList }