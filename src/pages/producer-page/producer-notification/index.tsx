import { HttpClient } from "@/common";
import {
  ButtonAllert3,
  ReturnDataOnClickEvent,
  SimpleAllertTopRight,
} from "@/my-component/ButtonAllert";

import { MessageDto, MessageType, MessageWeigth } from "@/types/ApplicationTypes/MessageType";
import { PagingResponseDto } from "@/types/ApplicationTypes/PagingResponseType";
import axios, { AxiosResponse } from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Pagination,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CreateNotificationForm from "./component/createNotificationForm";

// const MockNotificationList: MessageDto[] = [
//   {
//     Id: 1,
//     Content: "server noti",
//     CreatedDate: "2024-05-31 14:23:53.2825894",
//     IsServerNotification: true,
//     MessageName: "notification 1",
//     CreatorId: -1,
//     Type: MessageType.ALL,
//     Weight: MessageWeigth.MAJOR,
//   },
//   {
//     Id: 2,
//     Content: "server noti",
//     CreatedDate: "2024-05-31 14:23:53.2825894",
//     IsServerNotification: true,
//     MessageName: "notification 2",
//     CreatorId: -1,
//     Type: MessageType.GROUP,
//     Weight: MessageWeigth.MAJOR,
//   },
//   {
//     Id: 3,
//     Content: "server noti",
//     CreatedDate: "2024-05-31 14:23:53.2825894",
//     IsServerNotification: true,
//     MessageName: "notification 3",
//     CreatorId: -1,
//     Type: MessageType.SINGLE,
//     Weight: MessageWeigth.MAJOR,
//   },
// ];
export default function ProducerNotification() {
  const [messageList, setMessageList] = useState<MessageDto[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [pageSize, _setPageSize] = useState(4);
  const [typeSort, _setTypeSort] = useState<MessageType | null>(null);
  const [isOrderDate, _setIsOrderDate] = useState(false);
  const [isShowCreateForm, setIsShowCreateForm] = useState(false);
  const navigate = useNavigate();
  const { onResult } = SimpleAllertTopRight();
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
    let baseUrl = `/api/ManageNotification/server-get-range?start=${currentPage}&take=${pageSize}`;
    if (isOrderDate) {
      baseUrl.concat(`&orderDate=true`);
    }
    if (typeSort != null) {
      baseUrl.concat(`$type=${typeSort}`);
    }
    try {
      const res: AxiosResponse<PagingResponseDto<MessageDto[]>> = await HttpClient.get(baseUrl);
      if (!res.data) {
        throw new Error("fail to fetch data");
      }
      let dataBody = res.data;
      console.log(dataBody);
      let totalItemCount = dataBody.TotalCount;
      let totalTracks = dataBody.Value;
      console.log(totalTracks);
      setMessageList(totalTracks);
      setTotalPage(Math.ceil(totalItemCount / pageSize));
    } catch (error: any) {
      console.log(error);
      // if (error?.response?.data?.ErrorMessage) {
      //   setError(error?.response?.data?.ErrorMessage);
      // }
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
  const onRemoveMessageClick = async (messageId: number): Promise<boolean> => {
    if (messageId == null || messageId == 0 || messageId == undefined) {
      onResult(false, "message id is error");
      return false;
    }
    let baseUrl = `/api/ManageNotification/delete-message?messageId=${messageId}`;
    try {
      const res: AxiosResponse<PagingResponseDto<MessageDto[]>> = await HttpClient.delete(baseUrl);
      if(res){}
      onResult(true, "delete successfully");
      return true;
    } catch (err: any) {
      onResult(false, "fail to delete");
      return false;
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
        <Row>
          <CreateNotificationForm isShow={isShowCreateForm} setShowing={setIsShowCreateForm} />
          <Button
            variant="outline-primary"
            className="m-2"
            onClick={() => setIsShowCreateForm(true)}
          >
            create message
          </Button>
        </Row>
        <Row className="d-flex justify-content-center">
          <Col xs={10}>
            <div className="table-responsive">
              <table className="table mb-0">
                <thead className="thead-light">
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>content</th>
                    <th>Type</th>
                    <th>Weight</th>
                    <th>CreateDate</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {messageList.map((message) => (
                    <>
                      <tr>
                        <th scope="row">{message.Id}</th>
                        <td>{message.MessageName}</td>
                        <td>{message.Content}</td>
                        <td>
                          <NotiTypeBadge type={message.Type} />
                          {/* <span className="badge badge-boxed  badge-outline-success">Business</span> */}
                        </td>
                        <td>
                          <NotiWeightBadge type={message.Weight} />
                        </td>
                        <td>
                          {format(new Date(message.CreatedDate as string), "yyyy-MM-dd HH:mm:ss")}
                        </td>
                        <td className="text-end">
                          <Dropdown className="d-inline-block">
                            <DropdownToggle variant="link" id="dropdown-basic">
                              <i className="las la-ellipsis-v font-20 text-muted" />
                            </DropdownToggle>

                            <DropdownMenu>
                              <DropdownItem href="#">
                                <ButtonAllert3
                                  item={message}
                                  onClickEvent={async (
                                    message: MessageDto
                                  ): Promise<ReturnDataOnClickEvent> => {
                                    console.log(message);
                                    let result = await onRemoveMessageClick(message.Id);
                                    if (result) {
                                      return {
                                        result: true,
                                        successMessage: "yea work",
                                      };
                                    } else {
                                      return {
                                        result: false,
                                        successMessage: "not work",
                                      };
                                    }
                                  }}
                                  text="pull down"
                                  // className={.IsPublished ? "w-100" : " w-100"}
                                ></ButtonAllert3>
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            {messageList.map((message) => (
              <>{message.Content}</>
            ))}
          </Col>
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
interface NotiBadgeProp {
  type: MessageType;
}
function NotiTypeBadge({ type }: NotiBadgeProp) {
  switch (type) {
    case MessageType.ALL:
      return (
        <>
          <span className="badge badge-boxed  badge-outline-success">All</span>
        </>
      );
    case MessageType.GROUP:
      return (
        <>
          <span className="badge badge-boxed  badge-outline-warning">Group</span>
        </>
      );
    case MessageType.SINGLE:
      return (
        <>
          <span className="badge badge-boxed  badge-outline-danger">single</span>
        </>
      );
    default:
      return <>none</>;
  }
}
interface NotiTypeBadgeProp {
  type: MessageWeigth;
}
function NotiWeightBadge({ type }: NotiTypeBadgeProp) {
  switch (type) {
    case MessageWeigth.MINOR:
      return (
        <>
          <span className="badge badge-boxed  badge-outline-success">minor</span>
        </>
      );
    case MessageWeigth.MAJOR:
      return (
        <>
          <span className="badge badge-boxed  badge-outline-warning">major</span>
        </>
      );
    default:
      return <>none</>;
  }
}
