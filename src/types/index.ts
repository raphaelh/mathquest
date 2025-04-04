export interface Challenge {
  id: number;
  name: string;
  description: string;
  tables: number[];
  completed: boolean;
  stars: number;
}

export interface Question {
  id: number;
  multiplicand: number;
  multiplier: number;
  answer: number;
  answeredCorrectly: boolean;
}

export interface GameState {
  currentChallenge: number;
  challenges: Challenge[];
  currentQuestion: Question | null;
  score: number;
  timeRemaining: number;
  isGameActive: boolean;
}

export interface UserProgress {
  completedChallenges: number[];
  totalStars: number;
  bestTime: number;
} 