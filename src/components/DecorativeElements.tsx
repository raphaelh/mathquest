import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import StarIcon from '@mui/icons-material/Star';
import CloudIcon from '@mui/icons-material/Cloud';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

const Star = styled(motion(StarIcon))(({ theme }) => ({
  position: 'absolute',
  color: '#ffd700',
  fontSize: '2rem',
  filter: 'drop-shadow(0 0 5px rgba(255, 215, 0, 0.5))',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.5rem',
  },
}));

const Cloud = styled(motion(CloudIcon))(({ theme }) => ({
  position: 'absolute',
  color: '#ffffff',
  fontSize: '3rem',
  opacity: 0.8,
  filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.5))',
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
  },
}));

const Rocket = styled(motion(RocketLaunchIcon))(({ theme }) => ({
  position: 'absolute',
  color: '#ff5722',
  fontSize: '2.5rem',
  filter: 'drop-shadow(0 0 5px rgba(255, 87, 34, 0.5))',
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
  },
}));

const Trophy = styled(motion(EmojiEventsIcon))(({ theme }) => ({
  position: 'absolute',
  color: '#ffd700',
  fontSize: '2.5rem',
  filter: 'drop-shadow(0 0 5px rgba(255, 215, 0, 0.5))',
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
  },
}));

const Fire = styled(motion(LocalFireDepartmentIcon))(({ theme }) => ({
  position: 'absolute',
  color: '#ff5722',
  fontSize: '2.5rem',
  filter: 'drop-shadow(0 0 5px rgba(255, 87, 34, 0.5))',
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
  },
}));

const DecorativeElements: React.FC = () => {
  return (
    <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {/* Stars */}
      <Star
        initial={{ x: '10%', y: '20%', rotate: 0 }}
        animate={{ 
          rotate: [0, 180, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <Star
        initial={{ x: '80%', y: '30%', rotate: 0 }}
        animate={{ 
          rotate: [0, -180, -360],
          scale: [1, 1.2, 1],
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <Star
        initial={{ x: '40%', y: '70%', rotate: 0 }}
        animate={{ 
          rotate: [0, 180, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{ 
          duration: 7,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Clouds */}
      <Cloud
        initial={{ x: '-10%', y: '15%' }}
        animate={{ 
          x: ['-10%', '110%'],
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <Cloud
        initial={{ x: '-10%', y: '45%' }}
        animate={{ 
          x: ['-10%', '110%'],
        }}
        transition={{ 
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <Cloud
        initial={{ x: '-10%', y: '75%' }}
        animate={{ 
          x: ['-10%', '110%'],
        }}
        transition={{ 
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Rocket */}
      <Rocket
        initial={{ x: '90%', y: '80%', rotate: -45 }}
        animate={{ 
          y: ['80%', '20%'],
          rotate: [-45, -45],
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Trophy */}
      <Trophy
        initial={{ x: '20%', y: '90%' }}
        animate={{ 
          y: ['90%', '60%'],
          rotate: [0, 10, -10, 0],
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Fire */}
      <Fire
        initial={{ x: '70%', y: '10%' }}
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 15, -15, 0],
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </Box>
  );
};

export default DecorativeElements; 