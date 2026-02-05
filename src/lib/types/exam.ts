export interface ExamQuestion {
  id: string | number;
  question: string;
  question_explained: string;
  correct_answer: string;
  answer_1: string;
  answer_2: string;
  answer_3: string | null;
  answer_4: string | null;
  subject: number;
  categories: number[];
  hasAudio?: number;
  audio: string | null;
  hasImg: number;
  img?: string | null;
  imgSize?:  null;
}
