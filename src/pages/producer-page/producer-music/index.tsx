import ProducerMusicCard, { ProducerMusicCardType } from "./component/musicUploadedCard";
import defautAudioImage from "../../../../public/default-image/defaultSoundwave.jpg";
import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import MusicUploadForm from "./component/musicUploadForm";

const MockProducerMusicItem: ProducerMusicCardType[] = [
  {
    id: 1,
    imageUrl: defautAudioImage,
    isAudioPrivate: true,
    isPublished: false,
    name: "my first ",
    PlayCount: 25,
    price: 0,
    Status: "NOT_FOR_PUBLISH",
    IsAudioForSale: false,
    tags: ["country", "hardrock", "blues", "indie"],
  },
  {
    id: 2,
    imageUrl: defautAudioImage,
    isAudioPrivate: true,
    isPublished: false,
    name: "my first ",
    PlayCount: 25,
    price: 50000,
    IsAudioForSale: true,
    Status: "PUBLISHED",
    tags: ["country", "hardrock", "blues", "indie"],
  },
  {
    id: 3,
    imageUrl: defautAudioImage,
    isAudioPrivate: true,
    isPublished: false,
    name: "my first ",
    PlayCount: 25,
    price: 0,
    IsAudioForSale: false,
    Status: "WAIT_FOR_PUBLISH",
    tags: ["country", "hardrock", "blues", "indie"],
  },
  {
    id: 4,
    imageUrl: defautAudioImage,
    isAudioPrivate: false,
    isPublished: false,
    name: "my first (removed)",
    PlayCount: 25,
    price: 0,
    IsAudioForSale: false,
    Status: "REMOVED",
    tags: ["country", "hardrock", "blues", "indie"],
  },
  {
    id: 5,
    imageUrl: defautAudioImage,
    isAudioPrivate: true,
    isPublished: false,
    name: "my first ",
    PlayCount: 25,
    price: 0,
    IsAudioForSale: false,
    Status: "NOT_FOR_PUBLISH",
    tags: ["country", "hardrock", "blues", "indie"],
  },
];

export default function ProducerMusics() {
  const [producerMusics, setProducerMusic] = useState(MockProducerMusicItem);
  const [isShowForm, setIsShowForm] = useState(false);
  return (
    <>
      <div>
        <MusicUploadForm
          isShow={isShowForm}
          onHide={() => setIsShowForm(false)}
          onSubmit={() => {}}
        />
        <Button onClick={() => setIsShowForm(!isShowForm)}>upload</Button>
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
      </div>
    </>
  );
}
