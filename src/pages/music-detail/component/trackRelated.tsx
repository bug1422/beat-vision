import { useState } from "react";
import { Card, CardHeader, Row, Col, CardBody, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import defautAudioImage from "../../../../public/default-image/defaultSoundwave.jpg";

interface TrackMetaData {
  price: number;
  isFree: boolean;
  name: string;
  length: number;
  imageUrl?: string;
}

interface TrackCardProps {
  trackData: TrackMetaData;
}
const MockTrackMetaDataFree: TrackMetaData = {
  price: 0,
  isFree: true,
  name: "free track",
  length: 100,
  imageUrl: defautAudioImage,
};
const MockTrackMetaDataPaid: TrackMetaData = {
  price: 50000,
  isFree: false,
  name: "paid track",
  length: 130,
  imageUrl: defautAudioImage,
};
const MockRelatedTrack: TrackMetaData[] = [
  MockTrackMetaDataFree,
  MockTrackMetaDataPaid,
  MockTrackMetaDataFree,
  MockTrackMetaDataFree,
  MockTrackMetaDataPaid,
  MockTrackMetaDataPaid,
  MockTrackMetaDataFree,
  MockTrackMetaDataFree,
  MockTrackMetaDataPaid,
  MockTrackMetaDataPaid,
];
export default function TrackRelated() {
  const [trackListRelated, setTrackListRelated] = useState(MockRelatedTrack);
  //setTrackListRelated(MockRelatedTrack);
  return (
    <>
      <h4>Related track</h4>
      <div className="d-flex flex-row flex-nowrap " style={{ overflowX: "scroll" }}>
        {trackListRelated.map((track) => {
          return (
            <>
              <div
                className="d-inline  p-2"
                style={{ flexBasis: "25%", flexGrow: 0, flexShrink: 0, overflowY: "hidden" }}
              >
                <TrackCard trackData={track} />
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

const TrackCard = ({ trackData }: TrackCardProps) => {
  const [trackMetaData] = useState(trackData);
  return (
    <>
      <Card>
        <img
          className="card-img-top img-fluid bg-light-alt"
          src={trackMetaData.imageUrl}
          alt="Card image cap"
        />
        <CardHeader>
          <Row className="align-items-center">
            <Col xs="auto" className="col-auto">
              {trackMetaData.isFree ? (
                <Badge bg="success">Free</Badge>
              ) : (
                <Badge bg="warning">{trackMetaData.price}</Badge>
              )}
            </Col>
            <Col xs="auto" className="col-auto">
              <span className="badge badge-outline-light">{trackMetaData.length}s</span>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <p className="card-text text-muted ">{trackMetaData.name}</p>
          <Link to="#" className="btn btn-de-primary btn-sm">
            Go to track
          </Link>
        </CardBody>
      </Card>
    </>
  );
};
