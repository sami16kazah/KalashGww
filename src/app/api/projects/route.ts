import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Project from "@/models/Project";

// GET: Fetch all projects
export async function GET() {
  await dbConnect();
  try {
    const projects = await Project.find({}).sort({ createdAt: -1 });
    return NextResponse.json(projects);
  } catch (err) {
    console.error("GET Projects Error:", err);
    return NextResponse.json({ message: "Error fetching projects" }, { status: 500 });
  }
}

// POST: Create a new project
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  try {
    const body = await request.json();
    console.log("Creating Project with body:", body);
    const project = await Project.create(body);
    return NextResponse.json(project, { status: 201 });
  } catch (err: any) {
    console.error("POST Project Error:", err);
    return NextResponse.json({ 
        message: "Error creating project", 
        error: err.message 
    }, { status: 500 });
  }
}

// DELETE: Delete a project
export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ message: "ID required" }, { status: 400 });

    await Project.findByIdAndDelete(id);
    return NextResponse.json({ message: "Project deleted" });
  } catch (err) {
    console.error("DELETE Project Error:", err);
    return NextResponse.json({ message: "Error deleting project" }, { status: 500 });
  }
}

// PUT: Update a project
export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  try {
    const body = await request.json();
    const { _id, ...updateData } = body;

    if (!_id) return NextResponse.json({ message: "ID required" }, { status: 400 });

    const project = await Project.findByIdAndUpdate(_id, updateData, { new: true });
    return NextResponse.json(project);
  } catch (err) {
    console.error("PUT Project Error:", err);
    return NextResponse.json({ message: "Error updating project" }, { status: 500 });
  }
}
