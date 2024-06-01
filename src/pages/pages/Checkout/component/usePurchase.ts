import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup'
import { useForm } from "react-hook-form"

export default function usePurchase(){

    const schemaResolver = yup.object().shape({
        e: yup.string().required()
    })
    const { control } = useForm({
        resolver: yupResolver(schemaResolver)
    })
    return { control }
}