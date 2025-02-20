import { z } from 'zod'

export const envSchema = z.object({
  GRAPHQL_API_URL: z.string().url(),
})
