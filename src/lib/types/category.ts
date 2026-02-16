import { Subject } from "./subject";

export interface Category {
  id: number;
  name: string;
  iconKey: string;
  questionsCount: number;
  subjectCount: number;
}
export interface CategoryWithSubjects extends Category {
  subjects: Subject[];
}
