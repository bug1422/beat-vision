import { FetchTrack } from "@/pages/pages/Search/getBeat"
import { TrackDto } from "@/types/ApplicationTypes/TrackType"
import { CartType } from "@/types/CartType"

export async function AddItemToCart(userId: number, trackId: number) {
    const cart = await GetCart(userId)
    if (cart) {
        if (cart.tracksId) {
            if (cart.tracksId.find(p => p == trackId) === undefined) {
                cart.tracksId.push(trackId)
            }
            else return 'Already in cart'
        }
        else cart.tracksId = [trackId]
        try {
            localStorage.removeItem("user-" + userId)
            const stringified_cart = JSON.stringify(cart)
            localStorage.setItem("user-" + userId, stringified_cart)
            return 'Success'
        }
        catch (e: any) {
            return e
        }
    }
}

export async function RemoveItemFromCart(userId: number, trackId: number) {
    const cart = await GetCart(userId)
    if (cart) {
        if (cart.tracksId) {
            const filtered = cart.tracksId.filter(p => p !== trackId)
            console.log(filtered)
            cart.tracksId = [...filtered]
        }
        else cart.tracksId = [trackId]
        try {
            localStorage.removeItem("user-" + userId)
            const stringified_cart = JSON.stringify(cart)
            localStorage.setItem("user-" + userId, stringified_cart)
            return 'Success'
        }
        catch (e: any) {
            return e
        }
    }
}

async function GetCart(userId: number) {
    try {
        var cart = localStorage.getItem("user-" + userId)
        if (cart) {
            console.log(cart)
            const cartObj: CartType = JSON.parse(cart)
            return cartObj
        }
        const cartObj: CartType = {
            userId: userId,
        }
        return cartObj
    }
    catch (e: any) {
        console.log(e)
        return null
    }
}

export async function GetTracksInCart(userId: number) {
    const trackIds = (await GetCart(userId))?.tracksId
    const tracks: TrackDto[] = []
    if (trackIds) {
        for (let i = 0; i < trackIds.length; i++) {
            var track = await FetchTrack(trackIds[i])
            console.log(track)
            if (track != undefined) tracks.push(track)
        }
    }
    return tracks
}

