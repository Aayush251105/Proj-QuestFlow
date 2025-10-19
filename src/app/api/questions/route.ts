import { NextResponse } from "next/server";
import { databases } from "@/models/server/config";      // server-side Appwrite config using API key
import { db, questionCollection } from "@/models/name";  // your DB + collection IDs
import { ID, Permission, Role } from "node-appwrite";

// POST /api/questions
export async function POST(req: Request) {
  try {
    // 1️⃣ Parse the request body
    const { title, content, tags, authorId } = await req.json();

    if (!title || !content || !authorId) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    // 2️⃣ Create the question document in Appwrite
    const document = await databases.createDocument(
      db,
      questionCollection,
      ID.unique(),
      {
        title,
        content,
        tags,
        authorId,
      },
      [
        Permission.read(Role.any()),           // Anyone can read
        Permission.update(Role.user(authorId)),// Only the author can edit
        Permission.delete(Role.user(authorId)),// Only the author can delete
        Permission.write(Role.user(authorId)), // Only the author can write
      ]
    );

    // 3️⃣ Return the created document
    return NextResponse.json(document);
  } catch (error: any) {
    console.error("Error creating question:", error);
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}
