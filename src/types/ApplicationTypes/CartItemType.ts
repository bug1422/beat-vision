import { TrackDto } from "./TrackType";

export type CartItemDto = {
  Id: number;
  UserId?: number | null;
  ItemType: "TRACK" | "SERVICE" | 0 | 1;
  ItemId: number;
  Tracks?: TrackDto[];
};
