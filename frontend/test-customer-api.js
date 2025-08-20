// Test script to check customer API connectivity
const API_BASE_URL = 'http://localhost:8083';

async function testCustomerAPI() {
  try {
    console.log('Testing customer API endpoint...');
    
    // Test without authentication first
    const response = await fetch(`${API_BASE_URL}/api/v1/secure/customers/paginated?page=0&size=10`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);
    
    if (response.ok) {
      const data = await response.json();
      console.log('Success! Data:', data);
    } else {
      const errorText = await response.text();
      console.log('Error response:', errorText);
    }
  } catch (error) {
    console.error('Network error:', error);
  }
}

testCustomerAPI();
