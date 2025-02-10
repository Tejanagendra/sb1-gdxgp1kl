import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Utensils, Bath, Shirt, Bluetooth as Tooth, Cog as Yoga, Moon, Book, Music } from 'lucide-react';
import { usePoints } from '../context/PointsContext';

const activities = [
  { id: 'eating', title: 'Eating', icon: Utensils, color: 'bg-red-100 hover:bg-red-200' },
  { id: 'bathing', title: 'Bathing', icon: Bath, color: 'bg-blue-100 hover:bg-blue-200' },
  { id: 'dressing', title: 'Dressing', icon: Shirt, color: 'bg-green-100 hover:bg-green-200' },
  { id: 'brushing', title: 'Brushing', icon: Tooth, color: 'bg-yellow-100 hover:bg-yellow-200' },
  { id: 'yoga', title: 'Yoga', icon: Yoga, color: 'bg-purple-100 hover:bg-purple-200' },
  { id: 'sleeping', title: 'Sleeping', icon: Moon, color: 'bg-indigo-100 hover:bg-indigo-200' },
  { id: 'learning', title: 'Learning', icon: Book, color: 'bg-pink-100 hover:bg-pink-200' },
  { id: 'music', title: 'Music', icon: Music, color: 'bg-orange-100 hover:bg-orange-200' },
];

const ActivityCards = () => {
  const navigate = useNavigate();
  const { completedActivities } = usePoints();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-center mb-12 text-gray-800">
        Daily Activities Guide
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {activities.map((activity) => {
          const isCompleted = completedActivities.has(activity.id);
          return (
            <div
              key={activity.id}
              onClick={() => navigate(`/activity/${activity.id}`)}
              className={`${activity.color} rounded-xl p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg relative`}
            >
              <div className="flex flex-col items-center space-y-4">
                <activity.icon className="w-12 h-12 text-gray-700" />
                <h3 className="text-xl font-semibold text-gray-800">{activity.title}</h3>
                {isCompleted && (
                  <div className="absolute top-2 right-2">
                    <div className="bg-green-500 text-white rounded-full p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityCards;