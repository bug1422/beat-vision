import { HttpClient } from "@/common"
import { CartItemDto } from "@/types/ApplicationTypes/CartItemType"
import { TrackDto } from "@/types/ApplicationTypes/TrackType"
import { AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import { Col, Dropdown, DropdownMenu, DropdownToggle, Row } from "react-bootstrap"
import { FiShoppingCart } from "react-icons/fi"
import { Link } from "react-router-dom"

const Cart = (props: { userId: number | undefined }) => {
    const [tracks, SetTracks] = useState<TrackDto[]>([])
    const [isLoading, SetIsLoading] = useState<boolean>(false)
    const [error, SetError] = useState<string>("")
    useEffect(() => {
    }, [tracks])
    useEffect(() => {
        GetTracksInCart()
    }, [])

    const GetTracksInCart = async () => {
        SetIsLoading(true)
        if (props.userId != undefined) {
            try {
                const res: AxiosResponse<CartItemDto[]> =
                    await HttpClient.get("/api/ManageOrder/get-user-cart-items?userId=" + props.userId)
                if (res?.data) {
                    let tempt: TrackDto[] = []
                    res?.data.forEach(p => {
                        if (p.Track) {
                            tempt = [...tempt, p.Track]
                        }
                    })
                    SetTracks(tempt)
                }
            } catch (e: any) {
                console.log(e)
            }
        }
        else {
            SetError("please log in again")
        }
        SetIsLoading(false)
    }

    return (
        <Dropdown as="div">
            <DropdownToggle
                as="a"
                className="nav-link arrow-none waves-light waves-effect"
            >
                <FiShoppingCart className="text-warning align-self-center topbar-icon" onClick={() => {
                    GetTracksInCart()
                }} />
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end dropdown-lg pt-0 topbar-cart">
                <h6 className="dropdown-item-text font-15 m-0 py-3 border-bottom d-flex justify-content-between align-items-center">
                    Carts <span className="badge bg-primary rounded-pill"></span>
                </h6>

                {!isLoading ? <div className="list">
                    <ul className="navbar-nav ps-2">
                        {tracks?.map((track, index) => (
                            <li key={index} className="nav-item my-2 w-100">
                                <Link to={"/music-detail/detail/" + track.Id} className="link">
                                    <Row >
                                        <Col xs={9} className="text-left text-nowrap">{track.TrackName.slice(0, 24) + "..."}</Col>
                                        <Col xs={3} className="text-right">{track.Price != null ? track.Price > 0 ? track.Price?.toLocaleString('vn-VN', { style: 'currency', currency: 'VND' }) : "Free" : "Null"}</Col>
                                    </Row>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div> : <div>{error != "" ? error : "LOADING"}</div>

                }
                <Link to={"/cart"} className="dropdown-item text-center text-primary view-all border-top text-warning">
                    View all <i className="fi-arrow-right text-warning"></i>
                </Link>
            </DropdownMenu>
        </Dropdown>
    )
}

export default Cart