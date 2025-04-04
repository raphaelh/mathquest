import { useRef, useEffect } from 'react';

interface SoundEffects {
  playCorrectSound: () => void;
  playWrongSound: () => void;
}

export const useSoundEffects = (): SoundEffects => {
  const correctSoundRef = useRef<HTMLAudioElement | null>(null);
  const wrongSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio elements
    correctSoundRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2018/correct-answer-1-6297.wav');
    wrongSoundRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2018/wrong-answer-1-946.wav');
    
    // Cleanup function
    return () => {
      if (correctSoundRef.current) correctSoundRef.current.pause();
      if (wrongSoundRef.current) wrongSoundRef.current.pause();
    };
  }, []);

  const playCorrectSound = () => {
    if (correctSoundRef.current) {
      correctSoundRef.current.currentTime = 0;
      correctSoundRef.current.play().catch(error => {
        console.error('Error playing correct sound:', error);
      });
    }
  };

  const playWrongSound = () => {
    if (wrongSoundRef.current) {
      wrongSoundRef.current.currentTime = 0;
      wrongSoundRef.current.play().catch(error => {
        console.error('Error playing wrong sound:', error);
      });
    }
  };

  return { playCorrectSound, playWrongSound };
}; 