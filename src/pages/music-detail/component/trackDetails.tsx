import { Card, Row, Button, CardBody, Col } from "react-bootstrap";
import appLogo from "/logo-sm-dark.png";
import { useState } from "react";

type License = {
  name: string;
  isWavSupport: boolean;
  isMp3Support: boolean;
  defaultPrice: number;
  currentPrice: number;
  streamLimit: number;
  distributionLimit: number;
  pdfBlobPath: string;
};
const licensesFake: Array<License> = [
  {
    name: "free",
    isMp3Support: true,
    isWavSupport: true,
    currentPrice: 0,
    defaultPrice: 0,
    distributionLimit: -1,
    streamLimit: -1,
    pdfBlobPath: "https://beatvision/document/termandserviceforfreelicense",
  },
  {
    name: "Paid",
    isMp3Support: true,
    isWavSupport: true,
    currentPrice: 50000,
    defaultPrice: 30000,
    distributionLimit: 300,
    streamLimit: -1,
    pdfBlobPath: "https://beatvision/document/termandserviceforfreelicense",
  },
];
export default function TrackDetail() {
  const [isPaid, _setIsPaid] = useState(false);
  const [licenses, _setLicenses] = useState<Array<License>>(licensesFake);
  return (
    <>
      <Row>
        <div className="d-flex flex-row justify-content-between ">
          <p style={{ fontSize: "2rem" }}>Licensing</p>
          <div className="d-flex flex-row align-items-center  ">
            {isPaid ? (
              <>
                <span className="me-1">
                  <p className="m-0">total:</p>
                  <p className="m-0">
                    <strong>25.000vnd</strong>
                  </p>
                </span>
                <Button>Add To Card</Button>
              </>
            ) : (
              <>
                <span className="me-1">
                  <p className="m-0">total:</p>
                  <p className="m-0">
                    <strong>free</strong>
                  </p>
                </span>
                <Button>Add To Card</Button>
              </>
            )}
          </div>
        </div>
        <hr></hr>
        <div>
          <Row>
            {licenses.map((licence, _inx) => {
              return (
                <>
                  <Col xs={4}>
                    <Card>
                      <img src={appLogo} className="card-img-top bg-light-alt" alt="..." />
                      <CardBody>
                        <h5 className="card-title">{licence.name}</h5>
                        <p className="card-text">This is a license description</p>
                        <hr></hr>
                        <div className="d-flex flex-column ">
                          {licence.isMp3Support ? <p className="m-0"> mp3 Supported</p> : <></>}
                          {licence.isWavSupport ? <p className="m-0"> wav Supported</p> : <></>}
                          <p className="m-0">default price: {licence.defaultPrice}</p>
                          <p className="m-0">current price: {licence.currentPrice}</p>
                          {licence.streamLimit < 0 ? (
                            <p className="m-0"> stream limit: unlimit</p>
                          ) : (
                            <p className="m-0"> stream limit: {licence.streamLimit}</p>
                          )}
                          {licence.distributionLimit < 0 ? (
                            <p className="m-0"> distribution limit: unlimit</p>
                          ) : (
                            <p className="m-0"> distribution limit: {licence.distributionLimit}</p>
                          )}
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </>
              );
            })}
          </Row>
        </div>
      </Row>
      <Row>
        <div>
          <p style={{ fontSize: "2rem" }}>usage term</p>
          <hr></hr>
        </div>
        <div className="m-1">
          This is a longer card with supporting text below as a natural lead-in to additional
          content. This content is a little bit longer. This is a longer card with supporting text
          below as a natural lead-in to additional content. This content is a little bit longer.
        </div>
      </Row>
      <Row></Row>
    </>
  );
}
