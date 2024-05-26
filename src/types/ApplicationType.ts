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
  Price: number | null;
  Comments: TrackCommentDto[];
  Tags: TagDto[];
  Licenses: TrackLicenseDto[];
};
export type TrackCommentDto = {
  Id: number;
  Content: string;
  CreateDate: string;
  AuthorId: number | null;
  LikesCount: number;
  CommentType: string;
  ReplyToCommentId: number | null;
  IsCommentRemoved: boolean;
  TrackId: Number | null;
};
export type TagDto = {
  Id: number;
  Name: string;
};
export type TrackLicenseDto = {
  Id: number;
  LicenceName: string;
  IsWAVSupported: boolean;
  IsMP3Supported: boolean;
  DefaultPrice: number;
  CurrentPrice: number;
  DistributionLimit: number;
  StreamLimit: number;
  IsProducerTagged: boolean;
  LicensePdfBlobPath: string;
};
