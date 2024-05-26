import user from '/avatar.jpg'

type Beat = {
    title: string
    author: string,
    tag: string[]
}
const fetchAvt = user
const beats: Beat[] = [
    {
        title: "Sainte type beat",
        author: "Kbrd",
        tag: ["Slow","135BPM","Rock","Sainte","Kbrd"]
    },
    {
        title: "Dababy type beat",
        author: "PhantomXXX",
        tag: ["Trap","Hiphop"]
    },
    {
        title: "LilPeep type beat",
        author: "Col",
        tag: ["Pop","Blue","Sad"]
    },
    {
        title: "Sainte type beat",
        author: "Kbrd",
        tag: ["Slow","135BPM","Rock"]
    },
    {
        title: "Dababy type beat",
        author: "PhantomXXX",
        tag: ["Trap","Hiphop"]
    },
    {
        title: "LilPeep type beat",
        author: "Col",
        tag: ["Pop","Blue","Sad"]
    },
    {
        title: "Sainte type beat",
        author: "Kbrd",
        tag: ["Slow","135BPM","Rock"]
    },
    {
        title: "Dababy type beat",
        author: "PhantomXXX",
        tag: ["Trap","Hiphop"]
    },
    {
        title: "LilPeep type beat",
        author: "Col",
        tag: ["Pop","Blue","Sad"]
    }
]

export {fetchAvt, beats}