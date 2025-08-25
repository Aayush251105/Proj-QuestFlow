"use client";

import React, { useState } from "react";
import { databases } from "@/models/server/config";
import { db, questionCollection } from "@/models/name";
import { ID, Permission, Role } from "node-appwrite";
import { useAuthStore } from "@/store/Auth";
import { useRouter } from "next/navigation";

export default function AskQuestionPage() {
  const router = useRouter();
  const { session } = useAuthStore();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      alert("You must be logged in to ask a question.");
      return;
    }

    try {
      await databases.createDocument(
        db,
        questionCollection,
        ID.unique(),
        {
          title,
          content,
          tags: tags.split(",").map(tag => tag.trim()),
          authorId: session.userId,
        },
        [
          Permission.read(Role.any()),                  // Anyone can read
          Permission.update(Role.user(session.userId)), // Only owner can update
          Permission.delete(Role.user(session.userId)), // Only owner can delete
          Permission.write(Role.user(session.userId)),  // Only owner can write
        ]
      );

      router.push("/questions");
    } catch (err) {
      console.error(err);
      alert("Failed to submit question.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold mb-6">Ask a Question</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
        <input
          type="text"
          placeholder="Question title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          placeholder="Describe your question..."
          value={content}
          onChange={e => setContent(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={e => setTags(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit Question
        </button>
      </form>
    </div>
  );
}
