import { Card, Row, Button, CardBody, Col, Dropdown, DropdownToggle, DropdownMenu } from "react-bootstrap";
import appLogo from "/logo-sm-dark.png";
import { useEffect, useState } from "react";
import { TrackLicenseDto } from "@/types/ApplicationTypes/TrackLicenseType";
import { AxiosResponse } from "axios";
import { HttpClient } from "@/common";


export default function TrackDetail(props: { licenses: TrackLicenseDto[] }) {
  const [licenses, setLicenses] = useState<TrackLicenseDto[]>(props.licenses)

  return (
    <>
      <Row>
        <div className="d-flex flex-row justify-content-between track-detail">
          <p className="title">Licensing</p>
        </div>
        <div>
          <Row>
            {licenses.map((license, _inx) => {
              return (
                <Col xs={4} key={_inx}>
                  <Card>
                    <CardBody>
                      <h5 className="card-title">{license.LicenceName}</h5>
                      <hr></hr>
                      <div className="d-flex flex-column ">
                        {license.IsMP3Supported ? <span className="m-0 fw-bold"> MP3 File Supported</span> : <></>}
                        {license.IsWAVSupported ? <span className="m-0 fw-bold"> WAV File Supported</span> : <></>}
                        <div><span className="m-0 fw-bold">Default price:</span><span> {license.DefaultPrice != null ? license.DefaultPrice > 0 ? license.DefaultPrice?.toLocaleString('vn-VN', { style: 'currency', currency: 'VND' }) : "Free" : "Null"}</span></div>
                        <div><span className="m-0 fw-bold">Current price:</span><span> {license.CurrentPrice != null ? license.CurrentPrice > 0 ? license.CurrentPrice?.toLocaleString('vn-VN', { style: 'currency', currency: 'VND' }) : "Free" : "Null"}</span></div>
                        <div>
                          <span className="m-0 fw-bold">Stream limit:</span>
                          <span>{license.StreamLimit < 0 ? <> Unlimited</> : <> {license.StreamLimit}</>}</span>
                        </div>
                        <div>
                          <span className="m-0 fw-bold">Distribution limit:</span>
                          <span>{license.DistributionLimit < 0 ? <> Unlimited</> : <> {license.DistributionLimit}</>}</span>
                        </div>
                      </div>
                    </CardBody>

                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
      </Row>
      {/* 
      <hr></hr>
      <Row>
        <div>
          <p style={{ fontSize: "2rem" }}>usage term</p>
        </div>
        <div className="m-1">
          This is a longer card with supporting text below as a natural lead-in to additional
          content. This content is a little bit longer. This is a longer card with supporting text
          below as a natural lead-in to additional content. This content is a little bit longer.
        </div>
      </Row> */}
    </>
  );
}
