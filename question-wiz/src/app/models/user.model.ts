
export interface user{
  email : string,
  userName: string,
  country?: string,
  password: string,
  hash_password ?: string,
  salt ?: string,
  points ?: number
}
