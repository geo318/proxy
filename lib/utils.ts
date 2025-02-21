import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ZodError } from 'zod'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function logZodError(error: ZodError) {
  const errors = error.issues
    .map((issue) => `${issue.path.pop()} ${issue.message}`)
    .join(', ')
  console.error(errors, error.issues)
}
