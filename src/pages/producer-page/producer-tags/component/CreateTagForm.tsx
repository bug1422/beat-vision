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
import { HttpClient } from "@/common";
import { PagingResponseDto } from "@/types/ApplicationTypes/PagingResponseType";
import { TrackLicenseDto } from "@/types/ApplicationTypes/TrackLicenseType";
import axios, { AxiosResponse } from "axios";
import { SimpleAllertTopRight } from "@/my-component/ButtonAllert";
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
  const [tagName, setTagName] = useState("");
  const { onResult } = SimpleAllertTopRight();
  const onClickSubmig = async () => {
    try {
      let formData = new FormData();
      formData.append("Name", tagName);
      let createResponse: AxiosResponse = await HttpClient.post(`/api/ManageTag`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      onResult(true);
      window.location.reload();
    } catch (err: any) {
      onResult(false);
      console.log(err);
    }
  };
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
                            onChange={(e) => setTagName(e.currentTarget.value)}
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
          <Button onClick={onClickSubmig}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
