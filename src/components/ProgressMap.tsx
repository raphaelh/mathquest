import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Box, Typography, Paper, List, ListItem, ListItemText, Divider, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import { Challenge } from '../types';
import FlagIcon from '@mui/icons-material/Flag';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CastleIcon from '@mui/icons-material/Castle';
import ForestIcon from '@mui/icons-material/Forest';
import TerrainIcon from '@mui/icons-material/Terrain';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

const MapContainer = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  left: theme.spacing(2),
  top: theme.spacing(2),
  bottom: theme.spacing(2),
  width: '280px',
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  zIndex: 1000,
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2),
  borderRadius: '20px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  border: '3px solid #4caf50',
  [theme.breakpoints.down('sm')]: {
    width: '220px',
    left: theme.spacing(1),
    top: theme.spacing(1),
    bottom: theme.spacing(1),
    padding: theme.spacing(1),
  },
}));

const MapHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  textAlign: 'center',
  backgroundColor: '#4caf50',
  color: 'white',
  padding: theme.spacing(1),
  borderRadius: '15px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(0.5),
  },
}));

const ChallengesContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  justifyContent: 'space-between',
});

const ChallengeNode = styled(motion(Paper))<{ completed: boolean; isCurrent: boolean }>(({ theme, completed, isCurrent }) => ({
  padding: theme.spacing(1.5),
  marginBottom: theme.spacing(0.5),
  textAlign: 'center',
  backgroundColor: completed ? '#e8f5e9' : isCurrent ? '#e3f2fd' : '#fff',
  border: `3px solid ${completed ? '#4caf50' : isCurrent ? '#2196f3' : '#9e9e9e'}`,
  borderRadius: '15px',
  position: 'relative',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: isCurrent ? '0 4px 12px rgba(33, 150, 243, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.1)',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(0.25),
  },
}));

const PathLine = styled(Box)(({ theme }) => ({
  width: '4px',
  height: '10px',
  background: 'linear-gradient(to bottom, #9e9e9e, #4caf50)',
  margin: '0 auto',
  marginBottom: theme.spacing(0.5),
  [theme.breakpoints.down('sm')]: {
    height: '8px',
    marginBottom: theme.spacing(0.25),
  },
}));

const IconContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '4px',
});

const getChallengeIcon = (index: number) => {
  switch (index) {
    case 0:
      return <FlagIcon sx={{ fontSize: 24, color: '#f44336' }} />;
    case 1:
      return <ForestIcon sx={{ fontSize: 24, color: '#4caf50' }} />;
    case 2:
      return <TerrainIcon sx={{ fontSize: 24, color: '#795548' }} />;
    case 3:
      return <CastleIcon sx={{ fontSize: 24, color: '#9c27b0' }} />;
    case 4:
      return <EmojiEventsIcon sx={{ fontSize: 24, color: '#ffd700' }} />;
    default:
      return <LocalFireDepartmentIcon sx={{ fontSize: 24, color: '#ff5722' }} />;
  }
};

interface ProgressMapProps {
  challenges: Challenge[];
  currentChallenge: number;
}

const ProgressMap: React.FC<ProgressMapProps> = ({ challenges, currentChallenge }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <MapContainer elevation={3}>
      <MapHeader>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Quest Progress</Typography>
      </MapHeader>
      <Divider sx={{ mb: 1, borderColor: '#4caf50' }} />
      <ChallengesContainer>
        {challenges.map((challenge, index) => (
          <React.Fragment key={challenge.id}>
            <ChallengeNode
              completed={challenge.completed}
              isCurrent={index === currentChallenge}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                y: index === currentChallenge ? [0, -5, 5, 0] : 0,
              }}
              transition={{ 
                duration: 0.5,
                delay: index * 0.1,
              }}
            >
              <IconContainer>
                {getChallengeIcon(index)}
              </IconContainer>
              <Typography 
                variant={isMobile ? "body2" : "subtitle1"} 
                sx={{ 
                  fontWeight: 'bold',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  width: '100%',
                  fontSize: isMobile ? '0.8rem' : '0.9rem',
                  mb: 0.5,
                }}
              >
                {challenge.name}
              </Typography>
              <Typography 
                variant="body2" 
                color="textSecondary" 
                sx={{ 
                  fontSize: isMobile ? '0.65rem' : '0.7rem',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  width: '100%',
                }}
              >
                {challenge.description}
              </Typography>
            </ChallengeNode>
            {index < challenges.length - 1 && <PathLine />}
          </React.Fragment>
        ))}
      </ChallengesContainer>
    </MapContainer>
  );
};

export default ProgressMap; 