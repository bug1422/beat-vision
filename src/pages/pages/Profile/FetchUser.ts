import { HttpClient } from "@/common";
import { useAuthContext } from "@/context";
import { CustomIdentityUserDto } from "@/types/ApplicationTypes/IdentityType";
import { UserProfileDto } from "@/types/ApplicationTypes/UserProfileType";
import { AxiosResponse } from "axios";
import { useState } from "react";


export default function FetchUser() {
    const { isAuthenticated, user, removeSession } = useAuthContext();


    const [fetchSuccess, setFetchSuccess] = useState<boolean>(false);
    const [userData, setUserData] = useState<CustomIdentityUserDto>();
    const [otherData, setOtherData] = useState<UserProfileDto>();
    const Fetch = async (userId: string | undefined = undefined) => {

        if (isAuthenticated) {
            try {
                console.log(isAuthenticated)
                const res: AxiosResponse<CustomIdentityUserDto> = await HttpClient.get("/api/ManageIdentity/get-useridentity", {
                    params: {
                        id: userId ?? user?.userid
                    }
                })
                if (res?.data) {
                    console.log(res?.data)
                    const userProfile: CustomIdentityUserDto = res?.data
                    setUserData(userProfile)
                    setFetchSuccess(true)
                }
            }
            catch (e: any) {
                setFetchSuccess(false)
            }
        }
    }

    return { Fetch, isAuthenticated, fetchSuccess, userData, removeSession, otherData }
}