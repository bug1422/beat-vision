import { TrackDto } from "@/types/ApplicationTypes/TrackType"
import { CartType } from "@/types/CartType"
import { GetTracksInCart } from "@/utils/handleCart"
import { useEffect, useState } from "react"
import { Col, Dropdown, DropdownMenu, DropdownToggle, Row } from "react-bootstrap"
import { FiShoppingCart } from "react-icons/fi"
import { Link } from "react-router-dom"

const Cart = (props: { userId: number | undefined }) => {
    const [tracks, SetTracks] = useState<TrackDto[] | undefined>()
    const [isLoading, SetIsLoading] = useState<boolean>(false)
    const [error, SetError] = useState<string>("")
    useEffect(() => {
        console.log(tracks)
    }, [tracks])

    return (
        <Dropdown as="div">
            <DropdownToggle
                as="a"
                className="nav-link arrow-none waves-light waves-effect"
            >
                <FiShoppingCart className="align-self-center topbar-icon" onClick={() => {
                    if (props.userId != undefined) {
                        SetIsLoading(true)
                        GetTracksInCart(props.userId).then((c) => { if (c != null) SetTracks(c); }).catch((e) => console.log(e)).finally(() => { SetIsLoading(false); });
                    }
                    else {
                        SetError("please log in again")
                    }
                }} />
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end dropdown-lg pt-0 topbar-cart">
                <h6 className="dropdown-item-text font-15 m-0 py-3 border-bottom d-flex justify-content-between align-items-center">
                    Carts <span className="badge bg-primary rounded-pill"></span>
                </h6>

                {!isLoading ? <div className="list">
                    {tracks?.map((track, index) => (
                        <ul key={index} className="navbar-nav ps-2">
                            <li className="nav-item my-2">
                                <Link to={"/music-detail/detail/" + track.Id} className="link">
                                    <Row>
                                        <Col xl={9} className="text-left">{track.TrackName}</Col>
                                        <Col xl={3} className="text-right">{track.Price?.toLocaleString('vn-VN', { style: 'currency', currency: 'VND' })}</Col>
                                    </Row>
                                </Link>
                            </li>
                        </ul>
                    ))}
                    {tracks?.map((track, index) => (
                        <ul key={index} className="navbar-nav ps-2">
                            <li className="nav-item my-2">
                                <Link to={"/music-detail/detail/" + track.Id} className="link">
                                    <Row>
                                        <Col xl={9} className="text-left">{track.TrackName}</Col>
                                        <Col xl={3} className="text-right">{track.Price?.toLocaleString('vn-VN', { style: 'currency', currency: 'VND' })}</Col>
                                    </Row>
                                </Link>
                            </li>
                        </ul>
                    ))}
                    {tracks?.map((track, index) => (
                        <ul key={index} className="navbar-nav ps-2">
                            <li className="nav-item my-2">
                                <Link to={"/music-detail/detail/" + track.Id} className="link">
                                    <Row>
                                        <Col xl={9} className="text-left">{track.TrackName}</Col>
                                        <Col xl={3} className="text-right">{track.Price?.toLocaleString('vn-VN', { style: 'currency', currency: 'VND' })}</Col>
                                    </Row>
                                </Link>
                            </li>
                        </ul>
                    ))}
                </div> : <div>{error != "" ? error : "LOADING"}</div>

                }
                <Link to={"/cart/"+props.userId} className="dropdown-item text-center text-primary view-all border-top">
                    View all <i className="fi-arrow-right"></i>
                </Link>
            </DropdownMenu>
        </Dropdown>
    )
}

export default Cart