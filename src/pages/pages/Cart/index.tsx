import { HttpClient } from "@/common";
import { useAuthContext } from "@/context";
import { TrackDto } from "@/types/ApplicationTypes/TrackType";
import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { Col, Row } from "react-bootstrap";

import DefaultBeatThumbnail from "/default-image/defaultSoundwave.jpg";
import { Link, useNavigate } from "react-router-dom";
import { Tag } from "../Search";
import { PageMetaData } from "@/components";
import { CartItemDto } from "@/types/ApplicationTypes/CartItemType";
import { toast } from "sonner";
import { CheckoutDto } from "@/types/ApplicationTypes/CheckoutType";
import httpClientAuth from "@/common/helpers/httpClientAuth";
import { UserProfileDto } from "@/types/ApplicationTypes/UserProfileType";
import httpClient from "@/common/helpers/httpClient";
import { getCookie } from "cookies-next";

const Cart = () => {
  const { isAuthenticated, user, removeSession } = useAuthContext();
  const [tracks, SetTracks] = useState<TrackDto[]>([]);
  const [sum, setSum] = useState("");
  const [isLoading, SetIsLoading] = useState(false);
  const [isPaid, setPaid] = useState(false);
  const [isPurchased, setPurchased] = useState(false);
  const [_error, SetError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    GetTracksInCart();
  }, []);

  const GetTracksInCart = async () => {
    SetIsLoading(true);
    if (isAuthenticated && user?.userid) {
      try {
        const get: AxiosResponse<UserProfileDto> = await HttpClient.get(
          "/api/ManageUser/identity/" + user?.userid
        );
        const userProfileId = get.data.Id;
        const res: AxiosResponse<CartItemDto[]> = await HttpClient.get(
          "/api/ManageOrder/get-user-cart-items?userId=" + userProfileId
        ); //user?.userid)
        if (res?.data) {
          let tempt: TrackDto[] = [];
          res?.data.forEach((p) => {
            if (p.Track) {
              if (p.Track.Price && p.Track.Price > 0) setPaid(true);
              tempt = [...tempt, p.Track];
            }
          });
          SetTracks(tempt);
        }
      } catch (e: any) {
        console.log(e);
      }
    } else {
      SetError("please log in again");
    }
    SetIsLoading(false);
  };
  useEffect(() => {
    let i = tracks.reduce((p, v) => (p += v.Price ?? 0), 0);
    if (i > 0) setSum(i.toLocaleString("vn-VN", { style: "currency", currency: "VND" }));
    else setSum("Free");
  }, [tracks]);
  const removeFromCart = async (trackId: number) => {
    if (!isAuthenticated || user == undefined) navigate("/auth/login");
    else {
      try {
        const get: AxiosResponse<UserProfileDto> = await HttpClient.get(
          "/api/ManageUser/identity/" + user?.userid
        );
        const userProfileId = get.data.Id;
        const userId = userProfileId; //user?.userid;
        const res = await HttpClient.delete(
          `/api/ManageOrder/remove-cart-item?UserId=${userId}&ItemId=${trackId}`
        );
        if (res?.status == 200) {
          toast.success("Removed from cart!", { position: "bottom-right", duration: 2000 });
          const tempt = tracks.filter((p) => p.Id != trackId);
          SetTracks(tempt);
        }
      } catch (e: any) {
        if (e?.response.data.ErrorMessage) {
          toast.error(e?.response.data.ErrorMessage, { position: "bottom-right", duration: 2000 });
        }
        console.log(e);
      }
    }
  };

  const checkOut = async () => {
    if (!isAuthenticated || user == undefined) navigate("/auth/login");
    else {
      try {
        const get: AxiosResponse<UserProfileDto> = await HttpClient.get(
          "/api/ManageUser/identity/" + user?.userid
        );
        const userProfileId = get.data.Id;
        const userId = userProfileId; //user?.userid;
	      const token = getCookie("BEATVISION");
        const res: AxiosResponse<CheckoutDto> = await httpClient.post(
          `/api/ManageOrder/checkout`,
          {
            userProfileId: userId,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`
            },
          }
        );
        console.log(res);
        if (res) {
          if (isPaid) {
            setPurchased(true);
            setTimeout(() => {
              const redirectURL = res.data.checkoutUrl;
              window.location.href = redirectURL;
            }, 3000);
          } else {
            toast.success("Check your Purchases to see your downloadable content", {
              position: "bottom-right",
              duration: 2000,
            });
            tracks.forEach((p) => removeFromCart(p.Id));
          }
        }
      } catch (e: any) {
        if (e.response.status == 401 || e.response.status == 403) {
          removeSession();
          toast.error("Your session has ran out, please log in again", {
            position: "bottom-right",
            duration: 2000,
          });
          navigate("/auth/login");
        } else if (e?.response.data.ErrorMessage) {
          toast.info(e?.response.data.ErrorMessage, { position: "bottom-right", duration: 2000 });
        }
        console.log(e);
      }
    }
  };

  return (
    <div className="cart">
      <PageMetaData title="Cart" />
      {!isPurchased ? (
        <>
          <div className="fst-bold title my-3 text-warning">Shopping Cart</div>
          <Row className="d-flex justify-content-center">
            <Col xl={8} className="px-3 bg-light" style={{ minHeight: "700px" }}>
              {isLoading ? (
                <div className="title">Loading...</div>
              ) : (
                <>
                  {tracks && tracks?.length > 0 ? (
                    <div className="cart-body h-100 pb-3 pt-2 d-flex flex-column align-items-end">
                      <div className="w-100">
                        {tracks.map((track, index) => (
                          <Row
                            style={{ borderBottom: "1px dotted grey" }}
                            className="track align-items-center py-4 border-top"
                            key={index}
                          >
                            <Col xl={1} className="d-flex">
                              <div className="rank">{index + 1} </div>
                            </Col>
                            <Col xl={1}>
                              <img
                                className="img-fluid icon"
                                src={track.ProfileBlobUrl ?? DefaultBeatThumbnail}
                              ></img>
                            </Col>
                            <Col className="d-flex justify-content-between">
                              <div className="desc1 d-flex flex-column">
                                <Link
                                  to={"/music-detail/detail/" + track.Id}
                                  className="name text-warning fw-bold"
                                >
                                  {track.TrackName}
                                </Link>
                              </div>
                              <div className="d-flex flex-column">
                                <div className="d-flex align-items-center">
                                  <Tag className="py-2 me-2" name="Trap" />
                                  <Tag className="py-2 me-2" name="Hard Beat" />
                                  <div className="me-2 price fw-bold">
                                    {track.Price != null
                                      ? track.Price > 0
                                        ? track.Price?.toLocaleString("vn-VN", {
                                            style: "currency",
                                            currency: "VND",
                                          })
                                        : "Free"
                                      : "Null"}
                                  </div>
                                </div>
                                <div className="me-2 d-flex justify-content-end">
                                  <u
                                    className="remove"
                                    onClick={() => {
                                      removeFromCart(track.Id);
                                    }}
                                  >
                                    remove
                                  </u>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        ))}
                      </div>
                      <div className="mt-auto w-100">
                        <div
                          style={{ borderTop: "2px solid black" }}
                          className="d-flex flex-column align-items-end total-section"
                        >
                          <div className="d-flex pt-3 pe-2">
                            <div className="total d-flex">
                              <div className="me-2 fw-light fs-4">Total: </div>
                              <div className="fw-bolder text-dark fs-4">{sum}</div>
                            </div>
                          </div>
                          <div className="mt-3">
                            <div className="btn btn-warning text-white purchase" onClick={checkOut}>
                              Purchase
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="cart-empty text-center py-5">
                      <div className="title">Your cart is empty</div>
                    </div>
                  )}
                </>
              )}
            </Col>
          </Row>
        </>
      ) : (
        <>
          <div
            className="text-center text-warning"
            style={{ fontSize: "32px", paddingTop: "35vh" }}
          >
            <div className="fw-bold">Redirecting to checkout page...</div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
