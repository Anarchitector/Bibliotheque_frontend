export interface UserSlaceState {
  id: string | null
  email: string | null
  role: string | undefined | null
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
}
