import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, Button, TextField, CircularProgress, LinearProgress, Fade } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Challenge, Question, GameState } from '../types';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Confetti from 'react-confetti';
import { useSoundEffects } from '../hooks/useSoundEffects';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const GameContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100%',
  maxHeight: '100%',
  position: 'relative',
  background: 'linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%)',
  borderRadius: '20px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  padding: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
  },
}));

const QuestionBox = styled(motion(Box))(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(3),
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  borderRadius: '20px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  maxWidth: '600px',
  width: '100%',
  position: 'relative',
  border: '3px solid #2196f3',
  maxHeight: '90vh',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    minHeight: 'auto',
  },
}));

const QuestionText = styled(Typography)(({ theme }) => ({
  fontSize: '2.5rem',
  fontWeight: 'bold',
  color: '#1976d2',
  textAlign: 'center',
  marginBottom: theme.spacing(2),
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
    marginBottom: theme.spacing(1.5),
  },
}));

const AnswerForm = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: theme.spacing(1.5),
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(1),
  },
}));

const AnswerInput = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '15px',
    fontSize: '1.3rem',
    height: '50px',
    backgroundColor: 'white',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    '&:hover': {
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    },
    '&.Mui-focused': {
      boxShadow: '0 0 0 2px #2196f3',
    },
    [theme.breakpoints.down('sm')]: {
      height: '45px',
      fontSize: '1.1rem',
    },
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  height: '50px',
  borderRadius: '15px',
  fontSize: '1.1rem',
  fontWeight: 'bold',
  background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
  '&:hover': {
    background: 'linear-gradient(45deg, #1976d2 30%, #1e88e5 90%)',
  },
  [theme.breakpoints.down('sm')]: {
    height: '45px',
    fontSize: '1rem',
  },
}));

const StartButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 3),
  fontSize: '1.3rem',
  fontWeight: 'bold',
  background: 'linear-gradient(45deg, #4caf50 30%, #8bc34a 90%)',
  boxShadow: '0 3px 5px 2px rgba(76, 175, 80, .3)',
  '&:hover': {
    background: 'linear-gradient(45deg, #388e3c 30%, #689f38 90%)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1, 2),
    fontSize: '1.1rem',
  },
}));

const TimerContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1.5),
  right: theme.spacing(1.5),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  padding: theme.spacing(0.75, 1.5),
  borderRadius: '20px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  border: '2px solid #ff9800',
  [theme.breakpoints.down('sm')]: {
    top: theme.spacing(1),
    right: theme.spacing(1),
    padding: theme.spacing(0.5, 1),
  },
}));

const TimerText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: '#ff9800',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
  },
}));

const FeedbackContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 10,
}));

const FeedbackText = styled(Typography)(({ theme }) => ({
  fontSize: '2.5rem',
  fontWeight: 'bold',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
  },
}));

const ProgressBarContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  height: '10px',
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
  borderRadius: '0 0 20px 20px',
  overflow: 'hidden',
}));

const ProgressBar = styled(LinearProgress)(({ theme }) => ({
  height: '100%',
  borderRadius: '0 0 20px 20px',
  '& .MuiLinearProgress-bar': {
    background: 'linear-gradient(90deg, #4caf50 0%, #8bc34a 100%)',
  },
}));

const initialChallenges: Challenge[] = [
  {
    id: 1,
    name: "The Beginning",
    description: "Master the 2 and 3 times tables!",
    tables: [2, 3],
    completed: false,
    stars: 0,
  },
  {
    id: 2,
    name: "The Forest Path",
    description: "Conquer the 4 and 5 times tables!",
    tables: [4, 5],
    completed: false,
    stars: 0,
  },
  {
    id: 3,
    name: "The Mountain Pass",
    description: "Tackle the 6 and 7 times tables!",
    tables: [6, 7],
    completed: false,
    stars: 0,
  },
  {
    id: 4,
    name: "The Dragon's Lair",
    description: "Face the 8 and 9 times tables!",
    tables: [8, 9],
    completed: false,
    stars: 0,
  },
  {
    id: 5,
    name: "The Final Quest",
    description: "Master all tables from 2 to 9!",
    tables: [2, 3, 4, 5, 6, 7, 8, 9],
    completed: false,
    stars: 0,
  },
];

interface GameProps {
  gameState: GameState;
  onGameStateChange: (newState: GameState) => void;
  onQuestionsChange?: (questions: Question[]) => void;
}

const Game: React.FC<GameProps> = ({ gameState, onGameStateChange, onQuestionsChange }) => {
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [feedback, setFeedback] = useState<{ type: 'correct' | 'wrong' | null; show: boolean }>({
    type: null,
    show: false,
  });
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  
  // Add a ref for the input field
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Use custom sound effects hook
  const { playCorrectSound, playWrongSound } = useSoundEffects();

  // Update window size for confetti
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Focus the input field whenever the game is active or when a new question is loaded
  useEffect(() => {
    if (gameState.isGameActive && inputRef.current) {
      // Small delay to ensure the input is rendered
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [gameState.isGameActive, gameState.currentQuestion]);

  // Update parent component when questions change
  useEffect(() => {
    if (onQuestionsChange) {
      onQuestionsChange(questions);
    }
  }, [questions, onQuestionsChange]);

  const generateQuestions = (tables: number[]): Question[] => {
    const newQuestions: Question[] = [];
    tables.forEach(table => {
      for (let i = 2; i <= 9; i++) {
        newQuestions.push({
          id: newQuestions.length + 1,
          multiplicand: table,
          multiplier: i,
          answer: table * i,
          answeredCorrectly: false,
        });
      }
    });
    return shuffleArray(newQuestions);
  };

  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const startChallenge = () => {
    const currentChallenge = gameState.challenges[gameState.currentChallenge];
    const newQuestions = generateQuestions(currentChallenge.tables);
    setQuestions(newQuestions);
    onGameStateChange({
      ...gameState,
      currentQuestion: newQuestions[0],
      isGameActive: true,
      timeRemaining: 60,
    });
  };

  const handleAnswerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gameState.currentQuestion) return;

    const answer = parseInt(userAnswer);
    const isCorrect = answer === gameState.currentQuestion.answer;

    // Clear any existing feedback first
    setFeedback({ type: null, show: false });
    
    // Use a small timeout to ensure the feedback is cleared before showing new feedback
    setTimeout(() => {
      if (isCorrect) {
        playCorrectSound();
        setShowConfetti(true);
        setTimeout(() => {
          setShowConfetti(false);
        }, 3000);
        
        // Show correct feedback
        setFeedback({ type: 'correct', show: true });
        
        // Hide feedback after 1.5 seconds
        setTimeout(() => {
          setFeedback({ type: null, show: false });
        }, 1500);
      } else {
        playWrongSound();
        
        // Show wrong feedback
        setFeedback({ type: 'wrong', show: true });
        
        // Hide feedback after 1.5 seconds
        setTimeout(() => {
          setFeedback({ type: null, show: false });
        }, 1500);
      }
    }, 50); // Small delay to ensure previous feedback is cleared

    if (isCorrect) {
      const updatedQuestions = questions.map(q =>
        q.id === gameState.currentQuestion?.id
          ? { ...q, answeredCorrectly: true }
          : q
      );
      setQuestions(updatedQuestions);

      const allCorrect = updatedQuestions.every(q => q.answeredCorrectly);
      if (allCorrect) {
        const updatedChallenges = [...gameState.challenges];
        updatedChallenges[gameState.currentChallenge].completed = true;
        updatedChallenges[gameState.currentChallenge].stars = 3;

        onGameStateChange({
          ...gameState,
          challenges: updatedChallenges,
          isGameActive: false,
          currentChallenge: gameState.currentChallenge + 1,
        });
      } else {
        const nextQuestion = updatedQuestions.find(q => !q.answeredCorrectly);
        onGameStateChange({
          ...gameState,
          currentQuestion: nextQuestion || null,
          score: gameState.score + 1,
        });
      }
    }
    setUserAnswer('');
  };

  // Calculate progress percentage
  const calculateProgress = () => {
    if (questions.length === 0) return 0;
    const correctAnswers = questions.filter(q => q.answeredCorrectly).length;
    return Math.round((correctAnswers / questions.length) * 100);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState.isGameActive && gameState.timeRemaining > 0) {
      timer = setInterval(() => {
        onGameStateChange({
          ...gameState,
          timeRemaining: gameState.timeRemaining - 1,
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState.isGameActive, gameState.timeRemaining, gameState, onGameStateChange]);

  return (
    <GameContainer>
      {!gameState.isGameActive ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: '#1976d2', fontWeight: 'bold', mb: 4 }}>
            {gameState.challenges[gameState.currentChallenge].name}
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
            {gameState.challenges[gameState.currentChallenge].description}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <StartButton
              variant="contained"
              color="primary"
              onClick={startChallenge}
              startIcon={<PlayArrowIcon />}
            >
              Start Quest!
            </StartButton>
          </Box>
        </motion.div>
      ) : (
        <QuestionBox
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <TimerContainer>
            <AccessTimeIcon sx={{ color: '#ff9800' }} />
            <TimerText>{gameState.timeRemaining}s</TimerText>
          </TimerContainer>
          
          <QuestionText>
            {gameState.currentQuestion?.multiplicand} × {gameState.currentQuestion?.multiplier} = ?
          </QuestionText>
          
          <AnswerForm onSubmit={handleAnswerSubmit}>
            <AnswerInput
              inputRef={inputRef}
              type="number"
              inputMode="numeric"
              inputProps={{ pattern: "[0-9]*" }}
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              variant="outlined"
              autoFocus
              placeholder="Enter answer"
              fullWidth
            />
            <SubmitButton
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Submit
            </SubmitButton>
          </AnswerForm>
          
          {/* Separate feedback components for correct and wrong */}
          {feedback.type === 'correct' && feedback.show && (
            <FeedbackContainer>
              <Fade in={true}>
                <FeedbackText sx={{ color: '#4caf50' }}>
                  Correct!
                </FeedbackText>
              </Fade>
            </FeedbackContainer>
          )}
          
          {feedback.type === 'wrong' && feedback.show && (
            <FeedbackContainer>
              <Fade in={true}>
                <FeedbackText sx={{ color: '#f44336' }}>
                  Try Again!
                </FeedbackText>
              </Fade>
            </FeedbackContainer>
          )}
          
          <ProgressBarContainer>
            <ProgressBar 
              variant="determinate" 
              value={(gameState.score / (questions.length || 1)) * 100} 
            />
          </ProgressBarContainer>
        </QuestionBox>
      )}
      
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.2}
        />
      )}
    </GameContainer>
  );
};

export default Game; 