import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await auth();
    const isGoogleConfigured = Boolean(
      (process.env.AUTH_GOOGLE_ID || process.env.GOOGLE_CLIENT_ID) &&
      (process.env.AUTH_GOOGLE_SECRET || process.env.GOOGLE_CLIENT_SECRET)
    );

    return NextResponse.json({
      authenticated: Boolean(session?.user),
      user: session?.user || null,
      isGoogleConfigured,
    });
  } catch (err: any) {
    return NextResponse.json({ authenticated: false, user: null, isGoogleConfigured: false });
  }
}
