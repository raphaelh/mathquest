import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { Question } from '../types';

const DebugPanelContainer = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  right: theme.spacing(2),
  top: theme.spacing(2),
  width: '250px',
  maxHeight: '80vh',
  overflowY: 'auto',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  zIndex: 1000,
  [theme.breakpoints.down('sm')]: {
    width: '200px',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
}));

const DebugHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const QuestionItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(1),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const QuestionText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
}));

const AnswerText = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(1),
}));

const IconContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});

interface DebugPanelProps {
  questions: Question[];
  currentQuestionId: number | null;
}

const DebugPanel: React.FC<DebugPanelProps> = ({ questions, currentQuestionId }) => {
  return (
    <DebugPanelContainer elevation={3}>
      <DebugHeader>
        <Typography variant="subtitle1">Debug Mode</Typography>
      </DebugHeader>
      <Divider />
      <List dense>
        {questions.map((question) => (
          <QuestionItem 
            key={question.id}
            sx={{ 
              backgroundColor: question.id === currentQuestionId ? 'rgba(25, 118, 210, 0.1)' : 'transparent'
            }}
          >
            <Box>
              <QuestionText>
                {question.multiplicand} × {question.multiplier} = {question.answer}
              </QuestionText>
              <AnswerText variant="body2" color="textSecondary">
                {question.answeredCorrectly ? 'Correct' : 'Not answered'}
              </AnswerText>
            </Box>
            <IconContainer>
              {question.answeredCorrectly ? (
                <CheckCircleIcon color="success" />
              ) : (
                <CancelIcon color="error" />
              )}
            </IconContainer>
          </QuestionItem>
        ))}
      </List>
    </DebugPanelContainer>
  );
};

export default DebugPanel; 