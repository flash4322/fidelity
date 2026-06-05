import { NextResponse } from 'next/server';

export function GET() {
  const target = process.env.REDIRECT_URL?.trim();

  if (!target) {
    return NextResponse.json(
      { error: 'REDIRECT_URL is not configured' },
      { status: 500 },
    );
  }

  return NextResponse.redirect(target, { status: 302 });
}

