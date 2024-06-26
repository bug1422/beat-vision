import { Badge, Button, Card, CardBody } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { TRACK_STATUS, TrackDto } from "@/types/ApplicationTypes/TrackType";
import defautAudioImage from "../../../../../public/default-image/defaultSoundwave.jpg";
import MusicUpdateForm from "./musicUpdateForm";
import { useState } from "react";
import { SimpleAllertTopRight } from "@/my-component/ButtonAllert";

const ProducerMusicCard = ({ producerMusic }: { producerMusic: TrackDto }) => {
  const [isShowUpdateForm, setIsShowUpdateForm] = useState(false);
  const { onResult } = SimpleAllertTopRight();
  const {
    Id,
    IsAudioForSale,
    IsAudioPrivate,
    IsPublished,
    PlayCount,
    Price,
    Status,
    Tags,
    TrackName,
    ProfileBlobUrl,
  } = producerMusic;
  return (
    <Card>
      <CardBody>
        <div className="blog-card">
          <div className="d-flex justify-content-center">
            <img
              src={ProfileBlobUrl as string}
              className="img-fluid rounded"
              alt="image"
              onError={(e) => {
                e.currentTarget.src = defautAudioImage;
              }}
              style={{
                maxHeight: "200px",
              }}
            />
          </div>

          {Tags.map((tag, index) => (
            <div key={index}>
              <span className="badge badge-purple px-3 py-2 bg-soft-primary fw-semibold mt-3 me-1">
                {tag.Name}
              </span>
            </div>
          ))}

          <h4 className="my-3">{TrackName}</h4>
          {/* <ButtonAllert /> */}
          <MusicUpdateForm
            Track={producerMusic}
            isShow={isShowUpdateForm}
            onHide={() => setIsShowUpdateForm(false)}
            onFail={() => {
              onResult(false);
            }}
            onSuccess={() => {
              onResult(true);
              window.location.reload();
            }}
          />
          <div className="d-flex flex-row justify-content-between">
            <Button
              variant={"outline-warning"}
              className={Status != TRACK_STATUS.NOT_FOR_PUBLISH ? "disabled mb-2" : "mb-2"}
              size="sm"
              onClick={() => setIsShowUpdateForm(true)}
            >
              update
            </Button>
          </div>
          <div className="d-flex flex-column ">
            <p className="m-0 ">
              status : <Badge>{Status}</Badge>{" "}
            </p>
            <p className="m-0">
              publish :
              {IsPublished ? (
                <Badge bg="success" className="">
                  {" "}
                  TRUE
                </Badge>
              ) : (
                <Badge bg="warning" className="text-dark">
                  {" "}
                  FALSE
                </Badge>
              )}
            </p>
            <p className="m-0">
              private :{" "}
              {IsAudioPrivate ? (
                <Badge bg="success" className="">
                  {" "}
                  TRUE
                </Badge>
              ) : (
                <Badge bg="warning" className="text-dark">
                  {" "}
                  FALSE
                </Badge>
              )}
            </p>
            <p className="m-0">total play : {PlayCount}</p>
            <p className="m-0">price: {Price}</p>
            <p className="m-0">
              is for sale:{" "}
              {IsAudioForSale ? (
                <Badge bg="success" className="">
                  {" "}
                  TRUE
                </Badge>
              ) : (
                <Badge bg="danger" className="">
                  {" "}
                  FALSE
                </Badge>
              )}
            </p>
          </div>
          <hr className="hr-dashed" />
          <div className="d-flex justify-content-between">
            <div className="align-self-center">
              <Link to={"/music-detail/detail/"+Id} className="text-dark">
                detail of music id: {Id} <i className="fas fa-long-arrow-alt-right" />
              </Link>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProducerMusicCard;
