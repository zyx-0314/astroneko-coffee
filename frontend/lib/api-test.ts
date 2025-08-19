// Simple API connection test utility
const API_BASE_URL = 'http://localhost:8083/api/v1/expose/auth';

export async function testApiConnection(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'john.smith@example.com',
        password: 'password123'
      }),
    });

    console.log('API Test Response Status:', response.status);
    console.log('API Test Response Headers:', response.headers);
    
    if (response.ok) {
      const data = await response.json();
      console.log('API Test Success:', data);
      return true;
    } else {
      const errorData = await response.text();
      console.log('API Test Error:', errorData);
      return false;
    }
  } catch (error) {
    console.error('API Test Network Error:', error);
    return false;
  }
}
