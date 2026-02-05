import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/mongodb';
import Manager from '@/models/Manager';

export async function GET() {
  await dbConnect();
  const manager = await Manager.findOne();
  return NextResponse.json(manager);
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();
    const { _id, __v, ...updateData } = data;
    await dbConnect();

    let manager = await Manager.findOne();
    if (manager) {
      // Find the existing one and update it with the new full-site config
      manager = await Manager.findByIdAndUpdate(manager._id, updateData, { new: true });
    } else {
      // Create the first entry
      manager = await Manager.create(data);
    }

    return NextResponse.json(manager);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
