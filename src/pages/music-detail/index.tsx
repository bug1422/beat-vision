import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
import { Col, Container, Row } from "react-bootstrap";
import TrackBanner from "./component/trackBanner";
import TrackPlay from "./component/trackPlay";
import TrackDetail from "./component/trackDetails";
import { TrackComments } from "./component/trackComment";
import TrackRelated from "./component/trackRelated";
import Layout_NoSidebar from "@/layout/MyCustomLayout/Layout_NoSidebar";
// import { TrackCommentSection } from "./component/trackComment";

export default function MusicDetail() {
  return (
    <>
      <Container className="my-1">
          <Row className="border border-primary mt4 justify-content-center  ">
            <Col lg="3" className="border border-secondary p-2 m-2 ">
              <TrackBanner></TrackBanner>
            </Col>
            <Col lg="8" className="border border-secondary m-2 ">
              <div className="p-1">
                <TrackPlay></TrackPlay>
              </div>
              <div className="border m-2 ">
                <TrackDetail></TrackDetail>
              </div>
              <div className="border m-2 overflow-scroll " style={{ maxHeight: "800px" }}>
                <TrackComments />
              </div>
              <div className="border m-2 ">
                <TrackRelated />
              </div>
            </Col>
          </Row>
        </Container>
    </>
  );
}
