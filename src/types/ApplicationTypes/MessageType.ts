export type MessageDto = {
  Id: number;
  MessageName: string;
  Content: string;
  CreatedDate: string; //datetime
  Type: "ALL" | "GROUP" | "SINGLE" | 0 | 1 | 2;
  Weight: "MINOR" | "MAJOR" | 1 | 2;
  CreatorId: number;
  IsServerNotification: boolean;
};
