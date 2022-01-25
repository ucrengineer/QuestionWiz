
export interface user{
  email : string,
  userName: string,
  country?: string,
  password: string,
  hashed_password ?: string,
  salt ?: string,
  points ?: number,
  quizCount ?: number
}
