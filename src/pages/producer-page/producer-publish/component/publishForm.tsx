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
class PublishTrackDto {
  constructor(id: number, datetime: Date, publihNow: boolean, isPaid: boolean) {
    this.TrackId = id;
    this.DateTime = datetime;
    this.IsPublishNow = publihNow;
    this.IsTrackPaid = isPaid;
  }
  TrackId: number;
  DateTime: Date;
  IsPublishNow: boolean;
  IsTrackPaid: boolean;
  Price?: number;
}

interface MusicUploadFormProps {
  isShow: boolean;
  trackId: number;
  onHide: () => void;
  onSuccess?: (isPublishNow: boolean) => void;
  onFail?: () => void;
}
registerPlugin(
  FilePondPluginFileEncode,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview
);
export default function PublishForm({
  trackId,
  isShow,
  onHide,
  onSuccess,
  onFail,
}: MusicUploadFormProps) {
  const [isPaid, setIsPaid] = useState(false);
  const [isPublishNow, setIsPublishNow] = useState(false);
  const [price, setPrice] = useState(0);
  const [dateTime, setDateTime] = useState<string>(getCurrentDateTimePlus5Minutes());
  const navigate = useNavigate();
  const { onResult } = SimpleAllertTopRight();

  const onClickSubmit = async () => {
    try {
      let newPublish = new PublishTrackDto(trackId, new Date(dateTime), isPublishNow, isPaid);
      let formParams = new FormData();
      formParams.append("TrackId", trackId.toString());
      formParams.append("PublishDate", String(newPublish.DateTime.toISOString()));
      formParams.append("IsPublishNow", String(newPublish.IsPublishNow));
      formParams.append("IsTrackPaid", String(newPublish.IsTrackPaid));
      if (newPublish.IsTrackPaid == false) {
        formParams.append("Price", String(10000));
      } else {
        formParams.append("Price", String(price));
      }
      console.log(newPublish.DateTime.toISOString());
      console.log(newPublish);
      let axiosResponse: AxiosResponse<PagingResponseDto<TrackLicenseDto[]>> =
        await HttpClient.post(`/api/ManageTrack/publish-track`, formParams, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      console.log(axiosResponse);
      onResult(true);
      onHide();
      if (!onSuccess) {
      } else {
        onSuccess(isPublishNow);
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
          <Modal.Title>publish track</Modal.Title>
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
                      <FormLabel
                        htmlFor="example-time-input"
                        className="col-sm-2 col-form-label text-end"
                      >
                        Time
                      </FormLabel>
                      <Col sm="10">
                        <FormControl
                          type="datetime-local"
                          value={dateTime}
                          id="example-time-input"
                          onChange={(e) => {
                            setDateTime(e.target.value);
                            console.log(dateTime);
                          }}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={"10"}>
                        <div className="checkbox checkbox-success checkbox-circle">
                          <input
                            id="checkbox-1"
                            type="checkbox"
                            checked={isPublishNow}
                            onChange={() => setIsPublishNow(!isPublishNow)}
                          />
                          <label htmlFor="checkbox-1">Is publish now </label>
                        </div>
                        <div className="checkbox checkbox-success checkbox-circle">
                          <input
                            id="checkbox-2"
                            type="checkbox"
                            checked={isPaid}
                            onChange={() => setIsPaid(!isPaid)}
                          />
                          <label htmlFor="checkbox-2">Is track paid </label>
                          {isPaid && (
                            <Form.Control
                              type="Number"
                              value={price}
                              onChange={(e) => {
                                let price = Number(e.currentTarget.value);
                                if (price <= 0) {
                                  setPrice(0);
                                } else {
                                  setPrice(Number(e.currentTarget.value));
                                }
                              }}
                            />
                          )}
                        </div>
                      </Col>
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
const getCurrentDateTimePlus5Minutes = (): string => {
  const currentDate = new Date();
  currentDate.setMinutes(currentDate.getMinutes() + 5);

  // Format date to 'YYYY-MM-DDTHH:mm'
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};
