import { HttpClient } from "@/common";
import { useAuthContext } from "@/context";
import { TrackCommentDto } from "@/types/ApplicationTypes/TrackCommentType";
import { UserProfileDto } from "@/types/ApplicationTypes/UserProfileType";
import { CompareDate } from "@/utils";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "react-bootstrap";
import { toast } from "sonner";
import defaultPic from "/default-image/defaultprofile.png"

export const Message = (props: { value: TrackCommentDto }) => {
  const { user } = useAuthContext()
  const [onHovered, setHovered] = useState(false)
  const [isOpened, setOpened] = useState(false)
  const [profile, setUser] = useState<UserProfileDto>()
  const [replies, setReplies] = useState<TrackCommentDto[]>([])

  useEffect(() => {
    FetchUser()
    FetchReplies()
  }, [props.value])

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const message = e.target[0].value
    if (message != "") {
      console.log(message)
      AddComment(message).finally(() => { e.target[0].value = "" })
    }
  }

  const AddComment = async (message: string) => {
    try {
      const data = new FormData()
      if (user?.userid) data.append("userProfileId", user?.userid)
      if (props.value.TrackId) data.append("TrackId", props.value.TrackId.toString())
      data.append("Content", message)
      data.append("ReplyToCommentId", props.value.Id.toString())

      const res: AxiosResponse<TrackCommentDto[]> =
        await HttpClient.post("/api/ManageComment/create-track-command-reply", data, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
      if (res) {
        toast.info("Comment sent", { position: "bottom-right", duration: 2000 })

      }
    } catch (e: any) {
      console.log(e)
      toast.error("Can't send message", { position: "bottom-right", duration: 2000 })
    }
  }

  const FetchReplies = async () => {
    try {
      const res: AxiosResponse<TrackCommentDto[]> =
        await HttpClient.get(`/api/ManageComment/get-track-comments-reply?trackId=${props.value.TrackId}&commentId=${props.value.Id}`)
      if (res?.data) {
        console.log(res?.data)
        setReplies([...res?.data.sort((a, b) => Date.parse(b.CreateDate) - Date.parse(a.CreateDate))])
      }
    } catch (e: any) {
      console.log(e)
    }
  }

  const FetchUser = async () => {
    try {
      const res: AxiosResponse<UserProfileDto> =
        await HttpClient.get('/api/ManageUser/' + props.value.AuthorId)
      if (res?.data) {
        setUser(res?.data)
      }
    } catch (e: any) {
      console.log(e)
    }
  }

  return (<>
    <Row className="mb-2 mt-3" style={{ width: "100%" }}>
      <div className="" style={{ width: "60px", top: "0" }}>
        <img src={profile?.ProfileBlobUrl ?? defaultPic} className="" style={{ width: "50px", borderRadius: "100%" }} />
      </div>

      <Col xs={10} className="ms-1 align-items-center">
        <div className="d-flex flex-column border" style={{ padding: "0px 10px", borderRadius: "8px" }}>
          <div className="fs-6 fw-lighter">{profile?.Fullname}</div>
          <div style={{ fontSize: "22px" }}>{props.value.Content}</div>
        </div>
        <div className="d-flex justify-content-between">
          <div>
            <div
              className="fw-lighter"
              onClick={() => { setOpened(!isOpened); console.log(replies) }}
              onMouseEnter={() => { setHovered(true) }}
              onMouseOut={() => { setHovered(false) }}
              style={{ cursor: "default", color: `${onHovered ? "rgb(133, 58, 232)" : "rgb(0,0,0)"}` }}>
              {isOpened ? "Close Replies" : `See Reply (${replies.length})`}{"|  "}
              {CompareDate(Date.parse(props.value.CreateDate), Date.now())}
            </div>
          </div>
        </div>
        <div className="ms-2">
          {
            isOpened ? <>
              {
                replies.map((reply, index) => (
                  <Message value={reply} key={index} />
                ))
              }
              <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                <Row className="input d-flex justify-content-start">
                  <Col xs={10}>
                    <input type="text" className="form-control" placeholder="Type in your thought" />
                  </Col>
                  <Col xs={2}>
                    <button className="btn btn-primary" type="submit">Send</button>
                  </Col>
                </Row>
              </form>
            </> : <></>
          }
        </div>
      </Col>
    </Row >
  </>)
}


const TrackComment = (props: { trackId: number }) => {
  const { user } = useAuthContext()
  const [trackId, _setTrackId] = useState(props.trackId)
  const [comments, setComment] = useState<TrackCommentDto[]>()

  useEffect(() => {
    FetchComment()
  }, [trackId])

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const message = e.target[0].value
    if (message != "") {
      console.log(message)
      AddComment(message).finally(() => { e.target[0].value = "" })
    }
  }

  const AddComment = async (message: string) => {
    try {
      const data = new FormData()
      if (user?.userid) data.append("userProfileId", user?.userid)
      data.append("TrackId", trackId.toString())
      data.append("Content", message)

      const res: AxiosResponse<TrackCommentDto[]> =
        await HttpClient.post("/api/ManageComment/create-track-command", data, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
      if (res) {
        toast.info("Comment sent", { position: "bottom-right", duration: 2000 })
        FetchComment()
      }
    } catch (e: any) {
      console.log(e)
      toast.error("Can't send message", { position: "bottom-right", duration: 2000 })
    }
  }

  const FetchComment = async () => {
    try {
      const res: AxiosResponse<TrackCommentDto[]> =
        await HttpClient.get("/api/ManageComment/get-track-comments", {
          params: {
            trackId: trackId
          }
        })
      if (res) {
        let tempt: TrackCommentDto[] = []
        res.data.sort((a, b) => Date.parse(b.CreateDate) - Date.parse(a.CreateDate)).forEach(p => {
          if (p.ReplyToCommentId == null) {
            tempt.push(p)
          }
        })
        setComment(tempt)
      }
    } catch (e: any) {
      console.log(e)
    }
  }
  return (
    <>
      <div className="track-comment">
        <Card>
          <CardHeader><CardTitle className="fw-bold fs-1">Comment</CardTitle></CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit} >
              <Row className="input d-flex justify-content-start">
                <Col xs={10}>
                  <input type="text" className="form-control" placeholder="Type in your thought" />
                </Col>
                <Col xs={2}>
                  <button className="btn btn-primary" type="submit">Send</button>
                </Col>
              </Row>
            </form>
          </CardBody>
          <div className="my-2" style={{ overflowY: "auto", height: "65vh" }}>
            {comments && comments.length > 0 ? <>
              {comments.map((comment, index) => (
                <div key={index} className="ms-4">
                  <Message value={comment} />
                </div>
              ))}
            </> : <div className="fs-2 text-center fw-lighter">No comments</div>}
          </div>
        </Card>
      </div>
    </>
  );
};

export default TrackComment