export type MessageDto = {
  Id: number;
  MessageName: string;
  Content: string;
  CreatedDate: string; //datetime
  Type: MessageType;
  Weight: MessageWeigth;
  CreatorId: number;
  IsServerNotification: boolean;
};
export enum MessageWeigth {
  MINOR = 1,
  MAJOR = 2,
}
export enum MessageType {
  ALL = 0,
  GROUP = 1,
  SINGLE = 2,
}

export type MessageResponse = {
  ReceiverId: number,
  MessageId: number,
  Message: MessageDto,
  IsReaded: boolean,
  ExpiredDate: string
}
