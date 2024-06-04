import { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";

import {
  Row,
  Col,
  Card,
  CardBody,
  FormLabel,
  FormControl,
  Modal,
  Button,
} from "react-bootstrap";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { HttpClient } from "@/common";
import { PagingResponseDto } from "@/types/ApplicationTypes/PagingResponseType";
import { TrackLicenseDto } from "@/types/ApplicationTypes/TrackLicenseType";
import { useNavigate } from "react-router-dom";
import { SimpleAllertTopRight } from "@/my-component/ButtonAllert";
import { AxiosResponse } from "axios";
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
  setShowing: (v: boolean) => void;
}
registerPlugin(
  FilePondPluginFileEncode,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview
);
export default function LicenseUploadForm({
  isShow,
  setShowing,
}: LicenseUploadFormProps) {
  const [licenceName, setLicenceName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [licensePdfFile, setLicensePdfFile] = useState<File | null>(null);
  const onClickSubmit = async () => {
    try {
      if (licenceName == "" || licenceName == undefined) {
        setError('Please enter a license name')
        return
      }
      if (licensePdfFile == undefined) {
        setError('Please upload a license')
        return
      }
      console.log(licensePdfFile);
      console.log(licenceName);
      console.log(licensePdfFile);
      const createLicenseObject = new CreateLicenseParam(licenceName, licensePdfFile);

      let formParams = new FormData();
      formParams.append("LicenceName", createLicenseObject.LicenceName);
      formParams.append("LicensePdfFile", createLicenseObject.LicensePdfFile);
      for (var pair of formParams.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }
      const res: AxiosResponse<PagingResponseDto<TrackLicenseDto[]>> =
        await HttpClient.post(`/api/ManageTrack/add-license`, formParams, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      console.log(res)
      if (res?.data) {
        setShowing(false)
      }
    } catch (error: any) {
      setError("Can't add license");
      if (error?.response?.data?.ErrorMessage) {
        setError(error?.response?.data?.ErrorMessage);
      }
      console.log(error);
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
                  <CardBody>
                    <Row>
                      <Row className="mb-3 has-success">
                        <FormLabel htmlFor="trackName" className="col-sm-2 col-form-label text-end">
                          License name
                        </FormLabel>
                        <Col sm="10">
                          <FormControl
                            type="text"
                            className="form-control-success"
                            id="trackName"
                            isInvalid={licenceName == "" || licenceName == undefined}
                            placeholder="Enter a name"
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
                    {error != "" ? <div className="text-danger fw-bold">{error}</div> : <></>}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {loading ?
            <div>Loading</div>
            : <></>}
          <Button disabled={loading} onClick={() => { setShowing(false) }}>Close</Button>
          <Button disabled={loading} onClick={onClickSubmit}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
