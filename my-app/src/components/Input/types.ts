import { ChangeEvent } from "react"

export interface InputProps {
  name: string
  type?: string
  placeholder: string
  label?: string
  value?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  error?: string
}
