import { NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const hashedPassword = await bcryptjs.hash(newPassword, 10);

    return NextResponse.json({ message: 'Password updated successfully', hashedPassword }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}