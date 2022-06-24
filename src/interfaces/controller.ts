export default interface Controller {
  complex_name: string
  groups: { additional_text_id: string, controller_id: number, direction: number, group_name: string, id: number, object_id: number }[]
  host: string
  id: number
  password: string
  protocol: number
  public_key: string
  serial: string
  username: string
}
