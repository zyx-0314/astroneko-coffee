import React from 'react';

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          ☕ Astroneko Coffee
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Welcome to our cosmic coffee experience!
        </p>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">☕ Menu</h2>
            <p className="text-gray-600">Explore our stellar coffee selection</p>
            <a 
              href="/menu" 
              className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              View Menu
            </a>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">🚀 About</h2>
            <p className="text-gray-600">Discover our cosmic mission</p>
            <a 
              href="/test/crud-expose" 
              className="inline-block mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              Learn More
            </a>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">📡 API</h2>
            <p className="text-gray-600">Explore our backend services</p>
            <a 
              href="http://localhost:8083/swagger-ui.html" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
            >
              API Docs
            </a>
          </div>
        </div>
        
        <div className="mt-12 p-6 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">🐾 System Status</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center">
              <div className="text-2xl mb-1">🔧</div>
              <div className="text-sm text-gray-600">Backend API</div>
              <div className="text-green-600 font-semibold">✅ Running</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">🌐</div>
              <div className="text-sm text-gray-600">Frontend</div>
              <div className="text-green-600 font-semibold">✅ Running</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">🗄️</div>
              <div className="text-sm text-gray-600">Database</div>
              <div className="text-green-600 font-semibold">✅ Connected</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
