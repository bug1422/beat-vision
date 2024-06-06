import { HttpClient } from "@/common"
import { useAuthContext } from "@/context";
import { TrackDto } from "@/types/ApplicationTypes/TrackType";
import { createRef, useEffect, useState } from "react";
import { AxiosResponse } from "axios"
import { Col, Row } from "react-bootstrap"

import DefaultBeatThumbnail from "/default-image/defaultSoundwave.jpg"
import { Link, useNavigate } from "react-router-dom";
import { Tag } from "../Search";
import { PageMetaData } from "@/components";
import { CartItemDto } from "@/types/ApplicationTypes/CartItemType";
import { toast } from "sonner";
import { CheckoutDto } from "@/types/ApplicationTypes/CheckoutType";

const Cart = () => {
    const { isAuthenticated, user } = useAuthContext()
    const [tracks, SetTracks] = useState<TrackDto[]>([])
    const [isLoading, SetIsLoading] = useState(false)
    const [isPaid, setPaid] = useState(false)
    const [isPurchased, setPurchased] = useState(false)
    const [error, SetError] = useState("")
    const navigate = useNavigate()
    useEffect(() => {
        GetTracksInCart()
    }, [])

    const GetTracksInCart = async () => {
        SetIsLoading(true)
        if (isAuthenticated && user?.userid) {
            try {
                const res: AxiosResponse<CartItemDto[]> =
                    await HttpClient.get("/api/ManageOrder/get-user-cart-items?userId=" + user?.userid)
                if (res?.data) {
                    let tempt: TrackDto[] = []
                    res?.data.forEach(p => {
                        if (p.Track) {
                            if (p.Track.Price && p.Track.Price > 0) setPaid(true)
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

    const removeFromCart = async (trackId: number) => {
        if (!isAuthenticated || user == undefined) navigate("/auth/login")
        else {
            try {
                const userId = user?.userid
                const res = await HttpClient.delete(`/api/ManageOrder/remove-cart-item?UserId=${userId}&ItemId=${trackId}`)
                if (res?.status == 200) {
                    toast.success("Removed from cart!", { position: "bottom-right", duration: 2000 })
                    const tempt = tracks.filter(p => p.Id != trackId)
                    SetTracks(tempt)
                }
            } catch (e: any) {
                if (e?.response.data.ErrorMessage) {
                    toast.error(e?.response.data.ErrorMessage, { position: "bottom-right", duration: 2000 })
                }
                console.log(e)
            }
        }
    }

    const checkOut = async () => {
        if (!isAuthenticated || user == undefined) navigate("/auth/login")
        else {

            try {
                const userId = user?.userid
                const res: AxiosResponse<CheckoutDto> = await HttpClient.post(`/api/ManageOrder/checkout`, {
                    userProfileId: userId,
                }, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                })
                console.log(res)
                if (res) {
                    if (isPaid) {
                        setPurchased(true)
                        setTimeout(() => {
                            const redirectURL = res.data.checkoutUrl
                            window.location.href = redirectURL
                        }, 3000)
                    }
                    else {
                        toast.success("Check your Purchases to see your downloadable content", { position: "bottom-right", duration: 2000 })
                        tracks.forEach(p => removeFromCart(p.Id))
                    }
                }
            } catch (e: any) {
                if (e?.response.data.ErrorMessage) {
                    toast.info(e?.response.data.ErrorMessage, { position: "bottom-right", duration: 2000 })
                }
                console.log(e)
            }
        }
    }

    return (<div className="cart">
        <PageMetaData title="Cart" />
        {!isPurchased ?
            <>
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
                                            <img className="img-fluid icon" src={track.ProfileBlobUrl ?? DefaultBeatThumbnail}></img>
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
                                                        {track.Price != null ? track.Price > 0 ? track.Price?.toLocaleString('vn-VN', { style: 'currency', currency: 'VND' }) : "Free" : "Null"}
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
                                        <div className="btn btn-primary purchase" onClick={checkOut}>Purchase</div>
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
            </> : <>
                <div className="text-center" style={{ fontSize: "32px", paddingTop: "35vh" }}>
                    <div className="fw-bold">Redirecting to checkout page...</div>
                </div>
            </>
        }
    </div>)
}

export default Cart