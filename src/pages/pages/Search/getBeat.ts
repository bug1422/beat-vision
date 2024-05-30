import { TrackDto } from "@/types/ApplicationTypes/TrackType";
import DefaultAudio from "@/assets/audio/defaultAudio.mp3"
import DefaultAudio2 from "@/assets/audio/defaultAudio2.mp3"
import DefaultAudio3 from "@/assets/audio/defaultAudio3.mp3"
const tracks: TrackDto[] = [
    {
        Id: 1,
        TrackName: "[-90%🔥+9 FREE] Move (pop guitar type beat)",
        PlayCount: 0,
        IsAudioPrivate: false,
        IsAudioRemoved: false,
        IsAudioForSale: false,
        Status: "PUBLISH",
        AudioLenghtSeconds: 9999,
        AudioChannels: 0,
        AudioSampleRate: 0,
        AudioBitPerSample: 0,
        IsPublished: true,
        PublishDateTime: Date.now().toString(),
        ProfileBlobUrl: "/",
        Price: 8888,
        Comments: [],
        Tags: [],
        Licenses: [],
    },
    {
        Id: 2,
        TrackName: "[-90%🔥+9 FREE] Move (pop guitar type beat)",
        PlayCount: 0,
        IsAudioPrivate: false,
        IsAudioRemoved: false,
        IsAudioForSale: false,
        Status: "PUBLISH",
        AudioLenghtSeconds: 9999,
        AudioChannels: 0,
        AudioSampleRate: 0,
        AudioBitPerSample: 0,
        IsPublished: true,
        PublishDateTime: Date.now().toString(),
        ProfileBlobUrl: "/",
        Price: 8888,
        Comments: [],
        Tags: [],
        Licenses: [],
    },
    {
        Id: 3,
        TrackName: "[-90%🔥+9 FREE] Move (pop guitar type beat)",
        PlayCount: 0,
        IsAudioPrivate: false,
        IsAudioRemoved: false,
        IsAudioForSale: false,
        Status: "PUBLISH",
        AudioLenghtSeconds: 9999,
        AudioChannels: 0,
        AudioSampleRate: 0,
        AudioBitPerSample: 0,
        IsPublished: true,
        PublishDateTime: Date.now().toString(),
        ProfileBlobUrl: "/",
        Price: 8888,
        Comments: [],
        Tags: [],
        Licenses: [],
    },
    {
        Id: 4,
        TrackName: "[-90%🔥+9 FREE] Move (pop guitar type beat)",
        PlayCount: 0,
        IsAudioPrivate: false,
        IsAudioRemoved: false,
        IsAudioForSale: false,
        Status: "PUBLISH",
        AudioLenghtSeconds: 9999,
        AudioChannels: 0,
        AudioSampleRate: 0,
        AudioBitPerSample: 0,
        IsPublished: true,
        PublishDateTime: Date.now().toString(),
        ProfileBlobUrl: "/",
        Price: 8888,
        Comments: [],
        Tags: [],
        Licenses: [],
    },
    {
        Id: 5,
        TrackName: "[-90%🔥+9 FREE] Move (pop guitar type beat)",
        PlayCount: 0,
        IsAudioPrivate: false,
        IsAudioRemoved: false,
        IsAudioForSale: false,
        Status: "PUBLISH",
        AudioLenghtSeconds: 9999,
        AudioChannels: 0,
        AudioSampleRate: 0,
        AudioBitPerSample: 0,
        IsPublished: true,
        PublishDateTime: Date.now().toString(),
        ProfileBlobUrl: "/",
        Price: 8888,
        Comments: [],
        Tags: [],
        Licenses: [],
    },
]
type Beat = {
    Id: number,
    Path: string
}

const beats:Beat[] =[
    {
        Id: 1,
        Path: DefaultAudio
    },
    {
        Id: 2,
        Path: DefaultAudio2
    },
    {
        Id: 3,
        Path: DefaultAudio3
    }
]

export function FetchAllTracks() {
    return tracks
}

export function FetchPopularTracks() {
    return tracks.slice(0, 4)
}

export function FetchAudio(id: number) {
    const beat = beats.find(p => p.Id == id)
    return beat
}