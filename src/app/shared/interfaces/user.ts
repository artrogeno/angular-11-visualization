import { AddressI } from './address';
import { CommerceI } from './commerce';
import { EmailI } from './email';
import { PhoneI } from './phone';

export interface UserI {
  id?: number
  terms?: boolean
  title?: string
  suffix?: string
  firstName: string
  lastName: string
  language?: string
  middleName?: string
  hireDate?: Date | string
  birthDate?: Date | string
  gender: string
  officeNo?: string
  position?: string
  address?: AddressI
  commerce?: CommerceI
  emailAddresses?: EmailI[]
  phoneNumbers?: PhoneI[]
}

export interface UserPaginationI {
  items: UserI[]
  total_count: number
}
