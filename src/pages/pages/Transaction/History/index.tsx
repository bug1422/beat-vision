import { HttpClient } from "@/common"
import { OrderStatus, OrderType } from "@/types/ApplicationTypes/OrderItemType"
import { TrackDto } from "@/types/ApplicationTypes/TrackType"
import { AxiosResponse } from "axios"
import { createRef, useEffect, useRef, useState } from "react"
import { Button, Col, Pagination, Row } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import { toast } from "sonner"

const PaymentHistory = () => {
    const { userId } = useParams()
    const [error, setError] = useState("")
    const [orders, setOrders] = useState<OrderType[]>([])
    const itemPerPage = 5
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const downloadRef = createRef<HTMLAnchorElement>();

    useEffect(() => {
        if (userId) {
            GetPaymentHistory()
        }
        else setError("Can't get data")
    }, [])

    useEffect(() => {
        if (userId) {
            GetPaymentHistory()
        }
    }, [currentPage])

    const GetPaymentHistory = async () => {
        try {
            const res: AxiosResponse<OrderType[]> = await
                HttpClient.get(`/api/ManageOrder/get-order-range?userProfileId=${userId}&start=${currentPage * itemPerPage}&take=${itemPerPage}`)
            if (res) {
                console.log(res)
                setOrders(res.data)
            }
        }
        catch (e: any) {
            console.log(e)
        }
    }
    const HandleDownload = async (orderId: number, itemId: number, curr: EventTarget & HTMLAnchorElement) => {

        try {
            const res: AxiosResponse = await
                HttpClient.post(`/api/ManageTrack/download-bought-content`, {
                    userProfileId: parseInt(userId),
                    orderId: orderId,
                    itemId: itemId
                })
            if (res) {
                let url = URL.createObjectURL(new Blob([res.data]))
                console.log(url)
                downloadRef.current?.setAttribute("href", url)
                downloadRef.current?.setAttribute("target", "_blank")
                downloadRef.current?.setAttribute("donwload", "audio.zip")
                downloadRef.current?.click()
                downloadRef.current?.setAttribute("href", "")
                window.URL.revokeObjectURL(url);
                toast.info("Content downloading", { position: "bottom-right", duration: 2000 })
            }
        }
        catch (e: any) {
            console.log(e)
            toast.error("Can't download right now", { position: "bottom-right", duration: 2000 })
        }
    }

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

    return (<>
        {
            error != "" ? <div className="text-danger text-center mt-5" style={{ fontSize: "52px" }}>{error}</div> :
                <>
                    <Row className="d-flex justify-content-center mt-5">
                        <Col lg={10}>
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Order At</th>
                                            <th>Price</th>
                                            <th>Track</th>
                                            <th>Options</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((order, idx) => {
                                            return (
                                                <>
                                                    {order.OrderItems.map((item, idx) => {
                                                        return (
                                                            <tr key={idx}>
                                                                <td>{order.Id}</td>
                                                                <td>
                                                                    <p className="d-inline-block align-middle mb-0 ms-1">
                                                                        {new Date(order.CreateDate).toLocaleDateString("vn-VN")}
                                                                        <br />
                                                                        <span className="text-muted font-13">
                                                                            {order.Status}
                                                                        </span>
                                                                    </p>
                                                                </td>
                                                                <td> {order.Price != null ? order.Price > 0 ? order.Price?.toLocaleString('vn-VN', { style: 'currency', currency: 'VND' }) : "Free" : "Null"}</td>
                                                                <td>
                                                                    <ul className="list-inline mb-0">
                                                                        <li
                                                                            key={idx}
                                                                            className="list-inline-item align-middle"
                                                                        >
                                                                            {item.TrackName}
                                                                        </li>
                                                                    </ul>
                                                                </td>
                                                                <td>
                                                                    {order.Status == OrderStatus[OrderStatus.PAID] ? <>
                                                                        <a className="btn btn-info" onClick={(e) => { HandleDownload(parseInt(order.Id), item.Id, e.currentTarget) }}>Download</a>
                                                                    </> : <></>}
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                </>

                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </Col>
                        <div>
                            <Row className="d-flex justify-content-center align-content-center">
                                <div>
                                    <Pagination className="d-flex justify-content-center">{renderPaging()}</Pagination>
                                </div>
                            </Row>
                        </div>
                    </Row>
                    <a ref={downloadRef} />
                </>
        }
    </>)
}
export default PaymentHistory


