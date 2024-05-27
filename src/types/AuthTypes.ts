export type AuthReturnType = {
	accessToken: string,
	accessToken_Expired?: string,
	refreshToken: string,
	refreshToken_Expired?: string,
}
export type UserDecoded = {
	"email": string,
	"userid": string,
	"role": string,
	"exp": number,
}
