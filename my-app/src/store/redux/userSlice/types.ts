export interface UserSlaceState {
  id: string | null
  name: string | null
  email: string | null
  role: string | undefined | null
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
}
