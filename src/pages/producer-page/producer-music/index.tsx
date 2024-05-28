import defautAudioImage from "../../../../public/default-image/defaultSoundwave.jpg";
import { useEffect, useState } from "react";
import { Button, Col, Form, Pagination, Row } from "react-bootstrap";
import MusicUploadForm from "./component/musicUploadForm";

// const MockProducerMusicItem: ProducerMusicCardType[] = [
//   {
//     id: 1,
//     imageUrl: defautAudioImage,
//     isAudioPrivate: true,
//     isPublished: false,
//     name: "my first ",
//     PlayCount: 25,
//     price: 0,
//     Status: "NOT_FOR_PUBLISH",
//     IsAudioForSale: false,
//     tags: ["country", "hardrock", "blues", "indie"],
//   },
//   {
//     id: 2,
//     imageUrl: defautAudioImage,
//     isAudioPrivate: true,
//     isPublished: false,
//     name: "my first ",
//     PlayCount: 25,
//     price: 50000,
//     IsAudioForSale: true,
//     Status: "PUBLISHED",
//     tags: ["country", "hardrock", "blues", "indie"],
//   },
//   {
//     id: 3,
//     imageUrl: defautAudioImage,
//     isAudioPrivate: true,
//     isPublished: false,
//     name: "my first ",
//     PlayCount: 25,
//     price: 0,
//     IsAudioForSale: false,
//     Status: "WAIT_FOR_PUBLISH",
//     tags: ["country", "hardrock", "blues", "indie"],
//   },
//   {
//     id: 4,
//     imageUrl: defautAudioImage,
//     isAudioPrivate: false,
//     isPublished: false,
//     name: "my first (removed)",
//     PlayCount: 25,
//     price: 0,
//     IsAudioForSale: false,
//     Status: "REMOVED",
//     tags: ["country", "hardrock", "blues", "indie"],
//   },
//   {
//     id: 5,
//     imageUrl: defautAudioImage,
//     isAudioPrivate: true,
//     isPublished: false,
//     name: "my first ",
//     PlayCount: 25,
//     price: 0,
//     IsAudioForSale: false,
//     Status: "NOT_FOR_PUBLISH",
//     tags: ["country", "hardrock", "blues", "indie"],
//   },
// ];
import { BACKEND_URL, HttpClient } from "@/common";
import { PagingResponseDto } from "@/types/ApplicationTypes/PagingResponseType";
import { TrackDto } from "@/types/ApplicationTypes/TrackType";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import ProducerMusicCard from "./component/musicUploadedCard";
export default function ProducerMusics() {
  const [producerMusics, setProducerMusic] = useState<TrackDto[]>([]);
  const [isShowForm, setIsShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [pageSize, setPageSize] = useState(4);
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
      setProducerMusic(cache[cacheKey]);
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
      setProducerMusic(totalTracks);
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
    fetchData().then((result) => {
      console.log(result);
    });
  }, [currentPage, pageSize]);
  return (
    <>
      <div>
        <MusicUploadForm
          isShow={isShowForm}
          onHide={() => setIsShowForm(false)}
          onSubmit={() => {}}
        />
        <Button onClick={() => setIsShowForm(!isShowForm)}>upload</Button>
        <Form.Select
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setCache({});
          }}
        >
          <option value={3}>3</option>
          <option value={6}>6</option>
        </Form.Select>
      </div>
      <div>
        <Row>
          {producerMusics.map((music) => (
            <>
              <Col xs={3}>
                <ProducerMusicCard producerMusic={music} />
              </Col>
            </>
          ))}
        </Row>
        <Row className="d-flex justify-content-center align-content-center">
          <div>
            <Pagination className="d-flex justify-content-center">{renderPaging()}</Pagination>
          </div>
        </Row>
      </div>
    </>
  );
}
