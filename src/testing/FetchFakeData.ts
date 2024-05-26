import user from '/avatar.jpg'

type Beat = {
    title: string
    author: string,
    tag: string[]
}
type Artist = {
    author: string,
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
const artists: Artist[] = [
    {
        author: "PhantomXXX"
    },
    {
        author: "Ronny J"
    },
    {
        author: "10 Grands"
    },
    {
        author: "Wonder Beats"
    },
    {
        author: "Mac Park"
    },
    {
        author: "ABC"
    },
    {
        author: "Col"
    },
    {
        author: "Bas"
    },
    {
        author: "Tizzy"
    },
    {
        author: "Pam"
    },
]
export {fetchAvt, beats, artists}