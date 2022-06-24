export interface User {
  admin: boolean
  change: string
  comment: string
  expire: number | string
  expire_date: string
  groups: string[]
  locked: number
  login: string
}

export interface Me {
  system_groups: Array<string>
  user_groups: Array<object>
  comment: string
  user: string
}
