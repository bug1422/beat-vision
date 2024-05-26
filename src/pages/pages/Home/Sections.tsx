import { Badge, Card, CardHeader, Carousel, CarouselItem, Col, FormControl, Pagination, Row } from "react-bootstrap"
import demoBeat from '/images/products/01.png'
import img1 from '/images/homepage/img1.jpg'
import img2 from '/images/homepage/img2.jpg'
import img3 from '/images/homepage/img3.jpg'
import { beats } from "@/testing/FetchFakeData"
import { useState } from "react"

const Section1 = () => {

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
                <div className="icon dripicons-search" />
                <FormControl
                    type="text"
                    placeholder="Search name, creator or genre"
                    size="lg" />
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
    const [list, _] = useState(beats)
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 4;
    const lastPage = Math.floor(list.length / itemsPerPage) + 1;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = list.slice(startIndex, endIndex);

    const handlePageChange = (pageNumber: number) => {
        if (pageNumber > 0 && pageNumber < lastPage + 1) {
            setCurrentPage(pageNumber);
        }
    }

    return (
        <div className="section2 pt-2 pb-4">
            <div className="home-text ps-4 my-3">
                Popular Beats
            </div>
            <div className="content">
                <Row className="justify-content-center">
                    {currentItems.map((beat, _idx) => (
                        <Col xs={2}>
                            <Card>
                                <img src={demoBeat} className="card-img-top img-fluid bg-light-alt" />
                                <CardHeader>
                                    <div>{beat.title}</div>
                                    <div>{beat.author}</div>
                                    <div>
                                        {beat.tag.slice(0, 3).map((tag) => (
                                            <Badge bg="secondary" className="mx-1">{tag}</Badge>
                                        ))}
                                        {beat.tag.length > 3 ?
                                            <Badge bg="secondary" className="mx-1">{beat.tag.length - 3}+...</Badge> : <></>
                                        }
                                    </div>
                                </CardHeader>
                            </Card>
                        </Col>
                    ))}
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
                    <img src={demoBeat} className="img-fluid"/>
                </div>
                <div className="sponsor">
                    <img src={demoBeat} className="img-fluid"/>
                </div>
                <div className="sponsor">
                    <img src={demoBeat} className="img-fluid"/>
                </div>
                <div className="sponsor">
                    <img src={demoBeat} className="img-fluid"/>
                </div>
            </Col>
        </Row>
    </>)
}
const Section4 = () => {
    return (<>
        <div className="section4 pt-2">
            <Row>
                <Col xl={4} className="left-col py-3 my-3">
                    <div className="home-text">
                        Why choose beat vision
                    </div>
                </Col>
                <Col />
                <Col xl={6} className="right-col d-flex flex-column ">
                    <div className="reason my-3">
                        <div className="home-text">Reason A</div>
                    </div>
                    <div className="reason my-3">
                        <div className="home-text">Reason B</div>
                    </div>
                    <div className="reason my-3">
                        <div className="home-text">Reason C</div>
                    </div>
                </Col>
            </Row>
        </div>
    </>)
}
const Section5 = () => {
    return (<>
        <div className="section5 pt-2">

        </div>
    </>)
}
const Section6 = () => {
    return (<>
        <div className="section6 py-2 d-flex justify-content-center">
            <Card>
                <Row className="text-center">
                    <Col>Left</Col>
                    <Col>Right</Col>
                </Row>
            </Card>
        </div>
    </>)
}
const SectionList =[
    Section1,
    Section2,
    Section3,
    Section4,
    Section5,
    Section6
]
export { SectionList }