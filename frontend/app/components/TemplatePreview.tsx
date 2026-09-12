"use client";

import { useState, useEffect } from "react";

interface TemplatePreviewProps {
  filename: string;
}

function renderMarkdown(md: string): string {
  let html = md
    .replace(/^### (.+)$/gm, '<h3 class="font-bold text-base mt-5 mb-2">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="font-bold text-lg mt-6 mb-3">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="font-bold text-xl mt-6 mb-4">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code class="bg-slate-100 px-1 rounded text-sm">$1</code>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-blue-600 underline" target="_blank">$1</a>')
    .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc">$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4 list-decimal">$2</li>');

  const lines = html.split("\n");
  const result: string[] = [];
  let inList = false;

  for (const line of lines) {
    const isListItem = line.includes("<li");
    if (isListItem && !inList) {
      result.push('<ul class="mb-3 space-y-1">');
      inList = true;
    } else if (!isListItem && inList) {
      result.push("</ul>");
      inList = false;
    }

    if (!isListItem && line.trim() && !line.startsWith("<h") && !line.startsWith("<ul") && !line.startsWith("</ul")) {
      result.push(`<p class="mb-3 text-justify">${line}</p>`);
    } else {
      result.push(line);
    }
  }
  if (inList) result.push("</ul>");

  return result.join("\n");
}

export default function TemplatePreview({ filename }: TemplatePreviewProps) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/templates/${filename}`)
      .then((r) => r.text())
      .then((text) => {
        setContent(text);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [filename]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-slate-500">Loading template...</div>
      </div>
    );
  }

  return (
    <div
      className="bg-white text-slate-800 text-sm leading-relaxed font-serif max-h-[calc(100vh-200px)] overflow-y-auto"
      style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif" }}
    >
      <div
        className="prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
      />
    </div>
  );
}
