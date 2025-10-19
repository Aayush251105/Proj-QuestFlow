"use client";

import React, { useState } from "react";
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
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          tags: tags.split(",").map(t => t.trim()),
          authorId: session.userId,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to submit question");
      }

      alert("Question submitted successfully!");
      router.push("/questions");
    } catch (error: any) {
      console.error("Error:", error);
      alert(error.message);
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
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          placeholder="Describe your question..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
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
