"use client";

import type { Editor } from "@tiptap/react";
import ToolbarStructure from "./ToolbarStructure";
import ToolbarFont from "./ToolbarFont";
import ToolbarFormat from "./ToolbarFormat";
import ToolbarBlocks from "./ToolbarBlocks";

type TiptapToolbarProps = {
  editor: Editor;
};

function ToolbarDivider() {
  return <div className="mx-1 h-6 w-px shrink-0 bg-slate-200" />;
}

export default function TiptapToolbar({ editor }: TiptapToolbarProps) {
  const textStyle = editor.getAttributes("textStyle");
  const run = (fn: (e: Editor) => void) => () => fn(editor);

  return (
    <div className="flex flex-col gap-2 border-b border-slate-200 bg-slate-50 p-2">
      <div className="flex flex-wrap items-center gap-2">
        <ToolbarStructure editor={editor} run={run} />
        <ToolbarDivider />
        <ToolbarFont editor={editor} textStyle={textStyle} />
        <ToolbarDivider />
        <ToolbarFormat editor={editor} run={run} />
      </div>
      <ToolbarBlocks editor={editor} run={run} />
    </div>
  );
}
