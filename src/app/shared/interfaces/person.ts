import { AddressI } from './address'
import { ContactI } from './contact';

export interface Person {
  userId?: number
  firstName?: string
  lastName?: string
  birthDate?: Date
  address?: AddressI
  contact?: ContactI
}
