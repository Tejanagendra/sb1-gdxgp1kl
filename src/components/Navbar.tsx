import React, { useState } from 'react';
import { Heart, Trophy, User, ChevronDown, CheckCircle2, Circle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePoints } from '../context/PointsContext';

const activities = [
  'eating', 'bathing', 'dressing', 'brushing', 
  'yoga', 'sleeping', 'learning', 'music'
];

const Navbar = () => {
  const { points, completedActivities, userInfo, setUserInfo } = usePoints();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(userInfo.name);
  const [tempAge, setTempAge] = useState(userInfo.age.toString());

  const totalActivities = activities.length;
  const completedCount = completedActivities.size;
  const progressPercentage = (completedCount / totalActivities) * 100;

  const handleSaveProfile = () => {
    setUserInfo({
      name: tempName,
      age: parseInt(tempAge, 10) || 0
    });
    setIsEditing(false);
  };

  const remainingActivities = activities.filter(activity => !completedActivities.has(activity));

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-pink-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Divyang
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Trophy className="h-6 w-6 text-yellow-500" />
              <span className="text-lg font-semibold text-gray-700">{points} Points</span>
            </div>

            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <User className="h-5 w-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">{userInfo.name}</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    {isEditing ? (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Name</label>
                          <input
                            type="text"
                            value={tempName}
                            onChange={(e) => setTempName(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Age</label>
                          <input
                            type="number"
                            value={tempAge}
                            onChange={(e) => setTempAge(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 text-sm"
                          />
                        </div>
                        <button
                          onClick={handleSaveProfile}
                          className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors text-sm"
                        >
                          Save Profile
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-semibold text-gray-800">{userInfo.name}</h3>
                          <button
                            onClick={() => setIsEditing(true)}
                            className="text-sm text-purple-600 hover:text-purple-700"
                          >
                            Edit
                          </button>
                        </div>
                        <p className="text-sm text-gray-600">Age: {userInfo.age}</p>
                      </div>
                    )}
                  </div>

                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Progress</span>
                        <span>{completedCount}/{totalActivities} completed</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-purple-500 transition-all duration-500"
                          style={{ width: `${progressPercentage}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="px-4 py-3">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Activities to Complete:</h4>
                    <div className="space-y-2">
                      {activities.map(activity => (
                        <div key={activity} className="flex items-center space-x-2 text-sm">
                          {completedActivities.has(activity) ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          ) : (
                            <Circle className="h-4 w-4 text-gray-400" />
                          )}
                          <span className="capitalize">{activity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;