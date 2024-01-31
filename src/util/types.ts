import { Category, Like, Memo, Question, User } from '@prisma/client';

export type MemoType = 'class' | 'exam' | 'other';

export const memoTypes = ['class', 'exam', 'other'];

export const accountTypes = ['admin', 'member'];

export type QuestionType = 'radio' | 'checkbox' | 'text';

export const questionTypes = ['radio', 'checkbox', 'text'];

export interface ExtendedMemo extends Memo {
  user: User;
  category: Category;
  questions: Question[];
  likes: Like[];
}
