export interface Object {
  active: boolean
  groups: Array<Group>
  id: number
  lat: number
  lon: number
  full_name: string
  object_name: string
}

export interface Group {
  channels: Array<Channel>
  group_name: string
  id: number
}

export interface Channel {
  channel_name: string
  state: number
  id: number
}
