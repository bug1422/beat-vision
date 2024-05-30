import { TagDto } from "@/types/ApplicationTypes/TagType";
import { useEffect, useState } from "react";
import { Button, Col, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateTagForm from "./component/CreateTagForm";
import { ButtonAllert2, SimpleAllertTopRight } from "@/my-component/ButtonAllert";
import { HttpClient } from "@/common";
import { AxiosResponse } from "axios";
export default function ProducerTags() {
  const [tags, setTags] = useState<TagDto[]>([]);
  const [isShowCreateForm, setIsShowCreateForm] = useState(false);
  const { onResult } = SimpleAllertTopRight();
  const deleteTag = async (tagId: number) => {
    try {
      let deletResult: AxiosResponse = await HttpClient.delete(`/api/ManageTag/${tagId}`, {});
      console.log(deletResult);
      onResult(true);
      window.location.reload();
    } catch (err: any) {
      onResult(false);
    } finally {
    }
  };
  const getTags = async () => {
    try {
      let getResult: AxiosResponse<TagDto[]> = await HttpClient.get(`/api/ManageTag`, {});
      let tags = getResult.data;
      setTags(tags);
    } catch (err: any) {}
  };
  useEffect(() => {
    getTags();
  }, []);
  return (
    <>
      <div className="">
        <CreateTagForm
          isShow={isShowCreateForm}
          onHide={() => setIsShowCreateForm(false)}
          onSubmit={() => {
            console.log("yea submit");
            setIsShowCreateForm(false);
          }}
        />
        <Row className="d-flex mt-2"></Row>
        <Row className="d-flex justify-content-center ">
          <Col xs={10} className="mb-2">
            <Button
              value=""
              variant="outline-primary"
              onClick={() => setIsShowCreateForm(!isShowCreateForm)}
            >
              Create
            </Button>
          </Col>
          <Col xs={10}>
            <ListGroup>
              {tags.map((tag, idx) => (
                <>
                  <Link
                    to="#"
                    className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                  >
                    <div className="d-flex flex-row align-items-center">
                      <i className="la la-hand-o-right text-primary me-2" />
                      <span>ID: {tag.Id} &nbsp; | &nbsp;</span>
                      <span> Name: {tag.Name}</span>
                    </div>
                    <ButtonAllert2
                      item={tag}
                      text="Delete"
                      onClickEvent={async (item: TagDto) => {
                        console.log("delete the tag with id: " + item.Id);
                        await deleteTag(tag.Id);
                        return true;
                      }}
                    />
                  </Link>
                </>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </div>
    </>
  );
}
