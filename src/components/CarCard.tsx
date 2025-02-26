import React, { useState } from 'react';
import { DollarSign, Calendar, Fuel, Activity, Shield, MapPin, Star, ChevronDown, ChevronUp } from 'lucide-react';

interface Insurance {
  provider: string;
  monthlyRate: number;
  coverage: string;
  rating: number;
}

interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  condition: string;
  type: string;
  image: string;
  location: string;
  insurance: Insurance[];
}

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={car.image} 
          alt={`${car.year} ${car.make} ${car.model}`} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 m-2 rounded-md text-sm font-medium">
          {car.condition}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900">{car.year} {car.make} {car.model}</h3>
          <p className="text-lg font-bold text-blue-600">${car.price.toLocaleString()}</p>
        </div>
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <MapPin size={16} className="mr-1" />
          <span>{car.location}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Activity size={16} className="mr-1 text-gray-400" />
            <span>{car.mileage.toLocaleString()} miles</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar size={16} className="mr-1 text-gray-400" />
            <span>{car.year}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Fuel size={16} className="mr-1 text-gray-400" />
            <span>{car.fuelType}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Shield size={16} className="mr-1 text-gray-400" />
            <span>{car.insurance.length} Insurance Options</span>
          </div>
        </div>
        
        <button 
          className="flex items-center justify-center w-full py-2 px-4 border border-blue-600 rounded-md text-blue-600 hover:bg-blue-50 transition-colors duration-300"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? (
            <>
              <span className="mr-1">Hide Details</span>
              <ChevronUp size={16} />
            </>
          ) : (
            <>
              <span className="mr-1">View Details</span>
              <ChevronDown size={16} />
            </>
          )}
        </button>
        
        {showDetails && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h4 className="text-md font-semibold mb-3 flex items-center">
              <Shield size={16} className="mr-2 text-blue-600" />
              Insurance Options
            </h4>
            
            <div className="space-y-3">
              {car.insurance.map((ins, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-md">
                  <div className="flex justify-between items-start mb-1">
                    <h5 className="font-medium">{ins.provider}</h5>
                    <p className="font-bold text-blue-600">${ins.monthlyRate}/mo</p>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{ins.coverage}</p>
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i < ins.rating ? "text-yellow-400 fill-current" : "text-gray-300"}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-xs text-gray-500">{ins.rating}/5</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4">
              <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300">
                Get More Details
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarCard;