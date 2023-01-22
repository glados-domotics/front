export const baseApiUrl = process.env.VUE_APP_BASE_API_URL
export const bearerToken = "Bearer " + process.env.VUE_APP_BEARER_TOKEN

export default { bearerToken, baseApiUrl }
