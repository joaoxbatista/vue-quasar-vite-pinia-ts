import moment from 'moment'
export type CustomDate = Date | string | number | null

export const toLocalDate = ({
  date,
  format,
}: {
  date: CustomDate
  format?: string
}) => {
  return moment(date, format).format('DD/MM/YYYY').toString()
}

export const toInternationalDate = ({
  date,
  format,
}: {
  date: CustomDate
  format?: string
}) => {
  return moment(date, format).format('YYYY-MM-DD').toString()
}
