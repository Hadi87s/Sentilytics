export async function analyzeSentiment(url: string) {
  // TODO: Replace with actual API endpoint
  const mockData = {
    positive: 15,
    neutral: 8,
    negative: 5,
    reviews: [
      { text: "Great product, exactly what I needed!", sentiment: "positive" },
      { text: "It's okay, but could be better.", sentiment: "neutral" },
      { text: "Not worth the price.", sentiment: "negative" }
    ]
  };

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  return mockData;
  
}

export async function sendContactEmail(data: { name: string; email: string; message: string }) {
  try {
    const response = await fetch('http://127.0.0.1:5000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'MedbLucifer@gmail.com', // Email recipient
        ...data,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error in sendContactEmail:', error);
    throw error;
  }
}