import { NextResponse } from 'next/server';
import { signJWT } from '@/lib/jwt';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { anniversary } = body;

    if(anniversary === process.env.ANNIVERSARY_DATE) {
      // Generate JWT token
      const token = signJWT();
      
      // Set cookie with token
      const response = NextResponse.json({ success: true });
      response.cookies.set({
        name: 'auth-token',
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 // 7 days in seconds
      });

      return response;
    }
    
    return NextResponse.json({ error: 'Invalid anniversary code' }, { status: 401 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}