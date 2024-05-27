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
