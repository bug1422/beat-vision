import { TrackDto } from "@/types/ApplicationType";

export type OrderDetailType = {
  OrderId: number;
  Track: TrackDto[];
  BuyderId: number;
  BuyderName: string;
  Date: string;
  Price: string;
};

export default function ProducerOrderDetail() {
  return <></>;
}
