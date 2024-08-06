import type { ChangeEvent } from "react"

export interface InputPhoneProps {
  name: string
  type?: string
  placeholder: string
  label?: string
  value?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  error?: string
  disabled?: boolean
}
