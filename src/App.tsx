import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AmbientBackground } from './components/AmbientBackground';
import { MusicToggle } from './components/MusicToggle';
import { IntroScreen } from './components/IntroScreen';
import { RoseBloom } from './components/RoseBloom';
import { MessageScene } from './components/MessageScene';
import { MemoryScene } from './components/MemoryScene';
import { PhotoMemories } from './components/PhotoMemories';
import { FinalReveal } from './components/FinalReveal';
import { LastMessage } from './components/LastMessage';

export type Scene =
  | 'intro'
  | 'bloom'
  | 'message'
  | 'memories'
  | 'photos'
  | 'final'
  | 'lastMessage';

export const App: React.FC = () => {
  const [scene, setScene] = useState<Scene>('intro');

  // Scroll to top on scene transition
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [scene]);

  return (
    <div className="app-container">
      {/* Cinematic Ambient Atmosphere & Embers */}
      <AmbientBackground />

      {/* Music Toggle (appears top-right once interaction has begun) */}
      <MusicToggle />

      {/* Cinematic Scene Transitions */}
      <AnimatePresence mode="wait">
        {scene === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04, filter: 'blur(6px)' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: '100%' }}
          >
            <IntroScreen onBloomComplete={() => setScene('bloom')} />
          </motion.div>
        )}

        {scene === 'bloom' && (
          <motion.div
            key="bloom"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: '100%' }}
          >
            <RoseBloom onContinue={() => setScene('message')} />
          </motion.div>
        )}

        {scene === 'message' && (
          <motion.div
            key="message"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: '100%' }}
          >
            <MessageScene onContinue={() => setScene('memories')} />
          </motion.div>
        )}

        {scene === 'memories' && (
          <motion.div
            key="memories"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: '100%' }}
          >
            <MemoryScene onContinue={() => setScene('photos')} />
          </motion.div>
        )}

        {scene === 'photos' && (
          <motion.div
            key="photos"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: '100%' }}
          >
            <PhotoMemories onContinue={() => setScene('final')} />
          </motion.div>
        )}

        {scene === 'final' && (
          <motion.div
            key="final"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: '100%' }}
          >
            <FinalReveal onOneLastThing={() => setScene('lastMessage')} />
          </motion.div>
        )}

        {scene === 'lastMessage' && (
          <motion.div
            key="lastMessage"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: '100%' }}
          >
            <LastMessage onReplay={() => setScene('intro')} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
