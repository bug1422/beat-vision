import { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";

import {
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormLabel,
  FormControl,
  Modal,
  Button,
  Form,
} from "react-bootstrap";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
interface UploadMusicParameters {
  trackName: string;
  isPrivate: boolean;
  isForSale: boolean;
  wavFile: File;
}

interface MusicUploadFormProps {
  isShow: boolean;
  onHide: () => void;
  onSubmit: () => void;
}
registerPlugin(
  FilePondPluginFileEncode,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview
);
export default function MusicUploadForm({ isShow, onHide, onSubmit }: MusicUploadFormProps) {
  const [trackName, setTrackName] = useState("");
  const [isPrivate, setIsPrivate] = useState(true);
  const [isForSalve, setIsForSale] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);

  return (
    <>
      <Modal show={isShow} centered>
        <Modal.Header>
          <Modal.Title>Upload track to you repository</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="">
            <Row>
              <Col lg="12">
                <Card>
                  <CardHeader>
                    <CardTitle>Textual inputs</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Row className="mb-3">
                        <FormLabel
                          htmlFor="example-url-input"
                          className="col-sm-2 col-form-label text-end"
                        >
                          URL
                        </FormLabel>
                        <Col sm="10">
                          <FormControl type="url" defaultValue="" id="example-url-input" />
                        </Col>
                      </Row>

                      <Row className="mb-3 has-success">
                        <FormLabel htmlFor="trackName" className="col-sm-2 col-form-label text-end">
                          TrackName
                        </FormLabel>
                        <Col sm="10">
                          <FormControl
                            type="email"
                            className="form-control-success"
                            id="trackName"
                            placeholder="name@example.com"
                          />
                          <div className="form-control-feedback">
                            the name is visible to everyone, choose wisely
                          </div>
                          <small className="form-text text-muted">required</small>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <div className="form-check">
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                              Is Private
                            </label>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="flexCheckDefault"
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <div className="form-check">
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                              Is For Sale
                            </label>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="flexCheckDefault"
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <p className="ms-1">Audio File</p>
                        <FilePond
                          allowMultiple={false}
                          allowReorder={true}
                          allowDrop
                          acceptedFileTypes={["audio/wav"]}
                          maxFiles={1}
                        />
                      </Row>
                      <Row>
                        <p className="ms-1">Image File</p>
                        <FilePond
                          allowDrop
                          allowMultiple={false}
                          allowReorder={false}
                          acceptedFileTypes={["image/jpeg", "image/png"]}
                          maxFiles={1}
                        />
                      </Row>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
          <Button onClick={onSubmit}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
