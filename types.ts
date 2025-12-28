
export type Tone = 'Professional' | 'Viral' | 'Academic' | 'Casual' | 'Creative';

export interface Prompt {
  id: string;
  rawInput: string;
  polishedOutput: string;
  tone: Tone;
  createdAt: string;
  isFavorite: boolean;
}

export interface ContentJob {
  id: string;
  promptId: string;
  platform: 'Twitter' | 'LinkedIn';
  status: 'Pending' | 'Published' | 'Failed';
  scheduledFor: string;
}

export enum View {
  LANDING = 'landing',
  DASHBOARD = 'dashboard',
  LIBRARY = 'library',
  SCHEDULER = 'scheduler',
  SETTINGS = 'settings'
}
