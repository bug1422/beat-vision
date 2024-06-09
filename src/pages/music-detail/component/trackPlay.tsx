import { Button, Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import _AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

import WaveSurfer from "wavesurfer.js";
import { AxiosResponse } from "axios";
import { HttpClient } from "@/common";
import { FiPlayCircle, FiStopCircle, FiVolumeX, FiVolume, FiVolume1, FiVolume2 } from "react-icons/fi";
import FormRange from "react-bootstrap/esm/FormRange";

export default function TrackPlay(props: { trackId: number, price: number }) {
  const [trackId, _setTrackId] = useState(props.trackId)
  const [fileURL, setFileURL] = useState("")
  // const [audioList, setAudioList] = useState<Array<TrackType>>(DefaultAudioArray);
  const [isPlaying, setPlaying] = useState(false);
  const audioContainer = useRef<HTMLElement>(null);
  const waveSurferRef = useRef<WaveSurfer | null>(null);

  const [isMuted, setMuted] = useState<boolean>(false)
  const [volumne, setVolume] = useState<number>(0)

  const FetchFile = async () => {
    try {
      const res: AxiosResponse<Blob> =
        await HttpClient.get("/api/ManageTrack/get-public-trackfile", {
          params: {
            trackId: trackId
          },
          headers: {
            "Content-Type": "audio/mpeg",
          },
          responseType: "blob"
        })
      if (res) {
        setFileURL(URL.createObjectURL(res?.data))
      }
    }
    catch (e: any) {
      console.log(e)
    }
  }

  const AddPlayCount = async () => {
    try {
      const res: AxiosResponse<Blob> =
        await HttpClient.get("/api/ManageTrack/plus-play-count", {
          params: {
            trackId: trackId
          }
        })
      if(res){}
    }
    catch (e: any) {
      console.log(e)
    }
  }

  useEffect(() => {
    FetchFile()
  }, [trackId])

  useEffect(() => {
    setPlaying(false)
    if (audioContainer.current) {
      // Ensure the previous instance is destroyed before creating a new one
      if (waveSurferRef.current) {
        waveSurferRef.current.destroy();
      }
      waveSurferRef.current = WaveSurfer.create({
        container: audioContainer.current,
        waveColor: "rgb(0, 0, 0)",
        progressColor: "rgb(66, 135, 245)",
        barWidth: 2,
        barGap: 1,
        barRadius: 2,
        height: 50,
        url: fileURL,
      });
      waveSurferRef.current.on("timeupdate", (time) => {
        let totaltime = waveSurferRef.current?.getDuration() as number;
        let percentage = time / totaltime;
        if (percentage < 0) {
          percentage = 0;
        }
        if (percentage > 100) {
          percentage = 100;
        }
      });
      // waveSurferRef.current.on('')
      return () => {
        if (waveSurferRef.current) {
          waveSurferRef.current.destroy();
          waveSurferRef.current = null;
        }
      };
    }
  }, [fileURL]);

  function SetPlaying(value: boolean) {
    if (value) {
      var playPromise = waveSurferRef.current?.play();
      if (playPromise != undefined) {
        playPromise
          .then(_ => { setPlaying(true) })
          .catch((e: any) => { console.log(e); })
      }
    }
    else {
      waveSurferRef.current?.pause()
      setPlaying(false)
    }
  }

  return (
    <>
      <div className="track-play">
        <Row className="border box">
          <div className="d-flex">
            <div className="icon me-3" onClick={() => { SetPlaying(!isPlaying); AddPlayCount() }}>
              {!isPlaying ? <FiPlayCircle /> : <FiStopCircle />}
            </div>
            <div
              className="my-1"
              ref={audioContainer as MutableRefObject<HTMLDivElement>}
              style={{ width: "100%" }}
            ></div>
          </div>
        </Row>
        <Row className="">
          <Col xl={8} className="d-flex justify-content-start align-items-center">
            <div className="volumne" onClick={() => { waveSurferRef.current?.setMuted(!isMuted); setMuted(!isMuted); }}>
              {
                isMuted ? <div className="icon"><FiVolumeX /></div> : (
                  volumne <= 25 ? <div className="icon"><FiVolume /> </div> : (
                    volumne <= 75 ? <div className="icon"><FiVolume1 /></div> : (
                      <div className="icon"><FiVolume2 /></div>
                    )
                  )
                )
              }
            </div>
            <div className="volumne-bar align-items-center me-4 mt-2">
              <FormRange min={0} max={100} onChange={(e) => {
                let value = parseInt(e.target.value)
                if (isMuted && value < volumne) {
                  waveSurferRef.current?.setVolume(value / 100)
                  setVolume(value)
                }
                else {
                  setMuted(false)
                  waveSurferRef.current?.setMuted(false)
                  waveSurferRef.current?.setVolume(value / 100)
                  setVolume(value)
                }
              }} className="ms-2" />
            </div>
          </Col>
          <Col>
            <div className="d-flex justify-content-end pt-1 align-items-center">
              <span className="me-2 d-flex pt-2">
                <p className="me-2">total:</p>
                <p className="m-0">
                  <strong>{props.price != null ? props.price > 0 ? props.price?.toLocaleString('vn-VN', { style: 'currency', currency: 'VND' }) : "Free" : "Null"}</strong>
                </p>
              </span>
              <Button>Add To Card</Button>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
