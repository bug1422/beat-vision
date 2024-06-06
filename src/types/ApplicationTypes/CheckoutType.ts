// accountNumber
// : 
// "VQRQ00020dalq"
// amount
// : 
// 10000
// bin
// : 
// "970422"
// checkoutUrl
// : 
// "https://pay.payos.vn/web/81ac47a2ec9a4031ac4557a6dc57618e"
// currency
// : 
// "VND"
// description
// : 
// "Thanh toan don hang"
// orderCode
// : 
// 76542636098
// paymentLinkId
// : 
// "81ac47a2ec9a4031ac4557a6dc57618e"
// qrCode
// : 
// "00020101021238570010A000000727012700069704220113VQRQ00020dalq0208QRIBFTTA53037045405100005802VN62230819Thanh toan don hang630455B1"
// status
// : 
// "PENDING"

export type CheckoutDto = {
    accoutNumber: string,
    amount: number,
    bin: string,
    checkoutUrl: string,
    currency: string,
    description: string,
    orderCode: number,
    paymentLinkId: string,
    qrCode: string,
    status: string,
}