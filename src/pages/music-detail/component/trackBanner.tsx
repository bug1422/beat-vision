import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import defautAudioImage from "../../../../public/default-image/defaultSoundwave.jpg";
import "../index.css";
import { TrackDto } from "@/types/ApplicationTypes/TrackType";
import { Tag } from "@/pages/pages/Search";
import { useState } from "react";

export default function TrackBanner(props: { track: TrackDto }) {
  const [track, _setTrack] = useState<TrackDto>(props.track)

  return (
    <>
      <Card>
        <img
          className=""
          src={track.ProfileBlobUrl ?? defautAudioImage}
          alt="Card image cap"
        />
        <Row className="align-items-center mt-2">
          <Col>
            <CardTitle as="h4" className="text-center h3 ">
              {track.TrackName}
            </CardTitle>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">

          </Col>
        </Row>
        <CardBody>
          <div className="d-flex flex-column">
            {/* <div>
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
            </div> */}
            <hr></hr>
            <div>
              <p className="fs-3">Information</p>
              <div
                className="d-flex flex-row  justify-content-between m-1 "
                style={{ height: "30px" }}
              >
                <p className="ps-1 pe-1 ">Published</p>
                <p className="ps-1 pe-1">{new Date(track.PublishDateTime ?? "").toLocaleDateString("vn-VN")}</p>
              </div>
              <div
                className="d-flex justify-content-between  m-1"
                style={{ height: "30px" }}
              >
                <p className="ps-1 pe-1">Duration</p>
                <p className="ps-1 pe-1">{(track.AudioLenghtSeconds / 60).toPrecision(1) + ":" + (track.AudioLenghtSeconds % 60).toPrecision(2)}</p>
              </div>
              <div
                className="d-flex justify-content-between  m-1"
                style={{ height: "30px" }}
              >
                <p className="ps-1 pe-1">Play Count</p>
                <p className="ps-1 pe-1">{track.PlayCount}</p>
              </div>
              {/* <div
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
              </div> */}
            </div>

            <Card className="">
              <CardHeader>
                <CardTitle>Tag</CardTitle>
              </CardHeader>
              <CardBody className="">{
                track.Tags.map((tag, idx) => <Tag className="py-2 me-2" name={tag.Name} key={idx} />)
              }</CardBody>
            </Card>
            {/* 
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
            </div> */}
          </div>
        </CardBody>


      </Card >
    </>
  );
}
