import { LocalDate } from "@js-joda/core"

export interface PublicHoliday{
  id?:string
  name:string
  description:string
  date:LocalDate
}
