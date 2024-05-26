<<<<<<< Updated upstream
import user from '@/assets/images/avatar.jpg'

type User = {
	id: number
	email?: string
	username: string
	password: string
	firstName: string
	lastName: string
	role: string
	token: string
}
=======
import user from '#/avatar.jpg'
>>>>>>> Stashed changes

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