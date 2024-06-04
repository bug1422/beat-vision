import defautAudioImage from "../../../../public/default-image/defaultSoundwave.jpg";
import { useEffect, useState } from "react";
import { Button, Col, Form, Nav, NavItem, NavLink, Pagination, Row, TabContainer, TabContent, TabPane } from "react-bootstrap";
import MusicUploadForm from "./component/musicUploadForm";
import { PagingResponseDto } from "@/types/ApplicationTypes/PagingResponseType";
import { TrackDto } from "@/types/ApplicationTypes/TrackType";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import ProducerMusicCard from "./component/musicUploadedCard";
import { HttpClient } from "@/common";
export default function ProducerMusics() {
  const [producerMusics, setProducerMusic] = useState<TrackDto[]>([]);
  const [error, setError] = useState("");
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
      if (error?.response?.data?.ErrorMessage) {
        setError(error?.response?.data?.ErrorMessage);
      }
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

  function reFetch() {
    fetchData().then((result) => {
      console.log(result);
    });
  }
  return (
    <>
      <div className="fs-1 border-bottom mb-3">Track Management</div>
      <TabContainer defaultActiveKey="1">
        <div className="pb-4">
          <Nav
            className="nav-border nav-pills mb-0"
            id="pills-tab"
            role="tablist"
          >
            <NavItem>
              <NavLink eventKey="1">All Tracks</NavLink>
            </NavItem>
            <NavItem>
              <NavLink eventKey="2">Upload Tracks</NavLink>
            </NavItem>
            <NavItem>
              <NavLink eventKey="3">Update Tracks</NavLink>
            </NavItem>
          </Nav>
        </div>
        <Row>
          <Col xs={12}>
            <TabContent className="" id="pills-tabContent">
              <TabPane eventKey="1" className="fade">
                {error != "" ? <div>{error}</div> : <>
                  {producerMusics.length > 0 ? <Row>
                    {producerMusics.map((music, idx) => (
                      <Col key={idx} xs={3}>
                        <ProducerMusicCard producerMusic={music} />
                      </Col>
                    ))}
                    <div>
                      <Row className="d-flex justify-content-center align-content-center">
                        <div>
                          <Pagination className="d-flex justify-content-center">{renderPaging()}</Pagination>
                        </div>
                      </Row>
                    </div>
                  </Row> : <>No tracks</>}
                </>}

              </TabPane>
              <TabPane eventKey="2" className="fade">
                <Row className="mb-4">
                  <MusicUploadForm refresh={reFetch} />
                </Row>
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      </TabContainer>

    </>
  );
}
