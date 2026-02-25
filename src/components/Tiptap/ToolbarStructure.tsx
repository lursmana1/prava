"use client";

import type { Editor } from "@tiptap/react";
import ToolbarButton from "./ToolbarButton";

type ToolbarStructureProps = {
  editor: Editor;
  run: (fn: (e: Editor) => void) => () => void;
};

export default function ToolbarStructure({ editor, run }: ToolbarStructureProps) {
  return (
    <div className="flex items-center gap-0.5">
      <ToolbarButton
        onClick={run((e) => e.chain().focus().setParagraph().run())}
        active={editor.isActive("paragraph")}
        title="Paragraph"
      >
        P
      </ToolbarButton>
      {([1, 2, 3, 4, 5] as const).map((level) => (
        <ToolbarButton
          key={level}
          onClick={run((e) => e.chain().focus().toggleHeading({ level }).run())}
          active={editor.isActive("heading", { level })}
          title={`Heading ${level}`}
        >
          H{level}
        </ToolbarButton>
      ))}
    </div>
  );
}
