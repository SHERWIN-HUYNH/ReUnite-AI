import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const token = req.cookies.get('access_token')?.value
  if (!token) {
    return NextResponse.json({ loggedIn: false }, { status: 401 })
  }

  try {
    console.log('CLIENT Token:', token) // Debugging line to check the token value
    const flaskRes = await fetch(`${process.env.FLASK_URL}/auth/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    const data = await flaskRes.json()
    if (!flaskRes.ok) {
      return NextResponse.json({ loggedIn: false, error: data.message || 'Unauthorized' }, { status: flaskRes.status })
    }

    return NextResponse.json({
      loggedIn: true,
      user: {
        account_id: data.user_id,
        name: data.name,
        email: data.email,
        role: data.role,
        phone: data.phone || '',
      },
    })
  } catch (err) {
    return NextResponse.json({ loggedIn: false, error: 'Internal Server Error' }, { status: 500 })
  }
}