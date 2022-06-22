export default interface User {
  admin: boolean
  change: string
  comment: string
  expire: number | string
  expire_date: string
  groups: string[]
  locked: number
  login: string
}
