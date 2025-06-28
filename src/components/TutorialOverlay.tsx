
import React, { useState, useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';

interface TutorialStep {
  title: string;
  description: string;
  target?: string;
}

const tutorialSteps: TutorialStep[] = [
  {
    title: "Welcome to Photo Collage!",
    description: "Let's take a quick tour to help you create amazing photo collages."
  },
  {
    title: "Choose Your Style",
    description: "Start by selecting a theme that matches your mood - each style will transform your entire collage."
  },
  {
    title: "Add Photos",
    description: "Click on any frame to upload a photo. You can drag and drop images directly onto frames."
  },
  {
    title: "AI Layouts",
    description: "Click 'AI Layout' to automatically rearrange your photos in different creative patterns."
  },
  {
    title: "Customize & Share",
    description: "Add captions, customize backgrounds, and download your creation when you're done!"
  }
];

const TutorialOverlay = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Show tutorial for first-time users
    const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');
    if (!hasSeenTutorial) {
      setIsVisible(true);
    }
  }, []);

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      closeTutorial();
    }
  };

  const closeTutorial = () => {
    setIsVisible(false);
    localStorage.setItem('hasSeenTutorial', 'true');
  };

  if (!isVisible) return null;

  const currentTutorialStep = tutorialSteps[currentStep];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-500">
              {currentStep + 1} of {tutorialSteps.length}
            </span>
          </div>
          <button
            onClick={closeTutorial}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {currentTutorialStep.title}
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {currentTutorialStep.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {tutorialSteps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentStep ? 'bg-blue-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={closeTutorial}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Skip
            </button>
            <button
              onClick={nextStep}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {currentStep === tutorialSteps.length - 1 ? 'Get Started' : 'Next'}
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialOverlay;
