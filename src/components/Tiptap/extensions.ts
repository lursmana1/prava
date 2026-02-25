import StarterKit from "@tiptap/starter-kit";
import { TextStyle, Color, FontSize } from "@tiptap/extension-text-style";

export const tiptapExtensions = [
  StarterKit.configure({ heading: { levels: [1, 2, 3, 4, 5] } }),
  TextStyle,
  Color,
  FontSize,
];
