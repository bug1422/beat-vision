import { FormTextInput } from "@/components"
import usePurchase from "./usePurchase"

const CheckoutForm = () => {
    const { control } = usePurchase()
    return(<>
        <form>
            <FormTextInput
            name="e"
            label="a"
            containerClass="mb-2"
            control={control}
            placeholder="Enter e"
            />
        </form>
    </>)
}
export default CheckoutForm