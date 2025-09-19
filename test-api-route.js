// Script per testare l'API route send-quote
async function testSendQuoteAPI() {
  try {
    const response = await fetch('http://localhost:3000/api/send-quote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerName: 'Test User',
        customerEmail: 'test@example.com',
        customerPhone: '123456789',
        material: 'PVC',
        category: 'finestra',
        dimensions: '100x100',
        glassType: 'standard',
        configurationId: 'test-123'
      })
    });

    const result = await response.json();
    console.log('Status:', response.status);
    console.log('Response:', result);

  } catch (error) {
    console.error('Error:', error.message);
  }
}

testSendQuoteAPI();
