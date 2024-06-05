import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
import { Col, Container, Row } from "react-bootstrap";
import TrackBanner from "./component/trackBanner";
import TrackPlay from "./component/trackPlay";
import TrackDetail from "./component/trackDetails";
import TrackComment from "./component/trackComment";
import TrackRelated from "./component/trackRelated";
import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { TrackDto } from "@/types/ApplicationTypes/TrackType";
import { HttpClient } from "@/common";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
// import { TrackCommentSection } from "./component/trackComment";

export default function MusicDetail() {
  const { trackId } = useParams()
  const [track, setTrack] = useState<TrackDto>()

  useEffect(()=>{
    FetchTrack()
  },[])

  const FetchTrack = async () => {
    try{
      const res:AxiosResponse<TrackDto> =
    await HttpClient.get("/api/ManageTrack/get-detail/"+trackId)
      if(res){
        if(res.data != undefined) setTrack(res.data)
      }
    }
    catch(e: any){
      console.log(e)
    }
  }

  return (
    <>
      <Container className="my-1">
          {track ? <Row className="mt4 justify-content-center  ">
            <Col lg="3" className="p-2 pe-3 m-2 border-end">
              <TrackBanner track={track}/>
            </Col>
            <Col lg="8" className=" m-2 ">
              <div className="p-1 border-bottom">
                <TrackPlay trackId={track.Id} price={track.Price ?? 0}></TrackPlay>
              </div>
              <div className="m-2 border-bottom">
                <TrackDetail licenses={track.Licenses}></TrackDetail>
              </div>
              <div className="m-2" style={{ maxHeight: "800px" }}>
                <TrackComment trackId={track.Id}/>
              </div>
              {/* <div className="m-2 ">
                <TrackRelated />
              </div> */}
            </Col>
          </Row>: <>Can't get track</>}
        </Container>
    </>
  );
}
