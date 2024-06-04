import { TagDto } from "./TagType";
import { TrackCommentDto } from "./TrackCommentType";
import { TrackLicenseDto } from "./TrackLicenseType";

export type TrackDto = {
  Id: number;
  TrackName: string;
  PlayCount: number;
  IsAudioPrivate: boolean;
  IsAudioRemoved: boolean;
  IsAudioForSale: boolean;
  Status: string;
  AudioLenghtSeconds: number;
  AudioChannels: number;
  AudioSampleRate: number;
  AudioBitPerSample: number;
  IsPublished: boolean;
  PublishDateTime: string | null;
  ProfileBlobUrl?: string | null;
  Price: number | null;
  Comments: TrackCommentDto[];
  Tags: TagDto[];
  Licenses: TrackLicenseDto[];
};
export enum TRACK_STATUS {
  PUBLISH = "PUBLISH",
  REMOVED = "REMOVED",
  WAIT_FOR_PUBLISH = "WAIT_FOR_PUBLISH",
  NOT_FOR_PUBLISH = "NOT_FOR_PUBLISH",
}