import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    await dbConnect();

    // Check if any user already exists - Registration is strictly ONCE.
    const existingUserCount = await User.countDocuments();
    if (existingUserCount > 0) {
      // Once a user is added, we do not allow more additions.
      return NextResponse.json({ message: 'Registration disabled. Admin already exists.' }, { status: 403 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ message: 'Admin user created successfully' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// Ensure no other methods are available to prevent unauthorized access or updates
export async function PUT() { return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 }); }
export async function DELETE() { return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 }); }
export async function PATCH() { return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 }); }
