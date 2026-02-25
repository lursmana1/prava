export type TiptapProps = {
  value?: string;
  onChange?: (html: string) => void;
  /** When true, content is read-only and toolbar is hidden. */
  readonly?: boolean;
};
