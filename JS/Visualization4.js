// Replace 'YOUR_API_KEY' with your actual NASA API key
const apiKey = 'rJrm96uIegrcAokW4gwHWXgSFcvGnVHmrxOonrSf';

// Define the API endpoint URL
const apiUrl = `https://api.nasa.gov/insight_weather/?api_key=${apiKey}&feedtype=json&ver=1.0`;

// Fetch data from the NASA API
fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => {
    // Process and use the retrieved data here
    console.log(data);
  })
  .catch((error) => {
    console.error('Can\'t fetch data', error);
  });
