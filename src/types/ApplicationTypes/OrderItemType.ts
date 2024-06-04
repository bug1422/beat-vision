export type OrderType = {
    Id: string,
    PaidDate: string,
    Description: string,
    UserId: number,
    OriginalPrice: number,
    Status: OrderStatus,
    Price: number,
    PricePaid: number,
    PriceRemain: number,
    CreateDate: string,
    CancelAt: string,
    CancellationReasons: string,
    OrderCode: number,
    PaymentLinkId: number,
    OrderTransactions: [],
    OrderItems: OrderItemType[]
}


export type OrderItemType = {
    Id: number,
    OrderId: number,
    OriginalPrice: number,
    CurrentPrice: number,
    IsSale: boolean,
    TrackName: string,
    TrackId: number
}
export enum OrderStatus {
    PENDING,
    PAID,
    CANCELLED,
    PROCESSING,
  }