"use client";

import type { Editor } from "@tiptap/react";
import ToolbarButton from "./ToolbarButton";

type ToolbarFormatProps = {
  editor: Editor;
  run: (fn: (e: Editor) => void) => () => void;
};

export default function ToolbarFormat({ editor, run }: ToolbarFormatProps) {
  return (
    <div className="flex items-center gap-0.5">
      <ToolbarButton
        onClick={run((e) => e.chain().focus().toggleBold().run())}
        active={editor.isActive("bold")}
        title="Bold"
      >
        <strong>B</strong>
      </ToolbarButton>
      <ToolbarButton
        onClick={run((e) => e.chain().focus().toggleItalic().run())}
        active={editor.isActive("italic")}
        title="Italic"
      >
        <em>I</em>
      </ToolbarButton>
      <ToolbarButton
        onClick={run((e) => e.chain().focus().toggleUnderline().run())}
        active={editor.isActive("underline")}
        title="Underline"
      >
        <u>U</u>
      </ToolbarButton>
      <ToolbarButton
        onClick={run((e) => e.chain().focus().toggleStrike().run())}
        active={editor.isActive("strike")}
        title="Strikethrough"
      >
        <s>S</s>
      </ToolbarButton>
    </div>
  );
}
