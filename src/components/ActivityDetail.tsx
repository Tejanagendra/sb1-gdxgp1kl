import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Music } from 'lucide-react';
import { usePoints } from '../context/PointsContext';

const activityDetails = {
  eating: {
    title: 'Eating Guide',
    steps: [
      'Sit comfortably at the table',
      'Use proper utensils',
      'Take small bites',
      'Chew slowly and carefully',
      'Drink water between bites'
    ],
    image: 'https://images.unsplash.com/photo-1594627882045-57465104050f?auto=format&fit=crop&q=80&w=800'
  },
  bathing: {
    title: 'Bathing Guide',
    steps: [
      'Check water temperature',
      'Use mild soap',
      'Wash from top to bottom',
      'Rinse thoroughly',
      'Dry carefully'
    ],
    image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&q=80&w=800'
  },
  dressing: {
    title: 'Dressing Guide',
    steps: [
      'Gather your clothes',
      'Put on undergarments',
      'Put on shirt/top',
      'Put on pants/bottom',
      'Put on socks and shoes'
    ],
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=800'
  },
  brushing: {
    title: 'Brushing Guide',
    steps: [
      'Wet your toothbrush',
      'Apply toothpaste',
      'Brush all teeth surfaces',
      'Brush your tongue',
      'Rinse your mouth'
    ],
    image: 'https://images.unsplash.com/photo-1588454896012-5c048c0912b8?auto=format&fit=crop&q=80&w=800'
  },
  yoga: {
    title: 'Yoga Guide',
    steps: [
      'Find a quiet space',
      'Lay out your mat',
      'Take deep breaths',
      'Follow simple poses',
      'Relax and stretch'
    ],
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800'
  },
  sleeping: {
    title: 'Sleeping Guide',
    steps: [
      'Put on pajamas',
      'Brush teeth',
      'Use the bathroom',
      'Get into bed',
      'Close your eyes'
    ],
    image: 'https://images.unsplash.com/photo-1631155908067-3c9dea878545?auto=format&fit=crop&q=80&w=800'
  },
  learning: {
    title: 'Learning Guide',
    steps: [
      'Sit at your desk',
      'Open your books',
      'Read carefully',
      'Take notes',
      'Practice exercises'
    ],
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800'
  },
  music: {
    title: 'Music Guide',
    steps: [
      'Choose your instrument',
      'Sit properly',
      'Follow the rhythm',
      'Practice notes',
      'Make music!'
    ],
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=800'
  }
};

const ActivityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showStep, setShowStep] = useState(false);
  const { markActivityComplete, completedActivities } = usePoints();
  
  const activity = activityDetails[id as keyof typeof activityDetails];

  useEffect(() => {
    // Trigger step animation when currentStep changes
    setShowStep(false);
    const timer = setTimeout(() => {
      setShowStep(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [currentStep]);

  if (!activity) {
    return <div>Activity not found</div>;
  }

  const isLastStep = currentStep === activity.steps.length;
  const alreadyCompleted = completedActivities.has(id || '');

  const handleNext = () => {
    if (currentStep < activity.steps.length) {
      setCurrentStep(prev => prev + 1);
      if (currentStep === activity.steps.length - 1) {
        setCompleted(true);
        if (!alreadyCompleted) {
          markActivityComplete(id || '');
        }
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <button
        onClick={() => navigate('/')}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors duration-300"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Activities</span>
      </button>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-scale-in">
        <div className="relative">
          <img
            src={activity.image}
            alt={activity.title}
            className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
        </div>
        
        <div className="p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">{activity.title}</h2>
          
          {!isLastStep ? (
            <div className="space-y-6">
              <div className={`flex items-start space-x-4 ${showStep ? 'step-animation' : 'opacity-0'}`}>
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center animate-step-number">
                  <span className="text-purple-600 font-semibold">{currentStep + 1}</span>
                </div>
                <div className="flex-1 transform">
                  <p className="text-gray-700 text-lg pt-1">{activity.steps[currentStep]}</p>
                </div>
              </div>
              
              <button
                onClick={handleNext}
                className="mt-8 flex items-center justify-center space-x-2 w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <span>Next Step</span>
                <ArrowRight className="w-5 h-5 animate-bounce" />
              </button>
            </div>
          ) : (
            <div className="text-center space-y-6 animate-scale-in">
              <div className="flex flex-col items-center space-y-4">
                {alreadyCompleted ? (
                  <Check className="w-16 h-16 text-green-500 animate-bounce" />
                ) : (
                  <Music className="w-16 h-16 text-purple-500 animate-bounce" />
                )}
                <h3 className="text-2xl font-bold text-gray-800">
                  {alreadyCompleted ? 'Already Completed!' : 'Congratulations!'}
                </h3>
                <p className="text-gray-600">
                  {alreadyCompleted 
                    ? "You've already mastered this activity!" 
                    : "You've completed all steps and earned 10 points!"}
                </p>
                {!alreadyCompleted && (
                  <div className="py-4 animate-fade-in">
                    <audio controls className="mt-4">
                      <source src="https://www2.cs.uic.edu/~i101/SoundFiles/StarWars60.wav" type="audio/wav" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                )}
              </div>
              <button
                onClick={() => navigate('/')}
                className="mt-8 inline-flex items-center justify-center space-x-2 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <span>Back to Activities</span>
                <ArrowLeft className="w-5 h-5" />
              </button>
            </div>
          )}
          
          <div className="mt-6 flex justify-center">
            <div className="flex space-x-2">
              {activity.steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 transform ${
                    index === currentStep ? 'scale-150 bg-purple-600' :
                    index < currentStep ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivityDetail;