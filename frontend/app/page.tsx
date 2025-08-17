// Homepage with static content - use SSR for SEO and performance
export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          ☕ Astroneko Coffee
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Welcome to our cosmic coffee experience!
        </p>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">☕ Menu</h2>
            <p className="text-gray-600 dark:text-gray-300">Explore our stellar coffee selection</p>
            <a 
              href="/menu" 
              className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              View Menu
            </a>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">🚀 About</h2>
            <p className="text-gray-600 dark:text-gray-300">Discover our cosmic mission</p>
            <a 
              href="/test/crud-expose" 
              className="inline-block mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              Learn More
            </a>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">📡 API</h2>
            <p className="text-gray-600 dark:text-gray-300">Explore our backend services</p>
            <a 
              href="http://localhost:8083/swagger-ui.html" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
            >
              API Docs
            </a>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">🎨 Design System</h2>
            <p className="text-gray-600 dark:text-gray-300">Explore our brand and UI components</p>
            <a 
              href="/mood-board" 
              className="inline-block mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
            >
              View Mood Board
            </a>
          </div>
        </div>
        
        <div className="mt-12 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">🐾 System Status</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center">
              <div className="text-2xl mb-1">🔧</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Backend API</div>
              <div className="text-green-600 dark:text-green-400 font-semibold">✅ Running</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">🌐</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Frontend</div>
              <div className="text-green-600 dark:text-green-400 font-semibold">✅ Running</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">🗄️</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Database</div>
              <div className="text-green-600 dark:text-green-400 font-semibold">✅ Connected</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
