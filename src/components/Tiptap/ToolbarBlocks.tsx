"use client";

import type { Editor } from "@tiptap/react";
import ToolbarButton from "./ToolbarButton";

type ToolbarBlocksProps = {
  editor: Editor;
  run: (fn: (e: Editor) => void) => () => void;
};

export default function ToolbarBlocks({ editor, run }: ToolbarBlocksProps) {
  return (
    <div className="flex items-center gap-1">
      <ToolbarButton
        onClick={run((e) => e.chain().focus().toggleBulletList().run())}
        active={editor.isActive("bulletList")}
        title="Bullet list"
      >
        •
      </ToolbarButton>
      <ToolbarButton
        onClick={run((e) => e.chain().focus().toggleOrderedList().run())}
        active={editor.isActive("orderedList")}
        title="Numbered list"
      >
        1.
      </ToolbarButton>
      <ToolbarButton
        onClick={run((e) => e.chain().focus().toggleBlockquote().run())}
        active={editor.isActive("blockquote")}
        title="Quote"
      >
        "
      </ToolbarButton>
    </div>
  );
}
