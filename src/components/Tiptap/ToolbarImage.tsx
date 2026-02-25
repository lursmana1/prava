"use client";

import type { Editor } from "@tiptap/react";
import ToolbarButton from "./ToolbarButton";
import { IMAGE_ICON } from "./constants";

type ToolbarImageProps = {
  editor: Editor;
  onImageUpload?: (file: File) => Promise<string>;
};

const icon = <span className="text-sm font-medium">{IMAGE_ICON}</span>;

export default function ToolbarImage({ editor, onImageUpload }: ToolbarImageProps) {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onImageUpload) return;
    e.target.value = "";
    try {
      const url = await onImageUpload(file);
      editor.chain().focus().setImage({ src: url }).run();
    } catch (err) {
      console.error("Image upload failed:", err);
    }
  };

  if (onImageUpload) {
    return (
      <label
        title="Insert image"
        className="flex min-w-[28px] cursor-pointer items-center justify-center rounded px-2 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200"
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="sr-only"
        />
        {icon}
      </label>
    );
  }

  return (
    <ToolbarButton
      onClick={() => {
        const url = window.prompt("Image URL:");
        if (url) editor.chain().focus().setImage({ src: url }).run();
      }}
      title="Insert image"
    >
      {icon}
    </ToolbarButton>
  );
}
