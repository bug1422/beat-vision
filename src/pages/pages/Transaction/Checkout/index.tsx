import { Button } from "react-bootstrap";
import CheckoutForm from "./component/Form"
import { usePayOS, PayOSConfig } from "payos-checkout";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { createRef, useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { CheckoutDto } from "@/types/ApplicationTypes/CheckoutType";
import { HttpClient } from "@/common";


const Checkout = () => {
    const { subDirectory } = useParams()
    const navigate = useNavigate()
    const [order, setOrder] = useState<CheckoutDto>()
    const newTabRef = createRef<HTMLAnchorElement>();
    const url = "https://pay.payos.vn/web/"+subDirectory

    const payOSConfig: PayOSConfig = {
        RETURN_URL: "", // required
        ELEMENT_ID: "payos", // required
        CHECKOUT_URL: url, // required
        onSuccess: (event: any) => {
            toast.success("Purchase success", { position: "bottom-right", duration: 2000 })
            //TODO: Hành động sau khi người dùng thanh toán đơn hàng thành công
        },
        onCancel: (event: any) => {
            toast.error("Purchase failed", { position: "bottom-right", duration: 2000 })
            //TODO: Hành động sau khi người dùng Hủy đơn hàng
        },
        onExit: (event: any) => {
            toast.error("Purchase failed", { position: "bottom-right", duration: 2000 })
            //TODO: Hành động sau khi người dùng tắt Pop up
        }
    };
    const { open, exit } = usePayOS(payOSConfig);

    function Test() {
        if (newTabRef.current) {
            newTabRef.current.setAttribute("href", "https://pay.payos.vn/web/81ac47a2ec9a4031ac4557a6dc57618e")
            newTabRef.current.setAttribute("target", "_blank")
            newTabRef.current?.click()
            newTabRef.current.setAttribute("href", "")
        }
    }

    return (<>
        Put checkout here
        <Button onClick={() => {
            Test()
        }}>Test</Button>
        <Button onClick={() => {
            open()
        }}>open</Button>
        <Button onClick={() => { exit() }}>exit</Button>

        <CheckoutForm />
        <div id="payos" />
        <a ref={newTabRef} />
    </>)
}
export default Checkout