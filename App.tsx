import React, { useState } from 'react';
import { Particles } from './components/Particles';
import { Landing } from './components/Landing';
import { StoryViewer } from './components/StoryViewer';
import { Blessing } from './components/Blessing';
import { VideoBackground } from './components/VideoBackground';
import { AppState } from './types';
import { STORY_SCENES } from './constants';
import { AnimatePresence, motion } from 'framer-motion';

export default function App() {
  const [appState, setAppState] = useState<AppState>(AppState.LANDING);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);

  const startStory = () => {
    setAppState(AppState.STORY);
    setCurrentSceneIndex(0);
  };

  const handleNextScene = () => {
    if (currentSceneIndex < STORY_SCENES.length - 1) {
      setCurrentSceneIndex(prev => prev + 1);
    } else {
      setAppState(AppState.BLESSING);
    }
  };

  const restartApp = () => {
    setAppState(AppState.LANDING);
    setCurrentSceneIndex(0);
  };

  return (
    <div className="relative min-h-screen text-white overflow-hidden selection:bg-indigo-500/30">
      {/* Background Layers */}
      <VideoBackground />
      <Particles />

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        {appState === AppState.LANDING && (
          <motion.div
            key="landing"
            className="absolute inset-0"
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            <Landing onStart={startStory} />
          </motion.div>
        )}

        {appState === AppState.STORY && (
          <motion.div
            key="story"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            <StoryViewer 
              scene={STORY_SCENES[currentSceneIndex]}
              index={currentSceneIndex}
              total={STORY_SCENES.length}
              onNext={handleNextScene}
            />
          </motion.div>
        )}

        {appState === AppState.BLESSING && (
          <motion.div
            key="blessing"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            <Blessing onRestart={restartApp} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}