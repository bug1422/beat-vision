import { useState } from "react";
import Select from "react-select";
import { Button, Card, CardBody, Col, FormControl, FormLabel, Modal, Row } from "react-bootstrap";
import { MessageType, MessageWeigth } from "@/types/ApplicationTypes/MessageType";
import { HttpClient } from "@/common";
import { AxiosResponse } from "axios";
import { SimpleAllertTopRight } from "@/my-component/ButtonAllert";
interface CreateNotificationFormProps {
  isShow: boolean;
  setShowing: (v: boolean) => void;
}
export default function CreateNotificationForm({
  isShow,
  setShowing,
}: CreateNotificationFormProps) {
  const [error, _setError] = useState("");
  const [loading, _setLoading] = useState(false);
  const [messageTitle, setMessageTitle] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [messageType, setMessageType] = useState<MessageType | null>(MessageType.ALL);
  const [messageWeight, setMessageWeight] = useState<MessageWeigth | null>(MessageWeigth.MINOR);
  const [toUserId, setToUserId] = useState<number | null>(0);
  const { onResult } = SimpleAllertTopRight();
  const createMessage = async () => {
    let baseUrl = `/api/ManageNotification/admin-create-notification`;
    let formData = new FormData();
    formData.append("MessageName", messageTitle);
    formData.append("Content", messageContent);
    formData.append("Weight", String(messageWeight));
    formData.append("Type", String(messageType));
    if (messageType == MessageType.SINGLE) {
      formData.append("UserId", String(toUserId));
    }
    try {
      const res: AxiosResponse = await HttpClient.post(baseUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res) { }
      onResult(true);
    } catch (err: any) {
      onResult(false);
    }
  };
  const onClickSubmit = async () => {
    await createMessage();
    window.location.reload();
  };
  return (
    <>
      <Modal show={isShow} centered>
        <Modal.Header>
          <Modal.Title>Create Message</Modal.Title>
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
                          Message Name
                        </FormLabel>
                        <Col sm="10">
                          <FormControl
                            type="text"
                            className="form-control-success"
                            id="trackName"
                            placeholder="Enter messageName"
                            onChange={(e) => {
                              setMessageTitle(e.currentTarget.value);
                            }}
                            value={messageTitle}
                          />
                          <small className="form-text text-muted">required</small>
                        </Col>
                      </Row>
                      <Row>
                        <FormLabel
                          htmlFor="messageContent"
                          className="col-sm-2 col-form-label text-end"
                        >
                          Message content
                        </FormLabel>
                        <Col sm="10">
                          <FormControl
                            type="text"
                            className="form-control-success"
                            id="messageContent"
                            placeholder="Enter messageName"
                            onChange={(e) => {
                              setMessageContent(e.currentTarget.value);
                            }}
                            value={messageContent}
                          />
                          <small className="form-text text-muted">required</small>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12}>
                          <span>Type</span>
                          <Select
                            styles={{}}
                            defaultValue={{
                              value: MessageType.ALL,
                              label: "All",
                            }}
                            options={[
                              { value: MessageType.ALL, label: "All" },
                              { value: MessageType.GROUP, label: "Subscribers" },
                              { value: MessageType.SINGLE, label: "User" },
                            ]}
                            onChange={(e) => {
                              setMessageType(e?.value as MessageType);
                              console.log(messageType);
                            }}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12}>
                          <span>Weight</span>
                          <Select
                            styles={{}}
                            defaultValue={{
                              value: messageWeight,
                              label: "minor",
                            }}
                            options={[
                              { value: MessageWeigth.MINOR, label: "minor" },
                              { value: MessageWeigth.MAJOR, label: "major" },
                            ]}
                            onChange={(e) => {
                              setMessageWeight(e?.value as MessageWeigth);
                              console.log(messageType);
                            }}
                          />
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <FormLabel
                          htmlFor="messageContent"
                          className="col-sm-2 col-form-label text-end"
                        >
                          to user id
                        </FormLabel>
                        <Col sm="10">
                          <FormControl
                            disabled={messageType == MessageType.SINGLE ? false : true}
                            type="number"
                            className="form-control-success"
                            id="messageContent"
                            placeholder="Enter messageName"
                            onChange={(e) => {
                              let id = Number(e.currentTarget.value);
                              if (id < 0) {
                                setToUserId(0);
                              } else {
                                setToUserId(Number(e.currentTarget.value));
                              }
                              //setMessageContent(e.currentTarget.value);
                            }}
                            value={toUserId as number}
                          />
                        </Col>
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
          {loading ? <div>Loading</div> : <></>}
          <Button
            disabled={loading}
            onClick={() => {
              setShowing(false);
            }}
          >
            Close
          </Button>
          <Button disabled={loading} onClick={onClickSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
