import { HttpClient } from "@/common";
import default_profile from "/default-image/defaultprofile.png"
import { useState } from "react";
import { useNavigate } from "react-router-dom";



export function FetchableImg(url: string | null | undefined) {
    const [path, setPath] = useState(default_profile)
    if (url) {
        const fetching = async () => {
            try {
                const res = await HttpClient.get(url)
                console.log(res)
                if (res?.data) {
                    setPath(url)
                }
            }
            catch (e: any) {
            }
        }
        fetching()
    }
    return path
}

export function CompareDate(date1: number, date2: number) {  
    const diffInMilliseconds: number = Math.abs(date2 - date1);
    const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
    if (diffInMinutes <= 60) {
        return `${diffInMinutes} minutes`;
    } else if (diffInMinutes <= 24 * 60) {
        return `${Math.floor(diffInMinutes / 60)} hours`;
    } else {
        return `${Math.floor(diffInMinutes / (24 * 60))} days`;
    }
}

