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
import axios, { AxiosResponse } from "axios";
import { PagingResponseDto } from "@/types/ApplicationTypes/PagingResponseType";
import { TrackLicenseDto } from "@/types/ApplicationTypes/TrackLicenseType";
import { useNavigate } from "react-router-dom";
import { SimpleAllertTopRight } from "@/my-component/ButtonAllert";
class CreateLicenseParam {
  constructor(name: string, file: File) {
    this.LicenceName = name;
    this.DistributionLimit = null;
    this.StreamLimit = null;
    this.IsProducerTagged = null;
    this.LicensePdfFile = file;
  }
  LicenceName: string;
  DistributionLimit: number | null;
  StreamLimit: number | null;
  IsProducerTagged: boolean | null;
  LicensePdfFile: File;
}

interface LicenseUploadFormProps {
  isShow: boolean;
  onHide: () => void;
  onSuccess?: () => void;
  onFail?: () => void;
}
registerPlugin(
  FilePondPluginFileEncode,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview
);
export default function LicenseUploadForm({
  isShow,
  onHide,
  onSuccess,
  onFail,
}: LicenseUploadFormProps) {
  const [licenceName, setLicenceName] = useState("");
  const [licensePdfFile, setLicensePdfFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const { onResult } = SimpleAllertTopRight();
  const onClickSubmit = async () => {
    try {
      console.log(licensePdfFile);
      if (!licenceName || !licensePdfFile) {
        window.alert("field empty, fill in ");
        return;
      }
      console.log(licenceName);
      console.log(licensePdfFile);
      const createLicenseObject = new CreateLicenseParam(licenceName, licensePdfFile);
      let formParams = new FormData();
      formParams.append("LicenceName", createLicenseObject.LicenceName);
      formParams.append("LicensePdfFile", createLicenseObject.LicensePdfFile);
      console.log(JSON.stringify(createLicenseObject));
      let axiosResponse: AxiosResponse<PagingResponseDto<TrackLicenseDto[]>> =
        await HttpClient.post(`/api/ManageTrack/add-license`, formParams, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      if (!axiosResponse.data) {
        throw new Error("fail to fetch data");
      } else {
        onResult(true);
      }
      onHide();
      if (!onSuccess) {
      } else {
        onSuccess();
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const { status } = error.response;
          switch (status) {
            case 403:
            case 401:
              navigate("/auth/login");
              break;
          }
          console.log(error);
        }
      }
      if (!onFail) {
      } else {
        onFail();
      }
    } finally {
    }
  };
  return (
    <>
      <Modal show={isShow} centered>
        <Modal.Header>
          <Modal.Title>Upload license</Modal.Title>
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
                      <Row className="mb-3 has-success">
                        <FormLabel htmlFor="trackName" className="col-sm-2 col-form-label text-end">
                          License name
                        </FormLabel>
                        <Col sm="10">
                          <FormControl
                            type="email"
                            className="form-control-success"
                            id="trackName"
                            placeholder="name@example.com"
                            onChange={(e) => {
                              setLicenceName(e.currentTarget.value);
                            }}
                          />
                          <small className="form-text text-muted">required</small>
                        </Col>
                      </Row>
                      <Row>
                        <p className="ms-1">license File</p>
                        <FilePond
                          allowMultiple={false}
                          allowReorder={true}
                          allowDrop
                          acceptedFileTypes={["application/pdf"]}
                          maxFiles={1}
                          onupdatefiles={(files) => {
                            let getFile = files[0];
                            let addedFile = new File([getFile.file], getFile.file.name, {
                              type: getFile.file.type,
                              lastModified: getFile.file.lastModified,
                            });
                            setLicensePdfFile(addedFile);
                          }}
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
          <Button onClick={onClickSubmit}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
