export interface Role {
  id: number
  title: string
  authority: string
}

export interface User {
  id: number
  email: string
  password: string
  name: string | null
  surname: string | null
  country: string | null
  city: string | null
  street: string | null
  number: string | null
  zip: string | null
  phone: string | null
  active: boolean
  roles: Role[]
  enabled: boolean
  authorities: Role[]
  username: string
  accountNonLocked: boolean
  credentialsNonExpired: boolean
  accountNonExpired: boolean
}
