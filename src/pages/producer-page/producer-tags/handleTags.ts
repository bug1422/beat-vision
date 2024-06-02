import { HttpClient } from '@/common'
import { TagDto } from '@/types/ApplicationTypes/TagType'
import { TagResponse } from '@/types/ResponseTypes/TagResponse'
import { yupResolver } from '@hookform/resolvers/yup'
import { AxiosResponse } from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as yup from 'yup'



export function handleTags() {
    const [loading, setLoading] = useState(false)
    const [res, setRes] = useState<TagResponse>()
    const schemaResolver = yup.object().shape({
        Name: yup
            .string()
            .required('Please fill in your tag')
    })

    const { control, handleSubmit } = useForm({
        resolver: yupResolver(schemaResolver),
    })

    const addTag = handleSubmit(async function (values: yup.InferType<typeof schemaResolver>) {
        setLoading(true)
        try {
            let tags = await fetchTags();
            if (tags?.find(p => p.Name == values.Name)) {
                toast.error('Tag already exists!', { position: 'bottom-right', duration: 2000 })
            }
            else {
                const res: AxiosResponse<TagResponse> = await HttpClient.post('/api/ManageTag', values, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                if (res?.data) {
                    setRes(res?.data)
                    toast.success('Tag added', { position: 'bottom-right', duration: 2000 })
                }
                else toast.error('No Response', { position: 'bottom-right', duration: 2000 })
            }
        }
        catch (e: any) {
            toast.error('Error', { position: 'bottom-right', duration: 2000 })
        }
        setLoading(false)
    })

    const deletingTag = async (tagId: number) => {
        try {
            let deletResult: AxiosResponse = await HttpClient.delete(`/api/ManageTag/${tagId}`, {});
            console.log(deletResult);
            return true;
        } catch (err: any) {
            return false;
        } finally {
        }
    };
    const fetchTags = async () => {
        try {
            let getResult: AxiosResponse<TagDto[]> = await HttpClient.get(`/api/ManageTag`, {});
            let tags = getResult.data;
            return tags
        } catch (err: any) { }
    };
    return { control, loading, res, addTag, fetchTags, deletingTag }
}