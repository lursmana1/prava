"use client";

import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import TiptapToolbar from "./TiptapToolbar";
import { tiptapExtensions } from "./extensions";
import type { TiptapProps } from "./types";

export default function Tiptap({ value = "", onChange }: TiptapProps) {
  const editor = useEditor({
    extensions: tiptapExtensions,
    content: value || "<p></p>",
    editorProps: {
      attributes: { class: "focus:outline-none min-h-[120px] px-2 py-1" },
    },
    immediatelyRender: false,
    onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
  });

  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    const next = value || "<p></p>";
    if (current !== next)
      editor.commands.setContent(next, { emitUpdate: false });
  }, [editor, value]);

  if (!editor) return null;

  return (
    <div className="overflow-hidden rounded-lg border border-slate-300">
      <TiptapToolbar editor={editor} />
      <div className="tiptap-prose">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
