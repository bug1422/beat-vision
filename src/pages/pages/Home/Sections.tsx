import { Card, CardBody, Carousel, CarouselCaption, CarouselItem, FormControl } from "react-bootstrap"

import img1 from '@/assets/images/homepage/img1.jpg'
import img2 from '@/assets/images/homepage/img2.jpg'
import img3 from '@/assets/images/homepage/img3.jpg'

const Section1 = () => {

    const Title = (title: string) => {
        return(
            <div className="overlay title">
                <div className="text text-center">{title}</div>
            </div>
        )
    };
    return(
        <div className="section1">
            <div className="overlay searchbar">
                <div className="icon dripicons-search"/>
                <FormControl
                    type="text"
                    placeholder="Search name, creator or genre"
                    size="lg"/>
            </div>
                <Carousel
                    fade
                    interval={5000}
                    controls={false}
                    indicators={false}
                    id="carouselExampleSlidesOnly"
                    className="carousel slide"
                    data-bs-ride="carousel"
                >
                    
                    <CarouselItem>
                        {Title("Find your audience")}
                        <img src={img1} className="w-100 h-100 img-fluid" alt="img1"/>
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
    return (
        <div className="section2">
        </div>
    )
}

export { Section1, Section2 }