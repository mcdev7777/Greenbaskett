import React from "react"
import { FieldError } from "react-hook-form"

interface FormErrorProps {
  error?: FieldError
}

export function FormError({ error }: FormErrorProps) {
  if (!error) return null

  return (
    <p className="text-sm font-medium text-red-600 mt-1">
      {error.message}
    </p>
  )
}
