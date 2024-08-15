export interface UserSlaceState {
  id: string | null
  email: string | null
  name: string | null
  surname: string | null
  country: string | null
  city: string | null
  street: string | null
  number: string | null
  zip: string | null
  phone: string | null
  role: string | undefined | null
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
}
