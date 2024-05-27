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

interface CreateTagFormProps {
  isShow: boolean;
  onHide: () => void;
  onSubmit: () => void;
}
registerPlugin(
  FilePondPluginFileEncode,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview
);
export default function CreateTagForm({ isShow, onHide, onSubmit }: CreateTagFormProps) {
  const [tagName, setTrackName] = useState("");

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
                    <CardTitle>Create Tag</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Row className="mb-3 has-success">
                        <FormLabel htmlFor="trackName" className="col-sm-2 col-form-label text-end">
                          Tag Name
                        </FormLabel>
                        <Col sm="10">
                          <FormControl
                            type="text"
                            className="form-control-success"
                            id="tagname"
                            placeholder="tag name"
                          />
                          <div className="form-control-feedback">choose a unique name</div>
                          <small className="form-text text-muted">required</small>
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
