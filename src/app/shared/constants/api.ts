import { environment } from '@environments/environment'

const { baseUrl } = environment

export const API = {
  BASE_URL: baseUrl,
  SIGNIN: `${baseUrl}/api/signin`,
  USER: `${baseUrl}/api/users`,
}
