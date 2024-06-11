import { HttpClient } from "@/common";
import HttpClientAuth from "@/common/helpers/httpClientAuth";
import { useAuthContext } from "@/context";
import { UserProfileDto } from "@/types/ApplicationTypes/UserProfileType";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const UpdateForm = () => {
  const { user, removeSession } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fullname, setFullname] = useState("");
  const [description, setDescription] = useState("");
  const [birth, setBirth] = useState("");
  const [fb, setFb] = useState("");
  const [insta, setInsta] = useState("");
  const [ytb, setYtb] = useState("");
  const [sound, setSound] = useState("");
  useEffect(() => {
    FetchUserProfile();
  }, []);

  const FetchUserProfile = async () => {
    try {
      //   const res: AxiosResponse<UserProfileDto> = await HttpClient.get(
      //     "/api/ManageUser/" + user?.userid
      //   );
      const get: AxiosResponse<UserProfileDto> = await HttpClient.get(
        "/api/ManageUser/identity/" + user?.userid
      );
      const userId = get.data.Id;
      if (get?.data) {
        console.log(get.data);
        let tempt = get.data; // res?.data;
        setFullname(tempt.Fullname);
        setDescription(tempt.Description ?? "");
        setBirth(tempt.Birthday ?? "");
        setFb(tempt.Facebook ?? "");
        setInsta(tempt.Instagram ?? "");
        setYtb(tempt.Youtube ?? "");
        setSound(tempt.SoundCloud ?? "");
      }
    } catch (e: any) {
      console.log(e);
    }
  };

  const update = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    console.log(e);
    let flag = false;
    if (fullname == "") {
      toast.error("Fullname is empty", { position: "bottom-right", duration: 2000 });
      flag = true;
    }
    if (Date.now() - Date.parse(birth) < 567648000000) {
      toast.error("Birth year must be 18 or greater", { position: "bottom-right", duration: 2000 });
      flag = true;
    }
    if (!flag) {
      try {
        const get: AxiosResponse<UserProfileDto> = await HttpClient.get(
          "/api/ManageUser/identity/" + user?.userid
        );
        const userId = get.data.Id;
        const res: AxiosResponse<UserProfileDto> = await HttpClientAuth.put(
          "/api/ManageUser/" + userId, //user?.userid,
          {
            description: description,
            fullname: fullname,
            birthday: birth,
            instagram: insta,
            youtube: ytb,
            soundCloud: sound,
            facebook: fb,
          }
        );
        if (res) {
          console.log(res);
          toast.success("Info updated", { position: "bottom-right", duration: 2000 });
          window.location.reload();
        }
      } catch (e: any) {
        console.log(e);
        if (e.response.status == 401 || e.response.status == 403) {
          removeSession();
          toast.error("Your session has ran out, please log in again", {
            position: "bottom-right",
            duration: 2000,
          });
          navigate("/auth/login");
          return;
        }
        toast.error("Failed to update", { position: "bottom-right", duration: 2000 });
      }
    }
    setLoading(false);
  };
  return (
    <>
      {loading ? (
        <>Loading</>
      ) : (
        <form onSubmit={update}>
          <Row className="d-flex justify-content-center mt-5">
            <Col xs={4} className="border-end update-form">
              <div className="border-bottom fs-1 fw-bold text-white">User Information</div>
              <li className="list-group-item py-3 d-flex align-items-center update-component">
                <input
                  type="text"
                  name="fullname"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  placeholder="Type in your name"
                  className="form-control"
                  style={{ width: "500px" }}
                />
              </li>
              <li className="list-group-item py-3 d-flex align-items-center update-component">
                <input
                  type="text"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Type in your description"
                  className="form-control"
                  style={{ width: "500px" }}
                />
              </li>
              <li className="list-group-item py-3 d-flex align-items-center update-component">
                <input
                  type="date"
                  name="birthday"
                  value={birth?.slice(0, 10)}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setBirth(e.target.value);
                  }}
                  placeholder="Type in your birthday"
                  className="form-control"
                  style={{ width: "500px" }}
                />
              </li>
            </Col>
            <Col xs={4}>
              <div className="border-bottom fs-1 fw-bold text-white">Social Media Link</div>
              <ul className="list-group mb-3">
                <li className="list-group-item py-3 d-flex align-items-center update-component">
                  <i className="fab fa-facebook-f me-2" />
                  <input
                    type="text"
                    name="facebook"
                    value={fb}
                    onChange={(e) => setFb(e.target.value)}
                    placeholder="https://www.facebook.com/..."
                    className="form-control"
                    style={{ width: "500px" }}
                  />
                </li>
                <li className="list-group-item py-3 d-flex align-items-center update-component">
                  <i className="fab fa-instagram me-2" />
                  <input
                    type="text"
                    name="instagram"
                    value={insta}
                    onChange={(e) => setInsta(e.target.value)}
                    placeholder="https://www.instagram.com/..."
                    className="form-control"
                    style={{ width: "500px" }}
                  />
                </li>
                <li className="list-group-item py-3 d-flex align-items-center update-component">
                  <i className="fab fa-youtube me-2" />
                  <input
                    type="text"
                    name="youtube"
                    value={ytb}
                    onChange={(e) => setYtb(e.target.value)}
                    placeholder="https://www.youtube.com/..."
                    className="form-control"
                    style={{ width: "500px" }}
                  />
                </li>
                <li className="list-group-item py-3 d-flex align-items-center update-component">
                  <i className="fab fa-soundcloud me-2" />
                  <input
                    type="text"
                    name="soundcloud"
                    value={sound}
                    onChange={(e) => setSound(e.target.value)}
                    placeholder="https://www.soundcloud.com/..."
                    className="form-control"
                    style={{ width: "500px" }}
                  />
                </li>
              </ul>
              <div className="align-items-right d-flex justify-content-end">
                <button type="submit" className="mt-5 p-3 btn btn-warning fw-bold fs-3">
                  Update Link
                </button>
              </div>
            </Col>
          </Row>
        </form>
      )}
    </>
  );
};

export default UpdateForm;
