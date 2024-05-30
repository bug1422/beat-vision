import { useEffect, useState } from "react";
import {
  ButtonAllert3,
  ReturnDataOnClickEvent,
  SimpleAllertTopRight,
} from "../../../my-component/ButtonAllert";
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
  Pagination,
  Row,
} from "react-bootstrap";
import { TrackDto } from "@/types/ApplicationTypes/TrackType";
import PublishForm from "./component/publishForm";
import defaultAudioImage from "../../../assets/images/logo-dark.png";
import { HttpClient } from "@/common";
import axios, { AxiosResponse, isAxiosError } from "axios";
import { PagingResponseDto } from "@/types/ApplicationTypes/PagingResponseType";
import { useNavigate } from "react-router-dom";
import { FetchFunctionResult } from "@/types/FetchFunctionReturnType";
import { format } from "date-fns";
export default function ProducerPublish() {
  const [trackList, setTrackList] = useState<TrackDto[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [cache, setCache] = useState<{ [key: number]: TrackDto[] }>({});
  const navigate = useNavigate();
  const renderPaging = () => {
    const pages = [];
    for (let i = 0; i < totalPage; i++) {
      if (i == 0) {
        pages.push(
          <>
            <Pagination.First key={0} active={false} onClick={() => setCurrentPage(0)} />
          </>
        );
      }
      pages.push(
        <>
          <Pagination.Item key={i} active={currentPage === i} onClick={() => setCurrentPage(i)}>
            {i + 1}
          </Pagination.Item>
        </>
      );
    }
    pages.push(
      <>
        <Pagination.Last
          key={totalPage - 1}
          active={false}
          onClick={() => {
            setCurrentPage(totalPage - 1);
          }}
        />
      </>
    );
    return pages;
  };
  const fetchData = async () => {
    let cacheKey = Number(currentPage.toString() + pageSize.toString());
    if (cache[cacheKey]) {
      setTrackList(cache[cacheKey]);
      return;
    }
    try {
      const res: AxiosResponse<PagingResponseDto<TrackDto[]>> = await HttpClient.get(
        `/api/ManageTrack/get-range?currentPage=${currentPage}&amount=${pageSize}`
      );
      if (!res.data) {
        throw new Error("fail to fetch data");
      }
      let dataBody = res.data;
      console.log(dataBody);
      let totalItemCount = dataBody.TotalCount;
      let totalTracks = dataBody.Value;
      console.log(totalTracks);
      setTrackList(totalTracks);
      setTotalPage(Math.ceil(totalItemCount / pageSize));
      setCache((prevCache) => ({ ...prevCache, [cacheKey]: totalTracks }));
    } catch (error: any) {
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
    } finally {
    }
  };
  useEffect(() => {
    fetchData().then(() => {
      console.log(trackList);
    });
    //console.log(new Date(trackList[trackList.length - 1].PublishDateTime as string));
  }, [currentPage, pageSize]);

  return (
    <>
      <Row>
        <Card>
          <CardHeader>
            <CardTitle>Publish music</CardTitle>
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
                  {trackList.map((track: TrackDto) => (
                    <>
                      <PublishRow track={track} />
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </Row>
      <Row className="d-flex justify-content-center align-content-center">
        <div>
          <Pagination className="d-flex justify-content-center">{renderPaging()}</Pagination>
        </div>
      </Row>
    </>
  );
}

interface PublishDetailRowPropsExtra {
  track: TrackDto;
  //onUpdate: (trackId: number) => void;
}
const PublishRow = ({ track }: PublishDetailRowPropsExtra) => {
  const [isShowPublishForm, setIsShowPublishForm] = useState(false);
  const { onResult } = SimpleAllertTopRight();
  return (
    <>
      <PublishForm
        trackId={track.Id}
        isShow={isShowPublishForm}
        onHide={() => {
          setIsShowPublishForm(false);
        }}
        onFail={() => {
          onResult(false, "create publish fail");
        }}
        onSuccess={() => {
          onResult(true, "create publish success");
          window.location.reload();
        }}
      />

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
        <td>
          {!track.PublishDateTime ? (
            <Badge bg="danger">never publish</Badge>
          ) : (
            format(new Date(track.PublishDateTime as string), "yyyy-MM-dd HH:mm:ss")
          )}
        </td>
        <td>
          <Badge bg="warning" className="text-dark">
            {track.Status}
          </Badge>
        </td>
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
                  className="w-100"
                  size="sm"
                  onClick={() => setIsShowPublishForm(true)}
                >
                  publish
                </Button>
              </DropdownItem>
              <DropdownItem href="#">
                <ButtonAllert3
                  item={track}
                  onClickEvent={async (track: TrackDto): Promise<ReturnDataOnClickEvent> => {
                    console.log(track);
                    let result = await PulldownTrack(track.Id);
                    if (result.isSuccess) {
                      return { result: true, successMessage: "create successfully" };
                    } else {
                      return { result: false, failureMessage: result.error?.message };
                    }
                  }}
                  text="pull down"
                  className={track.IsPublished ? "w-100" : " w-100"}
                ></ButtonAllert3>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </td>
      </tr>
    </>
  );
};
async function PulldownTrack(trackId: number): Promise<FetchFunctionResult> {
  try {
    let createResult: AxiosResponse<string> = await HttpClient.delete(
      `/api/ManageTrack/pulldown-track/${trackId}`,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return { isSuccess: true };
  } catch (err: any) {
    if (isAxiosError(err)) {
      return {
        isSuccess: false,
        error: { statusCode: err.status as number, message: err.message },
      };
    }
    return { isSuccess: false };
  }
}
