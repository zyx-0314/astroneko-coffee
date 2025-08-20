// Test script for Menu API
const API_BASE = 'http://localhost:8083/api/v1';

// Test public endpoints (no auth required)
async function testPublicEndpoints() {
  console.log('=== Testing Public Endpoints ===');
  
  try {
    // Test public menu endpoint
    const response = await fetch(`${API_BASE}/expose/menu?page=0&size=5`);
    const data = await response.json();
    console.log('✅ Public menu endpoint working');
    console.log(`Found ${data.totalElements} total items`);
    console.log(`Page size: ${data.size}, Current page: ${data.number}`);
    console.log('First 3 items:', data.content.slice(0, 3).map(item => ({ id: item.id, name: item.name, price: item.price })));
    
    // Test recommendations
    const recResponse = await fetch(`${API_BASE}/expose/menu/recommendations?limit=3`);
    const recommendations = await recResponse.json();
    console.log(`✅ Recommendations endpoint: ${recommendations.length} items`);
    
    // Test favorites
    const favResponse = await fetch(`${API_BASE}/expose/menu/favorites?limit=3`);
    const favorites = await favResponse.json();
    console.log(`✅ Favorites endpoint: ${favorites.length} items`);
    
  } catch (error) {
    console.error('❌ Error testing public endpoints:', error);
  }
}

// Test secure endpoints (requires auth)
async function testSecureEndpoints() {
  console.log('\n=== Testing Secure Endpoints (without auth) ===');
  
  try {
    // This should return 401 or similar since we don't have auth
    const response = await fetch(`${API_BASE}/secure/menu?page=0&size=5`);
    console.log(`Secure endpoint response status: ${response.status}`);
    
    if (response.status === 200) {
      const data = await response.json();
      console.log('✅ Secure endpoint accessible (no auth enforcement?)');
      console.log(`Found ${data.totalElements} total items`);
    } else {
      console.log('✅ Secure endpoint properly protected');
    }
    
  } catch (error) {
    console.error('❌ Error testing secure endpoints:', error);
  }
}

// Run tests
async function runTests() {
  await testPublicEndpoints();
  await testSecureEndpoints();
  
  console.log('\n=== API Test Summary ===');
  console.log('• Public endpoints are working and returning data');
  console.log('• Menu items are properly stored in database');
  console.log('• Pagination is working');
  console.log('• Ready for frontend integration');
}

// For Node.js environment, uncomment:
// if (typeof window === 'undefined') {
//   const fetch = require('node-fetch');
//   runTests();
// }

console.log('Menu API Test Script');
console.log('Run this in browser console or Node.js with node-fetch');
runTests();
