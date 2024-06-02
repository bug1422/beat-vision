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
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { HttpClient } from "@/common";
import axios, { AxiosResponse } from "axios";
import { PagingResponseDto } from "@/types/ApplicationTypes/PagingResponseType";
import { TrackLicenseDto } from "@/types/ApplicationTypes/TrackLicenseType";
import { useNavigate } from "react-router-dom";
import { SimpleAllertTopRight } from "@/my-component/ButtonAllert";
import { TrackDto } from "@/types/ApplicationTypes/TrackType";
import { TagDto } from "@/types/ApplicationTypes/TagType";
import { date } from "yup";

interface optionsParameter {
  value: string;
  label: string;
}
class UpdateTrackDto {
  constructor(id: number, imageFile: File, newName: string, tags: number[], licenses: number[]) {
    this.TrackId = id;
    this.bannderFile = imageFile;
    this.TrackName = newName;
    this.TagsId = tags;
    this.LicenseIds = licenses;
  }

  TrackId: number;
  bannderFile: File;
  TrackName: string;
  TagsId: number[];
  LicenseIds: number[];
}

interface MusicUploadFormProps {
  isShow: boolean;
  Track: TrackDto;
  onHide: () => void;
  onSuccess?: () => void;
  onFail?: () => void;
}
registerPlugin(
  FilePondPluginFileEncode,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType
);
export default function MusicUpdateForm({
  Track,
  isShow,
  onHide,
  onSuccess,
  onFail,
}: MusicUploadFormProps) {
  // const [isShow, setIsShow] = useState(isShow);
  const [newName, setNewName] = useState(Track.TrackName);
  const [tags, setTags] = useState<TagDto[]>([]);
  const [licenses, setLicenses] = useState<TrackLicenseDto[]>([]);
  const [tagsOptions, setTagsOptions] = useState<optionsParameter[]>([]);
  const [licenseOptions, setLicenseOptions] = useState<optionsParameter[]>([]);
  const [tagsIds, setTagsIds] = useState(Track.Tags.map((t) => t.Id));
  const [licenseIds, setLicenseIds] = useState(Track.Licenses.map((l) => l.Id));
  const [imgFile, setImgFile] = useState<File | null>(null);

  const [intialSelectedTag, setInitialSelectedTag] = useState<optionsParameter[]>([]);
  const [initalSelectedLicenses, setInitalSelectedLicenses] = useState<optionsParameter[]>([]);

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
  const navigate = useNavigate();
  const { onResult } = SimpleAllertTopRight();

  const getNecessaryData = async () => {
    try {
      const resLicense: AxiosResponse<PagingResponseDto<TrackLicenseDto[]>> = await HttpClient.get(
        `/api/ManageTrack/get-track-license-paging?start=0&amount=${1000}`
      );
      const resTag: AxiosResponse<TagDto[]> = await HttpClient.get(`/api/ManageTag`);
      setTags(resTag.data);
      setLicenses(resLicense.data.Value);
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
        }
        console.log(err);
        onResult(false);
      }
    }
  };
  const onClickSubmit = async () => {
    try {
      //let newPublish = new PublishTrackDto(trackId, new Date(dateTime), isPublishNow, isPaid);
      let formParams = new FormData();
      let reader = new FileReader();
      reader.onload = function (e) {
        const value = e.target?.result?.toString();
        if(value != undefined) formParams.append("bannderFile", value);
      };
      if(imgFile) reader.readAsDataURL(imgFile);
      formParams.append("TrackId", Track.Id.toString());
      formParams.append("TrackName", newName);
      tagsIds.forEach((id) => {
        formParams.append("TagsId", id.toString());
      });
      licenseIds.forEach((id) => {
        formParams.append("LicenseIds", id.toString());
      });
      let axiosResponse: AxiosResponse = await HttpClient.put(`/api/ManageTrack`, formParams, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      onResult(true);
      onHide();
      if (!onSuccess) {
      } else {
        onSuccess();
      }
    } catch (error) {
      console.log(error);
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
      if (!onFail) {
      } else {
        onFail();
      }
    } finally {
    }
  };
  const getSelectedTag = (options: optionsParameter[], tags: TagDto[]): optionsParameter[] => {
    let optionsId = options.map((opt) => opt.value);
    let selectedTagsId = tags
      .map((t) => t.Id)
      .filter((t) => Track.Tags.map((t) => t.Id).includes(t));
    let selectedOptionsValue = optionsId.filter((otp) => selectedTagsId.includes(Number(otp)));
    return options.filter((opt) => selectedOptionsValue.includes(opt.value));
  };
  const getSelectedLicense = (
    options: optionsParameter[],
    licenses: TrackLicenseDto[]
  ): optionsParameter[] => {
    let optionsId = options.map((opt) => opt.value);
    let selectedLicenseId = licenses
      .map((l) => l.Id)
      .filter((t) => Track.Licenses.map((t) => t.Id).includes(t));
    let selectedOptionsValue = optionsId.filter((otp) => selectedLicenseId.includes(Number(otp)));
    return options.filter((opt) => selectedOptionsValue.includes(opt.value));
  };
  useEffect(() => {
    getNecessaryData()
      .then(() => {
        setTagsOptions(renderTagOptions(tags));
        setLicenseOptions(renderLicenseOptions(licenses));
        setTagsIds(tags.map((t) => t.Id).filter((t) => Track.Tags.map((t) => t.Id).includes(t)));
        setLicenseIds(
          licenses.map((l) => l.Id).filter((t) => Track.Licenses.map((t) => t.Id).includes(t))
        );
      })
      .catch();
  }, [isShow]);
  useEffect(() => {
    setInitialSelectedTag(getSelectedTag(tagsOptions, tags));
    setInitalSelectedLicenses(getSelectedLicense(licenseOptions, licenses));
    console.log(initalSelectedLicenses);
    console.log(intialSelectedTag);
  }, [tagsOptions, licenseOptions]);
  return (
    <>
      <Modal show={isShow} centered>
        <Modal.Header>
          <Modal.Title>publish track</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="">
            <Row>
              <Col lg="12">
                <Card>
                  <CardHeader>
                    <CardTitle>Update Track</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col xs="12">
                        <FormLabel
                          htmlFor="example-time-input"
                          className="col-xs-3 col-form-label text-end"
                        >
                          TrackName
                        </FormLabel>
                        <FormControl
                          type="text"
                          value={newName}
                          id="example-time-input"
                          onChange={(e) => {
                            setNewName(e.currentTarget.value);
                          }}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <p className="ms-1">tags</p>
                      <Select
                        isMulti
                        placeholder="Select an option"
                        options={tagsOptions}
                        value={intialSelectedTag}
                        onChange={(values) => {
                          let tagsId = values.map((value) => Number(value.value));
                          setTagsIds(tagsId);
                          setInitialSelectedTag(values.map((v) => v));
                        }}
                      />
                    </Row>
                    <Row>
                      <p className="ms-1">license</p>
                      <Select
                        isMulti
                        placeholder="Select an option"
                        options={licenseOptions}
                        value={initalSelectedLicenses}
                        onChange={(values) => {
                          let licenseIds = values.map((value) => Number(value.value));
                          setLicenseIds(licenseIds);
                          setInitalSelectedLicenses(values.map((v) => v));
                        }}
                      />
                    </Row>
                    <Row>
                      <p className="ms-1">Image File</p>
                      <FilePond
                        allowDrop
                        dropOnPage
                        dropValidation
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
                          setImgFile(bannderFile);
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
          <Button onClick={onClickSubmit}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
const getCurrentDateTimePlus5Minutes = (): string => {
  const currentDate = new Date();
  currentDate.setMinutes(currentDate.getMinutes() + 5);

  // Format date to 'YYYY-MM-DDTHH:mm'
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};
