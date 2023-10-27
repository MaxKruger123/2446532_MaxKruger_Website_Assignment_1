// Define the API endpoint URL
const apiUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos";

// Define your API key (replace 'DEMO_KEY' with your actual API key)
const apiKey = "rJrm96uIegrcAokW4gwHWXgSFcvGnVHmrxOonrSf";

// Define the sol (Martian day) for which you want to retrieve photos
const sol = 650; // You can change this to the desired sol value

// Construct the full URL with query parameters
const fullUrl = `${apiUrl}?api_key=${apiKey}&sol=${sol}`;

// Use the fetch function to make the API request
fetch(fullUrl)
  .then(response => response.json())
  .then(data => {
    // Process the data here
    console.log(data);
    const photoCollageSection = document.getElementById("PhotoCollage");

    // Limit the number of photos to display (e.g., the first 10 photos)
    const numPhotosToDisplay = 15;

    for (let i = 0; i < numPhotosToDisplay; i++) {
      if (data.photos[i]) {
        const photo = data.photos[i];
        const imageUrl = photo.img_src;
        const imageElement = document.createElement("img");
      
        // Assign a unique id to each image
        imageElement.id = `image-${i}`;
        imageElement.src = imageUrl;

        // Append the image to the section
        photoCollageSection.appendChild(imageElement);
      }
    }

  })
  .catch(error => {
    // Handle any errors that occur during the request
    console.error("Error fetching data:", error);
  });