import defautAudioImage from "../../../../public/default-image/defaultSoundwave.jpg";
import { useEffect, useState } from "react";
import { Button, Col, Form, Pagination, Row } from "react-bootstrap";
import MusicUploadForm from "./component/musicUploadForm";
import { PagingResponseDto } from "@/types/ApplicationTypes/PagingResponseType";
import { TrackDto } from "@/types/ApplicationTypes/TrackType";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import ProducerMusicCard from "./component/musicUploadedCard";
import { HttpClient } from "@/common";
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
          onFail={() => {}}
          onSuccess={() => {}}
        />
        <Button onClick={() => setIsShowForm(!isShowForm)}>upload</Button>
        <Form.Select
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setCache({});
          }}
        >
          <option value={4}>4</option>
          <option value={8}>8</option>
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
