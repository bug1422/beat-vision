import { Row, Col, TabContent, TabPane, TabContainer } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FiFolder, FiLock } from "react-icons/fi";
import { useEffect, useState } from "react";
import { TrackLicenseDto } from "@/types/ApplicationTypes/TrackLicenseType";
import { number } from "yup";
export type ProjectsType = {
  icon: string;
  iconColor: string;
  title: string;
  date: string;
  fileSize: number;
};
const MockLicenseFiles: TrackLicenseDto[] = [
  {
    Id: 1,
    CurrentPrice: 0,
    DefaultPrice: 0,
    DistributionLimit: 9999,
    StreamLimit: 9999,
    IsMP3Supported: true,
    IsProducerTagged: false,
    IsWAVSupported: true,
    LicenceName: "Free license",
    LicensePdfBlobPath: "/private/license/freeLicense.pdf",
  },
  {
    Id: 2,
    CurrentPrice: 0,
    DefaultPrice: 0,
    DistributionLimit: 9999,
    StreamLimit: 9999,
    IsMP3Supported: true,
    IsProducerTagged: false,
    IsWAVSupported: true,
    LicenceName: "Paid license",
    LicensePdfBlobPath: "/private/license/paidLicense.pdf",
  },
];
const ProjectsData: ProjectsType[] = [
  {
    icon: "fa-file-pdf",
    iconColor: "danger",
    title: "Admin_Panel",
    date: "06 March 2019",
    fileSize: 5,
  },
  {
    icon: "fa-file-pdf",
    iconColor: "danger",
    title: "Ecommerce.pdf",
    date: "15 March 2019",
    fileSize: 8,
  },
  //   {
  //     icon: "fa-file-pdf",
  //     iconColor: "danger",
  //     title: "Payment_app.zip",
  //     date: "11 April 2019",
  //     fileSize: 10,
  //   },
  //   {
  //     icon: "fa-file-pdf",
  //     iconColor: "danger",
  //     title: "App_landing_001",
  //     date: "06 March 2019",
  //     fileSize: 5,
  //   },
];
export default function ProducerLicenses() {
  const [licenseFiles, setLicenseFiles] = useState(ProjectsData);
  const downloadLicense = (fileToDownload: ProjectsType) => {
    window.alert("download file ?");
  };
  useEffect(() => {}, []);
  return (
    <>
      <div>
        <Row>
          <Col xs={10}>
            <TabContainer defaultActiveKey="1">
              <TabContent id="files-tabContent">
                <TabPane eventKey="1" className="fade" id="files-projects">
                  <h4 className="card-title mt-0 mb-3">Projects</h4>
                  <div className="file-box-content">
                    {licenseFiles.map((projects, idx) => (
                      <>
                        <div className="file-box" key={idx}>
                          <Link
                            to="#"
                            className="download-icon-link"
                            onClick={(event) => {
                              downloadLicense(projects);
                            }}
                          >
                            <i className="dripicons-download file-download-icon"></i>
                          </Link>
                          <div className="text-center">
                            <i className={`far ${projects.icon} text-${projects.iconColor}`}></i>
                            <h6 className="text-truncate">{projects.title}</h6>
                            <small className="text-muted">
                              {projects.date} / {projects.fileSize}MB
                            </small>
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                </TabPane>
              </TabContent>
            </TabContainer>
          </Col>
        </Row>
      </div>
    </>
  );
}
