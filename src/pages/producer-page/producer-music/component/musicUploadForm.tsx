import { DetailedHTMLProps, FormHTMLAttributes, LegacyRef, MutableRefObject, useEffect, useRef, useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";

import {
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormLabel,
  FormControl,
  Modal,
  Button,
  Form,
} from "react-bootstrap";
import Select from "react-select";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { TagDto } from "@/types/ApplicationTypes/TagType";
import { TrackLicenseDto } from "@/types/ApplicationTypes/TrackLicenseType";
import { HttpClient } from "@/common";
import { PagingResponseDto } from "@/types/ApplicationTypes/PagingResponseType";
import axios, { AxiosResponse } from "axios";
import { ButtonAllert2 } from "@/my-component/ButtonAllert";
import { toast } from "sonner";

interface UploadMusicParameters {
  trackName: string;
  isPrivate: boolean;
  isForSale: boolean;
  wavFile: File;
}

interface MusicUploadFormProps {
  isShow: boolean;
  onHide: () => void;
  onSuccess?: () => void;
  onFail?: () => void;
}
interface optionsParameter {
  value: string;
  label: string;
}
class CreateTrackDto {
  constructor(
    trackFile?: File,
    bannerFile?: File,
    name?: string,
    isPaid: boolean = false,
    tags?: number[],
    licenses?: number[]
  ) {
    this.uploadedFile = trackFile;
    this.bannderFile = bannerFile;
    this.TrackName = name;
    this.IsTrackPaidContent = isPaid;
    this.TagsId = tags;
    this.LicenseIds = licenses;
  }
  uploadedFile?: File;
  bannderFile?: File;
  TrackName?: string;
  IsTrackPaidContent?: boolean;
  TagsId?: number[];
  LicenseIds?: number[];
}
registerPlugin(
  FilePondPluginFileEncode,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview
);
const MusicUploadForm = (props: { refresh: () => void }) => {
  const formRef = useRef<any>();
  const beatRef = useRef<any>();
  const imgRef = useRef<any>();
  const [key, setKey] = useState(0);
  const [createTrackObject, setCreateTrackObject] = useState<CreateTrackDto>(new CreateTrackDto());
  const [tagsData, setTagsData] = useState<TagDto[]>([]);
  const [licenseData, setLicenseData] = useState<TrackLicenseDto[]>([]);
  const [tagsOptions, setTagsOptions] = useState<optionsParameter[]>([]);
  const [licenseOptions, setLicenseOptions] = useState<optionsParameter[]>([]);
  const renderTagOptions = (tags: TagDto[]): optionsParameter[] => {
    return tags.map((tag) => ({
      // Map tag properties to option properties
      value: tag.Id.toString(),
      label: tag.Name,
    }));
  };
  const renderLicenseOptions = (licenses: TrackLicenseDto[]): optionsParameter[] => {
    return licenses.map((license) => ({
      value: license.Id.toString(),
      label: license.LicenceName,
    }));
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCreateTrackObject({
      ...createTrackObject,
      [name]: value,
    });
  };


  const onClickSubmit = async (): Promise<boolean> => {
    try {
      if (!createTrackObject.TagsId || createTrackObject.TagsId?.length == 0 ) {
        toast.error("Please choose at least one tag", { position: "bottom-right", duration: 2000 })
        return false
      }
      if (!createTrackObject.LicenseIds || createTrackObject.LicenseIds?.length == 0) {
        toast.error("Please choose licenses", { position: "bottom-right", duration: 2000 })
        return false
      }
      let formData = new FormData();
      if (createTrackObject.TrackName != undefined) formData.append("TrackName", createTrackObject.TrackName);
      else {
        toast.error("Please fill in name", { position: "bottom-right", duration: 2000 })
        return false
      }
      if (createTrackObject.IsTrackPaidContent != undefined) formData.append("IsTrackPaidContent", createTrackObject.IsTrackPaidContent ? "true" : "false");
      if (createTrackObject.uploadedFile != undefined) formData.append("uploadedFile", createTrackObject.uploadedFile);
      if (createTrackObject.bannderFile != undefined) formData.append("bannderFile", createTrackObject.bannderFile);
      if (createTrackObject.TagsId) {
        createTrackObject.TagsId.forEach((tag) => {
          formData.append("TagsId", tag.toString());
        });
      }
      if (createTrackObject.LicenseIds) {
        createTrackObject.LicenseIds.forEach((license) => {
          formData.append("LicenseIds", license.toString());
        });
      }
      for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }
      let createResult: AxiosResponse<string> = await HttpClient.post(
        "/api/ManageTrack",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      let stat = createResult.status;
      console.log(stat);
      toast.success("Track created", { position: "bottom-right", duration: 2000 })
      clearRef()
      setKey(1)
      return true
    } catch (err: any) {
      console.log(err);
      toast.error("Creating fail", { position: "bottom-right", duration: 2000 })
    }
    return false
  };
  const getNecessaryData = async () => {
    try {
      const resLicense: AxiosResponse<PagingResponseDto<TrackLicenseDto[]>> = await HttpClient.get(
        `/api/ManageTrack/get-track-license-paging?start=0&amount=${100}`
      );
      const resTag: AxiosResponse<TagDto[]> = await HttpClient.get(`/api/ManageTag`);
      let statLicense = resLicense.status;
      let statTag = resTag.status;
      if (statLicense < 200 || statLicense > 299 || statTag < 200 || statTag > 299) {
        throw new Error("something fail");
      }
      setTagsData(resTag.data);
      setLicenseData(resLicense.data.Value);
    } catch (err: any) {
      console.log(err)
      if (err?.response?.data?.ErrorMessage) {
        toast.error(err?.response?.data?.ErrorMessage, { position: "bottom-right", duration: 2000 })
      }
    }
  };

  function clearRef() {
    if (formRef) formRef.current.reset();
    if (beatRef) beatRef.current.removeFiles();
    if (imgRef) imgRef.current.removeFiles();
  }

  useEffect(() => {
    getNecessaryData();
  }, []);
  useEffect(() => {
    setTagsOptions(renderTagOptions(tagsData));
    setLicenseOptions(renderLicenseOptions(licenseData));
    console.log(tagsData);
    console.log(tagsOptions);
  }, [tagsData, licenseData]);
  return (
    <>
      <form ref={formRef} className="" key={key}>
        <Row>
          <Col lg="12">
            <Card>
              <CardHeader>
                <CardTitle>upload track</CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Row className="mb-3 has-success">
                    <FormLabel
                      htmlFor="trackName"
                      className="col-sm-auto col-form-label text-end"
                      style={{ fontSize: "0.8rem", width: "90px" }}
                    >
                      TrackName
                    </FormLabel>
                    <Col sm="10">
                      <FormControl
                        type="text"
                        className="form-control-success"
                        id="trackName"
                        placeholder="type in your track name"
                        name="TrackName"
                        onChange={handleInputChange}

                      />
                      <div className="form-control-feedback">
                        the name is visible to everyone, choose wisely
                      </div>
                      <small className="form-text text-muted">required</small>
                    </Col>
                  </Row>
                  <Row className="d-flex">
                    <FormLabel
                      htmlFor="trackName"
                      className="col-sm-auto col-form-label text-end"
                      style={{ fontSize: "0.8rem", width: "90px" }}>
                      Is paid
                    </FormLabel>
                    <Col xl={10}>
                      <input
                        className="form-check-input mt-1"
                        type="checkbox"
                        id="flexCheckDefault"
                        name="IsTrackPaidContent"
                        style={{ width: "1.2rem", height: "1.2rem" }}
                        onChange={(e) => {
                          setCreateTrackObject({
                            ...createTrackObject,
                            IsTrackPaidContent: e.currentTarget.checked,
                          });
                        }}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <p className="ms-1 col-form-label text-start">Audio File</p>
                    <FilePond
                      ref={beatRef}
                      allowMultiple={false}
                      allowReorder={true}
                      allowDrop
                      acceptedFileTypes={["audio/wav"]}
                      maxFiles={1}
                      onaddfile={(error, file) => {
                        if (error) {
                          window.alert("audio file upload error");
                          return;
                        }
                        let wavFile = new File([file.file], file.file.name, {
                          lastModified: file.file.lastModified,
                          type: file.file.type,
                        });
                        setCreateTrackObject({
                          ...createTrackObject,
                          uploadedFile: wavFile,
                        });
                      }}
                    />
                  </Row>
                  <Row>
                    <p className="ms-1 col-form-label text-start">Image File</p>
                    <FilePond
                      ref={imgRef}
                      allowDrop
                      allowMultiple={false}
                      allowReorder={false}
                      acceptedFileTypes={["image/jpeg", "image/png"]}
                      maxFiles={1}
                      onaddfile={(error, file) => {
                        if (error) {
                          window.alert("image file upload error");
                          return;
                        }
                        let bannderFile = new File([file.file], file.file.name, {
                          lastModified: file.file.lastModified,
                          type: file.file.type,
                        });
                        setCreateTrackObject({
                          ...createTrackObject,
                          bannderFile: bannderFile,
                        });
                      }}
                    />
                  </Row>
                </Row>
                <Row>
                  <p className="ms-1 col-form-label text-start">Tags</p>
                  <Select
                    isMulti
                    placeholder="Select an option"
                    options={tagsOptions}
                    onChange={(values) => {
                      let tagsId = values.map((value) => Number(value.value));
                      setCreateTrackObject({
                        ...createTrackObject,
                        TagsId: tagsId,
                      });
                    }}
                  />
                </Row>
                <Row>
                  <p className="ms-1 col-form-label text-start mt-3">License</p>
                  <Select
                    isMulti
                    placeholder="Select an option"
                    options={licenseOptions}
                    onChange={(values) => {
                      let licenseIds = values.map((value) => Number(value.value));
                      setCreateTrackObject({
                        ...createTrackObject,
                        LicenseIds: licenseIds,
                      });
                    }}
                  />
                </Row>
                <Row >
                  <Col xs={12}>
                    <Button
                      className="w-100 my-5"
                      onClick={async () => {
                        let result = await onClickSubmit();
                        props.refresh()
                        console.log(result)
                      }}
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </form>
    </>
  );
}
export default MusicUploadForm
