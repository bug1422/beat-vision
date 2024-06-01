import { useAuthContext } from "@/context";
import { TrackDto } from "@/types/ApplicationTypes/TrackType";
import { GetTracksInCart, RemoveItemFromCart } from "@/utils/handleCart";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap"
import DefaultBeatThumbnail from "/default-image/defaultSoundwave.jpg"
import { Link, useNavigate } from "react-router-dom";
import { Tag } from "../Search";
import { PageMetaData } from "@/components";

const Cart = () => {
    const { isAuthenticated, user } = useAuthContext()
    const [tracks, setTracks] = useState<TrackDto[]>()
    const [isLoading, SetIsLoading] = useState<boolean>(false)
    const navigate = useNavigate()
    useEffect(() => {
        if (!isAuthenticated || user == undefined) navigate("/auth/login")
        else {
            SetIsLoading(true)
            GetTracksInCart(parseInt(user.userid)).then((c) => { if (c != null) setTracks(c); }).catch((e) => console.log(e)).finally(() => { SetIsLoading(false); });
        }
    }, [])

    const removeFromCart = (trackId: number) => {
        if (!isAuthenticated || user == undefined) navigate("/auth/login")
        else {
            RemoveItemFromCart(parseInt(user.userid), trackId).then((c) => {
                if (c == "Success") {
                    if (tracks != undefined) {
                        const filtered = tracks.filter(p => p.Id !== trackId)
                        setTracks([...filtered])
                        console.log(tracks)
                    }
                }
            }
            ).catch((e) => console.log(e));
        }
    }
    return (<div className="cart">
        <PageMetaData title="Cart"/>
        <div className="fst-bold title my-3">
            Shopping Cart
        </div>
        <Row className="d-flex justify-content-center">
            <Col xl={8} className="px-3">
                {isLoading ? <div className="title">Loading...</div> : <>{(tracks && tracks?.length > 0) ?
                    <div className="cart-body pt-2 d-flex flex-column">
                        {tracks.map((track, index) => (
                            <Row className="track align-items-center py-4 border-top" key={index} >

                                <Col xl={1} className="d-flex">
                                    <div className="rank">{index + 1} </div>
                                </Col>
                                <Col xl={1}>
                                    <img className="img-fluid icon" src={DefaultBeatThumbnail}></img>
                                </Col>
                                <Col className="d-flex justify-content-between">
                                    <div className="desc1 d-flex flex-column">
                                        <Link to={"/music-detail/detail/" + track.Id} className="name">{track.TrackName}</Link>
                                    </div>
                                    <div className="d-flex flex-column">
                                        <div className="d-flex align-items-center">
                                            <Tag className="py-2 me-2" name="Trap" />
                                            <Tag className="py-2 me-2" name="Hard Beat" />
                                            <div className="me-2 price">
                                                {track.Price?.toLocaleString('vn-VN', { style: 'currency', currency: 'VND' })}
                                            </div>
                                        </div>
                                        <div className="me-2 d-flex justify-content-end"><u className="remove" onClick={() => { removeFromCart(track.Id) }}>remove</u></div>
                                    </div>
                                </Col>
                            </Row>
                        ))}
                        <div className="border-top d-flex flex-column align-items-end">
                            <div className="d-flex pt-3 pe-2">
                                <div className="total d-flex">
                                    <div className="me-2 fw-bold">Total: </div>
                                    <div>{
                                        (tracks.reduce((p, v) => p += v.Price ?? 0, 0)).toLocaleString('vn-VN', { style: 'currency', currency: 'VND' })
                                    }</div>
                                </div>
                            </div>
                            <div className="mt-3">
                                <Link to={"/checkout/"+user?.userid}><div  className="btn btn-primary purchase">Purchase</div></Link>
                            </div>
                        </div>
                    </div> :
                    <div className="cart-empty text-center py-5">
                        <div className="title">
                            Your cart is empty
                        </div>
                    </div>
                }</>}
            </Col>
        </Row>
    </div>)
}

export default Cart