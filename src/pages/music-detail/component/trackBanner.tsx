import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Image,
  Row,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import defautAudioImage from "../../../../public/default-image/defaultSoundwave.jpg";
import "../index.css";
<<<<<<< Updated upstream
import someRandomHeart from "@/assets/images/heart_1077035.png";
=======
import someRandomHeart from "#/heart_1077035.png";
>>>>>>> Stashed changes
import { useState } from "react";
import { Link } from "react-router-dom";
export default function TrackBanner() {
  const [tags, setTag] = useState(["contry", "pop", "hiphop", "fonk"]);
  const tagList = tags.map((item, _index) => (
    <>
      <Button className="d-inline m-1 bg-secondary "># {item}</Button>
    </>
  ));
  setTag(tags);
  return (
    <>
      <div>
        <Card>
          <img
            className="card-img-top img-fluid bg-light-alt"
            src={defautAudioImage}
            alt="Card image cap"
          />
          <CardHeader>
            <Row className="align-items-center">
              <Col>
                <CardTitle as="h4" className="text-center h3 ">
                  Card title
                </CardTitle>
              </Col>
            </Row>
            <Row>
              <Col className="text-center">beast inside beats</Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Row>
              <Col xs="3" className="p-1 border border-1 border-secondary center-content">
                <img src={someRandomHeart} className="square-icon"></img>
              </Col>
              <Col xs="3" className="p-1 border border-1 border-secondary center-content">
                <img src={someRandomHeart} className="square-icon"></img>
              </Col>
              <Col xs="3" className="p-1 border border-1 border-secondary center-content">
                <img src={someRandomHeart} className="square-icon"></img>
              </Col>
              <Col xs="3" className="p-1 border border-1 border-secondary center-content">
                <img src={someRandomHeart} className="square-icon"></img>
              </Col>
            </Row>
            {/* <p className="card-text text-muted ">
              Some quick example text to build on the card title and make up the bulk of the card's
              content.
            </p>
            <Link to="#" className="btn btn-de-primary btn-sm">
              Go somewhere
            </Link> */}
          </CardBody>
        </Card>
      </div>
      <div className="d-flex flex-column  border border-secondary ">
        <div>
          <Card>
            <CardHeader>
              <Row>
                <Col
                  xs={3}
                  className="border border-secondary d-flex flex-column justify-content-center  "
                >
                  <Image
                    src={defautAudioImage}
                    roundedCircle
                    className="border border-secondary rounded-producer-image"
                    fluid
                  ></Image>
                </Col>
                <Col xs={9} className="border border-secondary ">
                  <Row className="border border-secondary ">
                    <strong className="" style={{ fontSize: "25px" }}>
                      Producer name
                    </strong>
                  </Row>

                  <Row className="border border-secondary ">producer tag</Row>
                </Col>
              </Row>
            </CardHeader>
          </Card>
        </div>
        <hr></hr>
        <div className="border border-secondary ">
          <p>information</p>
          <div
            className="d-flex flex-row  justify-content-between border border-secondary m-1 "
            style={{ height: "30px" }}
          >
            <p className="ps-1 pe-1 ">Published</p>
            <p className="ps-1 pe-1">May 17, 2024</p>
          </div>
          <div
            className="d-flex justify-content-between border border-secondary  m-1"
            style={{ height: "30px" }}
          >
            <p className="ps-1 pe-1">BPM</p>
            <p className="ps-1 pe-1">100</p>
          </div>
          <div
            className="d-flex justify-content-between border border-secondary  m-1"
            style={{ height: "30px" }}
          >
            <p className="ps-1 pe-1">Key</p>
            <p className="ps-1 pe-1">D♭m</p>
          </div>
          <div
            className="d-flex justify-content-between border border-secondary  m-1"
            style={{ height: "30px" }}
          >
            <p className="ps-1 pe-1">Plays</p>
            <p className="ps-1 pe-1">2.3k</p>
          </div>
        </div>

        <hr></hr>

        <div className="border border-secondary ">
          <p>tag</p>
          <div className="">{tagList}</div>
        </div>

        <hr></hr>

        <div className="border border-secondary ">
          <p>about</p>
          <div className="d-flex justify-content-between p-1">
            short descriptoin about the track maybe , im not sure
          </div>
        </div>
        <hr></hr>
        <div className="border border-secondary ">
          <p className="m-2">
            <Link to={""} style={{ textDecoration: "none" }}>
              {" "}
              Report track
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
