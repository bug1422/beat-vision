import { useState } from "react";
import { ButtonAllert, ButtonAllert2 } from "../../../my-component/ButtonAllert";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
} from "react-bootstrap";
import PublishUpdateForm from "./component/publishUpdateForm";
const MockProducerMusicItem: PublishDetailRowProps[] = [
  {
    Id: 1,
    IsAudioPrivate: true,
    IsPublished: false,
    TrackName: "my first ",
    Price: 0,
    Status: "NOT_FOR_PUBLISH",
    PublishDateTime: "14/04/2004 23:23:23",
    IsAudioForSale: false,
  },
  {
    Id: 2,
    IsAudioPrivate: true,
    IsPublished: false,
    TrackName: "my first ",
    Price: 50000,
    IsAudioForSale: true,
    PublishDateTime: "14/04/2004 23:23:23",

    Status: "PUBLISH",
  },
  {
    Id: 3,
    IsAudioPrivate: true,
    IsPublished: false,
    TrackName: "my first ",
    Price: 0,
    IsAudioForSale: false,
    PublishDateTime: "14/04/2004 23:23:23",

    Status: "WAIT_FOR_PUBLISH",
  },
  {
    Id: 4,
    IsAudioPrivate: false,
    IsPublished: false,
    TrackName: "my first (removed)",
    PublishDateTime: "14/04/2004 23:23:23",

    Price: 0,
    IsAudioForSale: false,
    Status: "REMOVED",
  },
  {
    Id: 5,
    PublishDateTime: "14/04/2004 23:23:23",

    IsAudioPrivate: true,
    IsPublished: false,
    TrackName: "my first ",
    Price: 0,
    IsAudioForSale: false,
    Status: "NOT_FOR_PUBLISH",
  },
];

export default function ProducerPublish() {
  const [trackList, setTrackList] = useState(MockProducerMusicItem);
  const [isShowUpdateForm, setIsShowUpdateForm] = useState(false);
  const [selectedTrackId, setSelectedTrackId] = useState(0);
  const onRowPressUpdate = (trackId: number) => {
    setIsShowUpdateForm(!isShowUpdateForm);
    setSelectedTrackId(selectedTrackId);
  };
  return (
    <>
      <Row>
        <PublishUpdateForm
          isShow={isShowUpdateForm}
          trackId={0}
          onHide={() => setIsShowUpdateForm(false)}
          onSubmit={() => {}}
        />
        <Card>
          <CardHeader>
            <CardTitle>Publish music</CardTitle>
            {/* <p className="text-muted mb-0">
              Add <code>.table-bordered</code> for borders on all sides of the table and cells.
            </p> */}
          </CardHeader>
          <CardBody>
            <div className="table-responsive">
              <table className="table table-bordered mb-0 table-centered">
                <thead>
                  <tr>
                    <th>Track Id</th>
                    <th>Name</th>
                    <th>Is private</th>
                    <th>Is for sale</th>
                    <th>Is Published</th>
                    <th>Publish Date Time</th>
                    <th>Status</th>
                    <th>Price</th>
                    <th className="text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {trackList.map((track) => (
                    <>
                      <PublishRow
                        track={track}
                        // TrackName={track.TrackName}
                        // Id={track.Id}
                        // IsAudioPrivate={track.IsAudioPrivate}
                        // IsAudioForSale={track.IsAudioForSale}
                        // IsPublished={track.IsPublished}
                        // Price={track.Price}
                        // Status={track.Status}
                        // PublishDateTime={track.PublishDateTime}
                        key={track.Id}
                        onUpdate={onRowPressUpdate}
                      />
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </Row>
    </>
  );
}

export interface PublishDetailRowProps {
  Id: number;
  TrackName: string;
  IsAudioPrivate: boolean;
  IsPublished: boolean;
  Status: "PUBLISH" | "REMOVED" | "WAIT_FOR_PUBLISH" | "NOT_FOR_PUBLISH";
  PublishDateTime?: String;
  IsAudioForSale?: boolean;
  Price: number;
}
interface PublishDetailRowPropsExtra {
  track: PublishDetailRowProps;
  onUpdate: (trackId: number) => void;
}
const PublishRow = ({ track, onUpdate }: PublishDetailRowPropsExtra) => {
  return (
    <>
      <tr>
        <td>{track.Id}</td>
        <td>{track.TrackName}</td>
        <td>
          {track.IsAudioPrivate ? (
            <Badge className="">true</Badge>
          ) : (
            <Badge className="">false</Badge>
          )}
        </td>
        <td>
          {track.IsAudioForSale ? (
            <Badge className="">true</Badge>
          ) : (
            <Badge className="">false</Badge>
          )}
        </td>
        <td>
          {track.IsPublished ? <Badge className="">true</Badge> : <Badge className="">false</Badge>}
        </td>
        <td>{track.PublishDateTime}</td>
        <td>{track.Status}</td>
        <td>{track.Price}</td>
        <td className="text-end">
          <Dropdown className="d-inline-block">
            <DropdownToggle variant="link" id="dropdown-basic">
              <i className="las la-ellipsis-v font-20 text-muted" />
            </DropdownToggle>

            <DropdownMenu>
              <DropdownItem href="#">
                <Button
                  variant={`outline-primary`}
                  type="button"
                  style={{ fontSize: "0.9rem" }}
                  onClick={() => onUpdate(track.Id)}
                >
                  update
                </Button>
              </DropdownItem>
              <DropdownItem href="#">
                <ButtonAllert2<PublishDetailRowProps>
                  item={track}
                  onClickEvent={(track: PublishDetailRowProps) => {
                    console.log(track.TrackName);
                    console.log(track.Id);
                  }}
                  text="pull down"
                ></ButtonAllert2>
              </DropdownItem>
              <DropdownItem href="#">
                <Button variant={`outline-success`} type="button" style={{ fontSize: "0.9rem" }}>
                  detail
                </Button>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </td>
      </tr>
    </>
  );
};
