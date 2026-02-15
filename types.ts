export interface StoryScene {
  id: string;
  title: string;
  description: string;
  symbol: 'moon' | 'trishul' | 'drum' | 'om' | 'lotus';
  color: string;
}

export enum AppState {
  LANDING = 'LANDING',
  STORY = 'STORY',
  BLESSING = 'BLESSING',
}