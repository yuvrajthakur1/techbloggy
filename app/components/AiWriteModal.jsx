
"use client";
import React, { useState } from "react";
import api from "../axios/axios";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { X, Clipboard, Trash2 } from "lucide-react";

export default function AIWriterModal({ open, setChatOpen }) {
  const [idea, setIdea] = useState("");
  const [tone, setTone] = useState("informative");
  const [wordCount, setWordCount] = useState(600);
  const [loading, setLoading] = useState(false);
  const [markdown, setMarkdown] = useState("");

  const handleGenerate = async () => {
    if (!idea.trim()) return alert("Please enter a blog idea or topic");
    setLoading(true);

    try {
      const userPrompt = `Write a blog post about: "${idea}". Tone: ${tone}. Target words: ${wordCount}. Generate output in Markdown format, ready to post.`;
      const res = await api.post("/generate-markdown", {
        prompt: userPrompt,
        maxTokens: 1000,
      });
      setMarkdown(res.data.markdown || "");
    } catch (err) {
      console.error(err);
      alert("Blog generation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative bg-[#19183B]  w-full max-w-3xl rounded-xl p-6 border border-[#708993]/30 shadow-xl max-h-[90vh] overflow-y-auto transition-all duration-300">
        
        {/* Close Button */}
        <button
          onClick={()=> setChatOpen(false)}
          className="absolute top-3 right-3 text-[#E7F2EF]/70 hover:text-[#E7F2EF] transition-colors"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <h3 className="text-xl font-semibold text-[#E7F2EF] mb-5 text-center">
          🧠 AI Blog Writer
        </h3>

        {/* Input Section */}
        <div className="flex flex-col gap-3 mb-4">
          <input
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="💡 e.g. How to build a responsive navbar in React + Tailwind"
            className="p-3 rounded-lg bg-[#19183B]  text-[#E7F2EF] border border-[#708993]/50 focus:outline-none focus:ring-2 focus:ring-[#A1C2BD] placeholder:text-[#708993] transition-all"
          />

          <div className="flex flex-wrap gap-3 items-center">
            <input
              type="number"
              value={wordCount}
              onChange={(e) => setWordCount(Number(e.target.value))}
              className="p-3 rounded-lg bg-[#19183B]  text-[#E7F2EF] border border-[#708993]/50 focus:ring-2 focus:ring-[#A1C2BD] w-32"
            />
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="p-3 rounded-lg bg-[#19183B]  text-[#E7F2EF] border border-[#708993]/50 focus:ring-2 focus:ring-[#A1C2BD]"
            >
              <option value="informative">Informative</option>
              <option value="tutorial">Tutorial (step-by-step)</option>
              <option value="friendly">Friendly</option>
              <option value="professional">Professional</option>
            </select>

            <Button
              onClick={handleGenerate}
              disabled={loading}
              className="ml-auto bg-[#708993] hover:bg-[#A1C2BD] text-[#19183B] px-5 py-2 rounded-lg transition-all font-medium"
            >
              {loading ? "Generating..." : "Generate Markdown"}
            </Button>
          </div>
        </div>

        {/* Output Section */}
        <div>
          <h4 className="text-sm text-[#A1C2BD] mb-2">📝 Preview (Markdown)</h4>
          <div className="bg-[#1E1D47] text-[#E7F2EF] p-4 rounded-lg max-h-64 overflow-y-auto border border-[#708993]/40">
            {markdown ? (
              <ReactMarkdown>{markdown}</ReactMarkdown>
            ) : (
              <p className="text-[#708993] italic">
                No output yet — click <span className="text-[#A1C2BD]">Generate</span>.
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-5 justify-end">
            <Button
              onClick={() => navigator.clipboard.writeText(markdown)}
              disabled={!markdown}
              className="bg-[#A1C2BD]/20 hover:bg-[#A1C2BD]/30 text-[#E7F2EF] px-5 py-2 rounded-lg flex items-center gap-2 transition-all"
            >
              <Clipboard size={16} /> Copy Markdown
            </Button>
            <Button
              onClick={() => {
                setMarkdown("");
                setIdea("");
              }}
              className="bg-[#A1C2BD]/20 hover:bg-[#A1C2BD]/30 text-[#E7F2EF] px-5 py-2 rounded-lg flex items-center gap-2 transition-all"
            >
              <Trash2 size={16} /> Clear
            </Button>
          </div>

          {/* Tip Section */}
          {markdown && (
            <p className="text-[#A1C2BD] text-sm mt-4 border-t border-[#708993]/30 pt-3">
              💡 <strong>Tip:</strong> Copy the Markdown above and paste it into your
              blog editor. Adjust headings and formatting as needed.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
