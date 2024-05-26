import { Col, Row } from "react-bootstrap";
import { ProducerEarningReport } from "./component/ProducerEarningReport";

export default function ProducerSale() {
  return (
    <>
      <div>
        <Row>
          <Col xs={10}>
            <ProducerEarningReport />
          </Col>
        </Row>
      </div>
    </>
  );
}
