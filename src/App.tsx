import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Box, Container, useMediaQuery, styled } from '@mui/material';
import Game from './components/Game';
import ProgressMap from './components/ProgressMap';
import DebugPanel from './components/DebugPanel';
import DecorativeElements from './components/DecorativeElements';
import { Challenge, GameState, Question } from './types';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
    },
    secondary: {
      main: '#4caf50',
      light: '#81c784',
      dark: '#388e3c',
    },
    background: {
      default: '#f0f8ff',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Comic Sans MS", "Comic Sans", cursive',
    h1: {
      fontWeight: 'bold',
      color: '#1976d2',
    },
    h2: {
      fontWeight: 'bold',
      color: '#1976d2',
    },
    h3: {
      fontWeight: 'bold',
      color: '#1976d2',
    },
    h4: {
      fontWeight: 'bold',
      color: '#1976d2',
    },
    h5: {
      fontWeight: 'bold',
      color: '#1976d2',
    },
    h6: {
      fontWeight: 'bold',
      color: '#1976d2',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '15px',
          textTransform: 'none',
          fontWeight: 'bold',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
        },
      },
    },
  },
});

const AppContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%)',
  position: 'relative',
  overflow: 'hidden',
}));

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentChallenge: 0,
    challenges: [
      {
        id: 1,
        name: 'Forest Adventure',
        description: 'Master the 2 and 3 times tables!',
        completed: false,
        stars: 0,
        tables: [2, 3],
      },
      {
        id: 2,
        name: 'Mountain Climb',
        description: 'Conquer the 4 and 5 times tables!',
        completed: false,
        stars: 0,
        tables: [4, 5],
      },
      {
        id: 3,
        name: 'Castle Quest',
        description: 'Tackle the 6 and 7 times tables!',
        completed: false,
        stars: 0,
        tables: [6, 7],
      },
      {
        id: 4,
        name: 'Dragon\'s Lair',
        description: 'Face the 8 and 9 times tables!',
        completed: false,
        stars: 0,
        tables: [8, 9],
      },
      {
        id: 5,
        name: 'Final Challenge',
        description: 'Master all times tables!',
        completed: false,
        stars: 0,
        tables: [2, 3, 4, 5, 6, 7, 8, 9],
      },
    ],
    isGameActive: false,
    currentQuestion: null,
    score: 0,
    timeRemaining: 60,
  });

  const [questions, setQuestions] = useState<Question[]>([]);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDebug = new URLSearchParams(window.location.search).get('debug') === 'true';

  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleGameStateChange = (newState: GameState) => {
    setGameState(newState);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContainer>
        <DecorativeElements />
        <Container 
          maxWidth="lg" 
          sx={{ 
            height: '100vh',
            pt: isMobile ? 2 : 4,
            pb: isMobile ? 2 : 4,
            pl: isMobile ? '220px' : '280px',
            pr: isMobile ? 2 : 4,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <Box 
            sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: isMobile ? 2 : 4,
              overflow: 'hidden',
              justifyContent: 'center',
            }}
          >
            <Game 
              gameState={gameState} 
              onGameStateChange={handleGameStateChange}
              onQuestionsChange={setQuestions}
            />
            {isDebug && <DebugPanel questions={questions} currentQuestionId={gameState.currentQuestion?.id ?? null} />}
          </Box>
        </Container>
        <ProgressMap 
          challenges={gameState.challenges} 
          currentChallenge={gameState.currentChallenge} 
        />
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
