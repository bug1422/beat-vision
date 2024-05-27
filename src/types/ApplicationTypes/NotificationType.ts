export type NotificationDto = {
  ReceiverId?: number | null;
  MessageId?: number | null;
  IsReaded: boolean;
  ExpiredDate: string;
};
