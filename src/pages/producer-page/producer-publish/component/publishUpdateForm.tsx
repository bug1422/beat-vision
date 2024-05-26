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
interface updatePublish {
  TrackId: number;
  PublishDate: Date | null;
  IsChangeTrackPaid: boolean;
  Price: number | null;
}

interface MusicUploadFormProps {
  trackId: number;
  isShow: boolean;
  onHide: () => void;
  onSubmit: () => void;
}
registerPlugin(
  FilePondPluginFileEncode,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview
);
export default function PublishUpdateForm({
  trackId,
  isShow,
  onHide,
  onSubmit,
}: MusicUploadFormProps) {
  let defaultValueForm: updatePublish = {
    IsChangeTrackPaid: false,
    Price: null,
    TrackId: 0,
    PublishDate: null,
  };
  defaultValueForm.TrackId = trackId;
  const [uploadData, setUploadData] = useState(defaultValueForm);
  const [isChangePrice, setIsChangePrice] = useState(defaultValueForm.IsChangeTrackPaid);
  const [price, setPrice] = useState(defaultValueForm.Price);
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
                      <Row className="mb-3">TrackId : {uploadData.TrackId}</Row>
                      <Row className="mb-3 has-success">
                        <FormLabel htmlFor="trackName" className="col-sm-2 col-form-label text-end">
                          TrackName
                        </FormLabel>
                        <Col sm="10">
                          <FormControl
                            type="datetime-local"
                            className="form-control-success"
                            id="pulish-date"
                            placeholder=""
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <div className="form-check">
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                              change price ?
                            </label>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="flexCheckDefault"
                              checked={isChangePrice}
                              onClick={() => {
                                setIsChangePrice(!isChangePrice);
                              }}
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormControl
                            disabled={isChangePrice == false}
                            type="number"
                            className="form-control-success"
                            id="publish-price-update"
                            placeholder="0vnd"
                            onChange={(e) => {
                              setPrice(e.target.value as unknown as number);
                            }}
                          />
                        </Col>
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
