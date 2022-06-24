import type Amts from '@/interfaces/amts'

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
  direction: number
  object_id: number
  channels: Array<Channel>
  group_name: string
  id: number
}

export interface Channel {
  group: Group
  passages: Array<Amts>
  group_id: number
  last_number_time: string
  camera_id: number
  channel_name: string
  state: number
  id: number
}
