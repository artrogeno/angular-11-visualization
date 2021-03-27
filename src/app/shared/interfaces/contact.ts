import { EmailI } from "./email";
import { PhoneI } from "./phone";

export interface ContactI {
  userId: number
  phones?: EmailI[]
  email?: PhoneI[]
}
