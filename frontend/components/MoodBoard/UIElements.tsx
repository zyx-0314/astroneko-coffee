"use client";

import React, { useState } from 'react';

export function MoodBoardUIElements() {
  const [activeTab, setActiveTab] = useState('buttons');

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">UI Styling</h2>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 mb-8 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab('buttons')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'buttons' 
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Buttons & Forms
        </button>
        <button
          onClick={() => setActiveTab('cards')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'cards' 
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Cards & Images
        </button>
      </div>

      {activeTab === 'buttons' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Buttons & Forms */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">Buttons & Forms</h3>
            
            <div className="space-y-6">
              {/* Primary Buttons */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Primary Buttons</h4>
                <div className="flex flex-wrap gap-3">
                  <button className="px-6 py-2 bg-[#6B4E37] text-white rounded-lg hover:bg-[#5A3E2A] transition-colors font-medium">
                    Order Now
                  </button>
                  <button className="px-6 py-2 bg-[#2CA6A4] text-white rounded-lg hover:bg-[#238A88] transition-colors font-medium">
                    Add to Cart
                  </button>
                </div>
              </div>

              {/* Secondary Buttons */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Secondary Buttons</h4>
                <div className="flex flex-wrap gap-3">
                  <button className="px-6 py-2 border-2 border-[#6B4E37] text-[#6B4E37] bg-white dark:bg-gray-800 rounded-lg hover:bg-[#6B4E37] hover:text-white transition-colors font-medium">
                    View Menu
                  </button>
                  <button className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium">
                    Cancel
                  </button>
                </div>
              </div>

              {/* Form Elements */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Form Elements</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Customer Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-[#6B4E37] focus:border-transparent outline-none transition-colors placeholder:text-gray-500 dark:placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Coffee Preference
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-[#6B4E37] focus:border-transparent outline-none transition-colors">
                      <option>Select your preference</option>
                      <option>Espresso</option>
                      <option>Latte</option>
                      <option>Cappuccino</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional UI Elements */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">Interactive Elements</h3>
            
            <div className="space-y-6">
              {/* Toggle Switches */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Toggles & Switches</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <div className="relative">
                      <input type="checkbox" className="sr-only" defaultChecked />
                      <div className="w-11 h-6 bg-[#2CA6A4] rounded-full shadow-inner"></div>
                      <div className="absolute w-4 h-4 bg-white rounded-full shadow inset-y-1 right-1 transition-transform"></div>
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Enable notifications</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <div className="relative">
                      <input type="checkbox" className="sr-only" />
                      <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 rounded-full shadow-inner"></div>
                      <div className="absolute w-4 h-4 bg-white rounded-full shadow inset-y-1 left-1 transition-transform"></div>
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Dark mode</span>
                  </label>
                </div>
              </div>

              {/* Status Badges */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Status Badges</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    Available
                  </span>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                    Preparing
                  </span>
                  <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                    Out of Stock
                  </span>
                  <span className="px-3 py-1 bg-[#E1B168] bg-opacity-20 text-[#8B5A2B] rounded-full text-xs font-medium">
                    Premium
                  </span>
                </div>
              </div>

              {/* Rating Stars */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Ratings</h4>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-5 h-5 ${star <= 4 ? 'text-[#E1B168]' : 'text-gray-300 dark:text-gray-600'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">4.0 (24 reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'cards' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Cards */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">Coffee Cards</h3>
            
            <div className="space-y-6">
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-[#6B4E37] to-[#8B5A3C] relative">
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="text-lg font-semibold">Premium Espresso</h4>
                    <p className="text-sm opacity-90">Rich and bold flavor</p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#6B4E37]">$3.50</span>
                    <button className="px-4 py-2 bg-[#2CA6A4] text-white rounded-lg hover:bg-[#238A88] transition-colors text-sm font-medium">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="bg-white rounded-xl p-8 border border-gray-200">
            <h3 className="text-lg font-semibold mb-6">Information Cards</h3>
            
            <div className="space-y-4">
              {/* Store Hours Card */}
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#E1B168] bg-opacity-20 rounded-lg flex items-center justify-center">
                    <span className="text-[#8B5A2B] text-lg">🕒</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">Store Hours</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Mon-Fri: 6:00 AM - 8:00 PM<br />
                      Sat-Sun: 7:00 AM - 9:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Location Card */}
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#2CA6A4] bg-opacity-20 rounded-lg flex items-center justify-center">
                    <span className="text-[#2CA6A4] text-lg">📍</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">Location</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      123 Cosmic Ave, Space District<br />
                      Galaxy City, GC 12345
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
