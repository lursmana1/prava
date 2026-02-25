import StarterKit from "@tiptap/starter-kit";
import { TextStyle, Color, FontSize } from "@tiptap/extension-text-style";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";

export const tiptapExtensions = [
  StarterKit.configure({ heading: { levels: [1, 2, 3, 4, 5] } }),
  TextStyle,
  Color,
  FontSize,
  Link.configure({ openOnClick: false }),
  Image.configure({ inline: false }),
];
