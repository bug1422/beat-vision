import { Button } from "react-bootstrap";
import CheckoutForm from "./component/Form"
import { usePayOS, PayOSConfig } from "payos-checkout";
import { toast } from "sonner";


const Checkout = () => {

    const payOSConfig: PayOSConfig = {
        RETURN_URL: "", // required
        ELEMENT_ID: "payos", // required
        CHECKOUT_URL: "", // required
        onSuccess: (event: any) => {
            toast.success("Purchase success",{position: "bottom-right", duration: 2000})
            //TODO: Hành động sau khi người dùng thanh toán đơn hàng thành công
        },
        onCancel: (event: any) => {
            toast.error("Purchase failed",{position: "bottom-right", duration: 2000})
            //TODO: Hành động sau khi người dùng Hủy đơn hàng
        },
        onExit: (event: any) => {
            toast.error("Purchase failed",{position: "bottom-right", duration: 2000})
            //TODO: Hành động sau khi người dùng tắt Pop up
        }
    };
    const { open, exit } = usePayOS(payOSConfig);

    return (<>
        Put checkout here

        <Button onClick={() => { open() }}>open</Button>
        <Button onClick={() => { exit() }}>exit</Button>

        <CheckoutForm />
        <div id="payos"/>
    </>)
}
export default Checkout