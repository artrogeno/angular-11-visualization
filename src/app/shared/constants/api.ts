import { environment } from '@environments/environment'

const { baseUrl } = environment

export const API = {
  BASE_URL: baseUrl,
  SIGNIN: `${baseUrl}/api/signin`,
  USER: `${baseUrl}/api/system/users`,
  COUNTRY: `${baseUrl}/api/geo/countries`,
  STATE: `${baseUrl}/api/geo/states`,
  PHONE_TYPES: `${baseUrl}/api/info/phoneType`,
  EMAIL_TYPES: `${baseUrl}/api/info/emailType`,
}
