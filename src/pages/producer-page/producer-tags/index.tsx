import { TagDto } from "@/types/ApplicationTypes/TagType";
import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Col, Form, FormLabel, ListGroup, Nav, NavItem, NavLink, Pagination, Row, TabContainer, TabContent, TabPane } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ButtonAllert2, SimpleAllertTopRight } from "@/my-component/ButtonAllert";
import { HttpClient } from "@/common";
import { AxiosResponse } from "axios";
import { FormTextInput } from "@/components";
import { handleTags } from "./handleTags";
export default function ProducerTags() {
  const [tags, setTags] = useState<TagDto[]>([]);
  const [filtered, setFiltered] = useState<TagDto[]>([]);
  const [search, setSearch] = useState("");
  const { onResult } = SimpleAllertTopRight();
  const { loading, res, control, addTag, fetchTags, deletingTag } = handleTags()
  const deleteTag = async (tagId: number) => {
    let delteResult = await deletingTag(tagId)
    console.log(delteResult);
    onResult(delteResult);
    getTags()
  };
  const getTags = async () => {
    try {
      let tags = await fetchTags()
      if (tags != undefined) {
        setTags(tags);
        setFiltered(tags);
      }
    } catch (err: any) { }
  };
  useEffect(() => {
    setFiltered(tags.slice().filter(p => p.Name.toLowerCase().includes(search.toLowerCase())))
  }, [search]);

  useEffect(() => {
    getTags()
  }, [])


  return (
    <>
      <div className="fs-1 border-bottom mb-3">Tag Management</div>
      <Row>
        <Col xs={12}>
          <Row>
            <Col>
              <Card>
                <CardHeader className="text-primary">Add Tag</CardHeader>
                <CardBody>
                  <form onSubmit={addTag}>
                    <Row>
                      <Col xs={8}>
                        <FormTextInput
                          name="Name"
                          placeholder="Enter new tag here"
                          control={control}
                        />
                      </Col>
                      <Col >
                        <Button
                          variant="primary"
                          className="w-100 waves-effect waves-light"
                          type="submit"
                          disabled={loading}
                        >
                          Add
                        </Button>
                      </Col>
                    </Row>
                  </form>
                </CardBody>
              </Card>
            </Col>
            <Col xs={8}>
              <Card>
                <CardHeader>
                  Tags Info
                </CardHeader>
                <CardBody>
                  <div className="fs-3">
                    Total Tags: {tags.length}
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {loading ? <div>Loading</div> : <Row className="d-flex justify-content-center ">
            <Col xs={5}>
              <div className="mb-2"><input onChange={(e) => { setSearch(e.target.value) }} placeholder="Search for tag" className="form-control" type="text" /></div>
              {filtered && filtered.length > 0 ? <ListGroup>
                {filtered.map((tag, idx) => (
                  <div key={idx}>
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
                  </div>
                ))}
              </ListGroup> : <>No Tags found</>}
            </Col>
          </Row>}
        </Col>
      </Row>
    </>
  );
}
