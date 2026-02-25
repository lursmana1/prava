export type TiptapProps = {
  value?: string;
  onChange?: (html: string) => void;
  /** Upload image file and return URL. If not provided, image insert will prompt for URL. */
  onImageUpload?: (file: File) => Promise<string>;
};
