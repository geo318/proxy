import { NextRequest, NextResponse } from 'next/server'
import { env } from '@/lib/env'
import { ROUTES } from './config'
import { REGISTER_MUTATION } from './graphql/register'

const externalApiUrl = env.GRAPHQL_API_URL

export async function middleware(request: NextRequest) {
  const existingToken = request.cookies.get('visitorToken')?.value
  let token = existingToken

  if (!token) {
    const registerRes = await fetch(externalApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: REGISTER_MUTATION,
      }),
    })

    const registerData = await registerRes.json()
    token = registerData.data?.register?.token

    if (!token) {
      return NextResponse.error()
    }
  }

  const modifiedHeaders = new Headers(request.headers)
  modifiedHeaders.set('Authorization', `Bearer ${token}`)

  const response = NextResponse.next({
    request: {
      ...request,
      headers: modifiedHeaders,
    },
  })

  if (!existingToken) {
    response.cookies.set('visitorToken', token, {
      path: '/',
      sameSite: 'strict',
      secure: true,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
    })
  }

  return response
}

export const config = {
  matcher: `${ROUTES.api_route}:path*`,
}
