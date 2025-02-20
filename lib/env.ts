import { envSchema } from '@/schema/env.schema'

export const env = envSchema.parse(process.env)
