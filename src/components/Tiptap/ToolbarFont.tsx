"use client";

import type { Editor } from "@tiptap/react";
import { FONT_SIZES, COLORS } from "./constants";

type ToolbarFontProps = {
  editor: Editor;
  textStyle: Record<string, unknown>;
};

export default function ToolbarFont({ editor, textStyle }: ToolbarFontProps) {
  return (
    <div className="flex items-center gap-0.5">
      <select
        value={(textStyle.fontSize as string) ?? "16px"}
        onChange={(e) =>
          editor.chain().focus().setFontSize(e.target.value).run()
        }
        className="rounded border border-slate-200 bg-white px-2 py-1 text-sm text-slate-700 hover:border-slate-300"
        title="Font size"
      >
        {FONT_SIZES.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
      <div className="flex gap-1" title="Font color">
        {COLORS.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => editor.chain().focus().setColor(color).run()}
            className={`h-6 w-6 shrink-0 rounded border-2 transition-colors ${
              textStyle.color === color
                ? "border-slate-800 ring-2 ring-slate-400"
                : "border-slate-200 hover:border-slate-300"
            }`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
}
