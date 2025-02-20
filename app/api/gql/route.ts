import { cookies } from 'next/headers'

export async function POST(req: Request) {
  const cookieStore = await cookies()
  const body = await req.json()

  const token = cookieStore.get('visitorToken')?.value
  if (!token) {
    return Response.json('Unauthorized', { status: 401 })
  }

  const response = await fetch('https://take-home-be.onrender.com/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })

  const data = await response.json()
  return Response.json(data)
}
