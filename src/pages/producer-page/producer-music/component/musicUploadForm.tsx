import { useEffect, useState } from "react";
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

export default function MusicUploadForm({
  isShow,
  onHide,
  onFail,
  onSuccess,
}: MusicUploadFormProps) {
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
      let formData = new FormData();
      formData.append("TrackName", createTrackObject.TrackName);
      formData.append("IsTrackPaidContent", createTrackObject.IsTrackPaidContent);
      formData.append("uploadedFile", createTrackObject.uploadedFile);
      formData.append("bannderFile", createTrackObject.bannderFile);
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
      formData.forEach((item) => console.log(item));
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
      return true;
    } catch (err: any) {
      console.log(err);
      return false;
    }
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
      if (axios.isAxiosError(err)) {
        if (err.response) {
        }
      }
    }
  };
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
      <Modal show={isShow} centered>
        <Modal.Header>
          <Modal.Title>Upload track to you repository</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="">
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
                          className="col-sm-2 col-form-label text-end"
                          style={{ fontSize: "0.6rem" }}
                        >
                          TrackName
                        </FormLabel>
                        <Col sm="10">
                          <FormControl
                            type="email"
                            className="form-control-success"
                            id="trackName"
                            placeholder="name@example.com"
                            name="TrackName"
                            onChange={handleInputChange}
                          />
                          <div className="form-control-feedback">
                            the name is visible to everyone, choose wisely
                          </div>
                          <small className="form-text text-muted">required</small>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <div className="form-check">
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                              Is paid
                            </label>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="flexCheckDefault"
                              name="IsTrackPaidContent"
                              onChange={(e) => {
                                setCreateTrackObject({
                                  ...createTrackObject,
                                  IsTrackPaidContent: e.currentTarget.checked,
                                });
                              }}
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <p className="ms-1">Audio File</p>
                        <FilePond
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
                        <p className="ms-1">Image File</p>
                        <FilePond
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
                      <p className="ms-1">tags</p>
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
                      <p className="ms-1">license</p>
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
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
          <Button
            onClick={async () => {
              let result = await onClickSubmit();
              if (result) {
                window.location.reload();
              }
            }}
          >
            submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
