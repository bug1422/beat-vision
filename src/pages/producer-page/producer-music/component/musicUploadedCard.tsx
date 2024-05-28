import { Badge, Button, Card, CardBody } from "react-bootstrap";
import { Link } from "react-router-dom";
import { withSwal } from "react-sweetalert2";
import SweetAlerts from "@/components/advanced-ui/SweetAlerts";
import "../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { TrackDto } from "@/types/ApplicationTypes/TrackType";
import defautAudioImage from "../../../../../public/default-image/defaultSoundwave.jpg";

// export interface ProducerMusicCardType {
//   id: number;
//   imageUrl: string;
//   name: string;
//   Status: "PUBLISHED" | "REMOVED" | "WAIT_FOR_PUBLISH" | "NOT_FOR_PUBLISH";
//   isPublished: boolean;
//   isAudioPrivate: boolean;
//   PlayCount: number;
//   price: number;
//   tags: string[];
//   IsAudioForSale: boolean;
// }

const ProducerMusicCard = ({ producerMusic }: { producerMusic: TrackDto }) => {
  const {
    Id,
    AudioBitPerSample,
    AudioChannels,
    AudioLenghtSeconds,
    AudioSampleRate,
    Comments,
    IsAudioForSale,
    IsAudioPrivate,
    IsAudioRemoved,
    IsPublished,
    Licenses,
    PlayCount,
    Price,
    PublishDateTime,
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
            <>
              <span className="badge badge-purple px-3 py-2 bg-soft-primary fw-semibold mt-3 me-1">
                {tag.Name}
              </span>
            </>
          ))}

          <h4 className="my-3">{TrackName}</h4>
          <ButtonAllert />
          {/* <Button
            variant="outline-danger btn-small mb-1"
            size="sm"
          >
            Remove
          </Button> */}
          <div className="d-flex flex-column ">
            <p className="m-0 ">
              status : <Badge>{Status}</Badge>{" "}
            </p>
            <p className="m-0">publish : {IsPublished}</p>
            <p className="m-0">private : {IsAudioPrivate}</p>
            <p className="m-0">total play : {PlayCount}</p>
            <p className="m-0">price: {Price}</p>
            <p className="m-0">is for sale: {IsAudioForSale}</p>
          </div>
          <hr className="hr-dashed" />
          <div className="d-flex justify-content-between">
            <div className="align-self-center">
              <Link to="/music-detail/detail" className="text-dark">
                detail of music id: {Id} <i className="fas fa-long-arrow-alt-right" />
              </Link>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

const ButtonAllert = withSwal((props: any) => {
  const { swal } = props;
  return (
    <>
      <Button
        variant="outline-danger"
        className="mb-2"
        size="sm"
        onClick={() =>
          swal
            .fire({
              title: "Are you sure?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, delete it!",
            })
            .then(function (result: any) {
              if (result.isConfirmed) {
                swal.fire("Deleted!", "Your file has been deleted.", "success");
              }
            })
        }
      >
        remove
      </Button>
    </>
  );
});

export default ProducerMusicCard;
