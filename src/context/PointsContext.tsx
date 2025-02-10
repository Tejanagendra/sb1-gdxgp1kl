import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserInfo {
  name: string;
  age: number;
}

interface PointsContextType {
  points: number;
  addPoints: (amount: number) => void;
  completedActivities: Set<string>;
  markActivityComplete: (activityId: string) => void;
  userInfo: UserInfo;
  setUserInfo: (info: UserInfo) => void;
}

const PointsContext = createContext<PointsContextType | undefined>(undefined);

const isNewDay = (lastResetTime: string) => {
  const now = new Date();
  const last = new Date(lastResetTime);
  
  // Check if it's a new day after midnight
  return now.getDate() !== last.getDate() || 
         now.getMonth() !== last.getMonth() || 
         now.getFullYear() !== last.getFullYear();
};

export const PointsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [points, setPoints] = useState(() => {
    const savedPoints = localStorage.getItem('points');
    return savedPoints ? parseInt(savedPoints, 10) : 0;
  });
  
  const [completedActivities, setCompletedActivities] = useState<Set<string>>(() => {
    const savedActivities = localStorage.getItem('completedActivities');
    return savedActivities ? new Set(JSON.parse(savedActivities)) : new Set();
  });
  
  const [userInfo, setUserInfo] = useState<UserInfo>(() => {
    const savedUserInfo = localStorage.getItem('userInfo');
    return savedUserInfo ? JSON.parse(savedUserInfo) : {
      name: 'Guest',
      age: 0
    };
  });

  // Check for daily reset
  useEffect(() => {
    const checkDailyReset = () => {
      const lastResetTime = localStorage.getItem('lastResetTime');
      
      if (!lastResetTime || isNewDay(lastResetTime)) {
        // Reset points and completed activities
        setPoints(0);
        setCompletedActivities(new Set());
        
        // Update last reset time
        localStorage.setItem('lastResetTime', new Date().toISOString());
      }
    };

    // Check on mount
    checkDailyReset();

    // Set up interval to check every minute
    const interval = setInterval(checkDailyReset, 60000);

    return () => clearInterval(interval);
  }, []);

  // Save to localStorage whenever values change
  useEffect(() => {
    localStorage.setItem('points', points.toString());
  }, [points]);

  useEffect(() => {
    localStorage.setItem('completedActivities', JSON.stringify([...completedActivities]));
  }, [completedActivities]);

  useEffect(() => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }, [userInfo]);

  const addPoints = (amount: number) => {
    setPoints((prev) => prev + amount);
  };

  const markActivityComplete = (activityId: string) => {
    setCompletedActivities(prev => {
      const newSet = new Set(prev);
      newSet.add(activityId);
      return newSet;
    });
    addPoints(10);
  };

  return (
    <PointsContext.Provider value={{ 
      points, 
      addPoints, 
      completedActivities, 
      markActivityComplete,
      userInfo,
      setUserInfo
    }}>
      {children}
    </PointsContext.Provider>
  );
};

export const usePoints = () => {
  const context = useContext(PointsContext);
  if (context === undefined) {
    throw new Error('usePoints must be used within a PointsProvider');
  }
  return context;
};