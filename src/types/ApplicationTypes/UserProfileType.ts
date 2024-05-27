import { CartItemDto } from "./CartItemType";
import { MessageDto } from "./MessageType";
import { NotificationDto } from "./NotificationType";

export type UserProfileDto = {
  Id: number;
  Description?: string | null;
  Fullname: string;
  ProfileBlobUrl?: string | null;
  Birthday?: string | null;
  AccountStatus: "ACTIVE" | "BANNED" | "SUSPENDED" | 0 | 1 | 2;
  Caption?: string | null;
  TotalTrack: number;
  Instagram?: string | null;
  Youtube?: string | null;
  SoundCloud?: string | null;
  Facebook?: string | null;
  CartItems: CartItemDto[];
  Notifications: NotificationDto[];
  CreatedMessage: MessageDto[];
};
