import { TrackDto } from "@/types/ApplicationTypes/TrackType";
import { GetCart, AddItemToCart } from "@/utils/handleCart";
import { toast } from "sonner";

export const AddToCart = (userId: number, track: TrackDto) => {
    console.log(userId)
    if (userId == undefined) {
        toast.error("Can't get user", {
            position: 'bottom-right',
            duration: 2000,
        })
        return
    }
    if (track) {

        //Check availab blah balh here
        //
        //
        AddItemToCart(userId, track.Id).then(
            (v) => {
                console.log(v)
                if (v == 'Success') {
                    toast.success('Added to cart!', {
                        position: 'bottom-right',
                        duration: 2000,
                    })
                }
                else {
                    toast.info(v, {
                        position: 'bottom-right',
                        duration: 2000,
                    })
                }
            })
            .catch((e) => toast.error("Can't add to cart", {
                position: 'bottom-right',
                duration: 2000,
            }))
    }

}

