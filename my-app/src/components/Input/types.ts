import type { ChangeEvent } from "react"

export interface InputProps {
  name: string
  type?: string
  placeholder: string
  label?: string
  value?: string | number
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  error?: string
  disabled?: boolean
  mask?: RegExp[]
  maxLength?: number
  min?: number
  max?: number
}
