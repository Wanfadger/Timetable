export interface LoginResponse{
  token:string,
  message: string,
  response: boolean
}

export interface LoginRequestDto{
  username:string,
  password: string
}
