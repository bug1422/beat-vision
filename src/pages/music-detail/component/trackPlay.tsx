import { Button, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import sampleAudio1 from "../../../assets/audio/defaultAudio.mp3";
import sampleAudio2 from "../../../assets/audio/defaultAudio2.mp3";
import someRandomHeart from "/heart_1077035.png";
import _AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

import WaveSurfer from "wavesurfer.js";
type TrackType = {
  url: string;
  title: string;
};
const DefaultAudioArray = [
  {
    url: sampleAudio1,
    title: "sample 1",
  },
  {
    url: sampleAudio2,
    title: "sample 2",
  },
];
export default function TrackPlay() {
  // const [audioList, setAudioList] = useState<Array<TrackType>>(DefaultAudioArray);
  const [isPlay, setIsPlay] = useState(false);
  const audioContainer = useRef<HTMLElement>(null);
  const waveSurferRef = useRef<WaveSurfer | null>(null);
  const [currentlySelectAudio, _setCurrentlySelectAudio] = useState<TrackType>(DefaultAudioArray[0]);
  const [volume, SetVolume] = useState("100");
  useEffect(() => {
    if (audioContainer.current) {
      // Ensure the previous instance is destroyed before creating a new one
      if (waveSurferRef.current) {
        waveSurferRef.current.destroy();
      }
      waveSurferRef.current = WaveSurfer.create({
        container: audioContainer.current,
        waveColor: "rgb(200, 0, 200)",
        progressColor: "rgb(100, 0, 100)",
        barWidth: 2,
        barGap: 1,
        barRadius: 2,
        height: 50,
        url: currentlySelectAudio.url,
      });
      return () => {
        if (waveSurferRef.current) {
          waveSurferRef.current.destroy();
          waveSurferRef.current = null;
        }
      };
    }
  }, []);
  return (
    <>
      <div className="border">
        <Row className="border border-secondary">
          <div className="d-flex">
            <Button
              className="m-1"
              onClick={() => {
                setIsPlay(!isPlay);
                waveSurferRef.current?.playPause();
              }}
            >
              Play
            </Button>
            <div
              className="m-1 border border-secondary "
              ref={audioContainer as MutableRefObject<HTMLDivElement>}
              style={{ width: "100%" }}
            ></div>
          </div>
        </Row>
        <Row className="border border-secondary">
          <div className="m-2 d-flex justify-content-between ">
            <div className="d-flex flex-column  justify-content-center ">
              <div className="d-flex flex-row align-items-center  ">
                <img src={someRandomHeart} className="square-icon me-2 "></img>
                <div className="ms-1 me-1">
                  <p className="m-0">
                    <strong>Song name</strong>
                  </p>
                  <p className="m-0">
                    <span>producer </span>
                    <span> |</span>
                    <span>18 play</span>
                  </p>
                </div>
                <div>
                  <Button className="rounded-circle me-1">+</Button>
                  <Button className="rounded-circle">...</Button>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center p-1 ">
              <Button
                className="me-1"
                onClick={(_event) => {
                  let timeNow = waveSurferRef.current?.getCurrentTime() as number;
                  let totalTime = waveSurferRef.current?.getDuration() as number;
                  waveSurferRef.current?.seekTo((timeNow + 5) / totalTime);
                }}
              >
                {" "}
                &lt;&lt;{" "}
              </Button>
              <Button
                className="me-1"
                onClick={(_event) => {
                  waveSurferRef.current?.playPause();
                }}
              >
                Play
              </Button>
              <Button
                className="me-1"
                onClick={(_event) => {
                  let timeNow = waveSurferRef.current?.getCurrentTime() as number;
                  let totalTime = waveSurferRef.current?.getDuration() as number;
                  waveSurferRef.current?.seekTo((timeNow + 5) / totalTime);
                }}
              >
                {" "}
                &gt;&gt;{" "}
              </Button>
            </div>
            <input
              type="range"
              onChange={(event) => {
                SetVolume(event.target.value);
              }}
              min="0"
              max="100"
              value={volume}
            ></input>
          </div>
        </Row>
      </div>
    </>
  );
}
