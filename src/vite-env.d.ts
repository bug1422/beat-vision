/// <reference types="vite/client" />
interface ProcessEnv {
    VITE_FACEBOOK_URL: string,
    VITE_INSTAGRAM_URL: string
}
interface ImportMetaEnv {
    readonly VITE_FACEBOOK_URL: string
    readonly VITE_INSTAGRAM_URL: string
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}