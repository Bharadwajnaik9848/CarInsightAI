import React, { useState } from 'react';
import { Search, Car, Shield, DollarSign, Filter, ChevronDown, ChevronUp, Star, MapPin } from 'lucide-react';
import CarCard from './components/CarCard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { carData } from './data/carData';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    type: 'all',
    condition: 'all',
    priceRange: [0, 100000],
    year: [2000, 2025]
  });

  const handleFilterChange = (category, value) => {
    setFilters({
      ...filters,
      [category]: value
    });
  };

  const filteredCars = carData.filter(car => {
    const matchesSearch = car.make.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          car.model.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filters.type === 'all' || car.type === filters.type;
    const matchesCondition = filters.condition === 'all' || car.condition === filters.condition;
    const matchesPrice = car.price >= filters.priceRange[0] && car.price <= filters.priceRange[1];
    const matchesYear = car.year >= filters.year[0] && car.year <= filters.year[1];
    
    return matchesSearch && matchesType && matchesCondition && matchesPrice && matchesYear;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Find Your Perfect Car</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              AI-powered insights on new and used cars with comprehensive insurance details
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by make or model..."
                className="w-full p-4 pl-12 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            
            <div className="mt-4">
              <button 
                className="flex items-center justify-between w-full p-3 bg-white rounded-lg border border-gray-300 shadow-sm hover:bg-gray-50"
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <div className="flex items-center">
                  <Filter size={18} className="mr-2 text-blue-600" />
                  <span className="font-medium">Filters</span>
                </div>
                {filterOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              
              {filterOpen && (
                <div className="mt-2 p-4 bg-white rounded-lg border border-gray-300 shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
                      <select 
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={filters.type}
                        onChange={(e) => handleFilterChange('type', e.target.value)}
                      >
                        <option value="all">All Types</option>
                        <option value="sedan">Sedan</option>
                        <option value="suv">SUV</option>
                        <option value="truck">Truck</option>
                        <option value="coupe">Coupe</option>
                        <option value="convertible">Convertible</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                      <select 
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={filters.condition}
                        onChange={(e) => handleFilterChange('condition', e.target.value)}
                      >
                        <option value="all">All Conditions</option>
                        <option value="new">New</option>
                        <option value="used">Used</option>
                        <option value="certified">Certified Pre-Owned</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="range"
                          min="0"
                          max="100000"
                          step="1000"
                          className="w-full"
                          value={filters.priceRange[1]}
                          onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Year: {filters.year[0]} - {filters.year[1]}
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="range"
                          min="2000"
                          max="2025"
                          className="w-full"
                          value={filters.year[1]}
                          onChange={(e) => handleFilterChange('year', [filters.year[0], parseInt(e.target.value)])}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
        
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Featured Vehicles</h2>
            <p className="text-gray-600">{filteredCars.length} vehicles found</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.length > 0 ? (
              filteredCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-xl text-gray-600">No vehicles match your search criteria.</p>
                <button 
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  onClick={() => {
                    setSearchTerm('');
                    setFilters({
                      type: 'all',
                      condition: 'all',
                      priceRange: [0, 100000],
                      year: [2000, 2025]
                    });
                  }}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </section>
        
        <section className="mb-12 bg-blue-50 rounded-xl p-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-6">Why Choose Our AI-Powered Platform?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4">
                  <Car size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Comprehensive Data</h3>
                <p className="text-gray-600">Access detailed specifications and history for thousands of vehicles across the USA.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4">
                  <Shield size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Insurance Insights</h3>
                <p className="text-gray-600">Compare insurance options and get personalized recommendations based on your profile.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4">
                  <DollarSign size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Price Analysis</h3>
                <p className="text-gray-600">AI-powered price analysis helps you determine if a vehicle is fairly priced.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;