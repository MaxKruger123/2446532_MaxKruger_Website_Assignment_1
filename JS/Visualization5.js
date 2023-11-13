// Define the APOD API endpoint URL
const apiUrll = "https://api.nasa.gov/planetary/apod";

// Define your API key (replace 'DEMO_KEY' with your actual API key)
const apiKeyy = "rJrm96uIegrcAokW4gwHWXgSFcvGnVHmrxOonrSf";

// Get today's date in the format YYYY-MM-DD
const today = new Date().toISOString().split('T')[0];

// Initialize the current date
let currentDate = today;

// Function to fetch APOD data for a specific date
const fetchApodData = (date) => {
    const fullUrll = `${apiUrll}?api_key=${apiKeyy}&date=${date}`;

    return fetch(fullUrll)
        .then(response => response.json())
        .catch(error => {
            console.error("Error fetching data:", error);
        });
};

// Function to change the date and update the gallery
const changeDate = (days) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);

    const formattedDate = newDate.toISOString().split('T')[0];

    fetchApodData(formattedDate)
        .then(data => {
            // Update the current date
            currentDate = formattedDate;

            // Update the displayed image with navigation arrows
            displayImageWithArrows(data.url, data.title);
        });
};

// Function to display the APOD image
const displayImage = (imageUrl, imageAlt) => {
    const apodImageContainer = document.getElementById("apodImageContainer");
    apodImageContainer.innerHTML = ''; // Clear previous content

    const image = document.createElement("img");
    image.src = imageUrl;
    image.alt = imageAlt;
    image.id = "apodImage";
    apodImageContainer.appendChild(image);
};

// Function to display the APOD image with navigation arrows
const displayImageWithArrows = (imageUrl, imageAlt) => {
  const apodImageContainer = document.getElementById("apodImageContainer");
  apodImageContainer.innerHTML = ''; // Clear previous content

  // Fetch data for the previous, current, and next dates
  Promise.all([
    fetchApodData(getOffsetDate(currentDate, -1)),
    fetchApodData(currentDate),
    fetchApodData(getOffsetDate(currentDate, 1)),
  ])
    .then(([prevData, currentData, nextData]) => {
      const prevImage = createImageElement("prevImage", prevData.url, `Astronomy Picture of the Day - ${prevData.title}`);
      prevImage.classList.add("smallImage"); // Add the smallImage class
      apodImageContainer.appendChild(prevImage);

      const apodImage = createImageElement("apodImage", imageUrl, `Astronomy Picture of the Day - ${imageAlt}`);
      apodImageContainer.appendChild(apodImage);

      const nextImage = createImageElement("nextImage", nextData.url, `Astronomy Picture of the Day - ${nextData.title}`);
      nextImage.classList.add("smallImage"); // Add the smallImage class
      apodImageContainer.appendChild(nextImage);

      // Set up click event listeners for small images
      const smallImages = apodImageContainer.querySelectorAll(".smallImage");
      smallImages.forEach((smallImage, index) => {
        smallImage.addEventListener("click", () => updateActiveImage(index));
      });
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });

 // Create and append previous arrow
const prevArrow = document.createElement("span");
prevArrow.className = "arrow left"; // Add left class
prevArrow.innerHTML = "&#9665;";
prevArrow.onclick = () => changeDate(-1);
apodImageContainer.appendChild(prevArrow);

// Create and append next arrow
const nextArrow = document.createElement("span");
nextArrow.className = "arrow right"; // Add right class
nextArrow.innerHTML = "&#9655;";
nextArrow.onclick = () => changeDate(1);
apodImageContainer.appendChild(nextArrow);

};

// Function to get the date offset by a certain number of days
const getOffsetDate = (date, offset) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + offset);
  return newDate.toISOString().split('T')[0];
};

// Function to create an image element
const createImageElement = (id, src, alt) => {
  const image = document.createElement("img");
  image.id = id;
  image.src = src;
  image.alt = alt;
  
  return image;
};

// Function to update the active image and find new previous and next images
const updateActiveImage = (index) => {
  // Fetch data for the previous, current, and next dates
  Promise.all([
    fetchApodData(getOffsetDate(currentDate, -1)),
    fetchApodData(currentDate),
    fetchApodData(getOffsetDate(currentDate, 1)),
  ])
    .then(([prevData, currentData, nextData]) => {
      // Update the current date
      currentDate = currentData.date;

      // Determine which image was clicked and update accordingly
      switch (index) {
        case 0:
          displayImageWithArrows(prevData.url, prevData.title);
          break;
        case 1:
          displayImageWithArrows(currentData.url, currentData.title);
          break;
        case 2:
          displayImageWithArrows(nextData.url, nextData.title);
          break;
        default:
          break;
      }
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
};

// Ensure that the script runs after the DOM has fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initial display of the APOD image for today
  fetchApodData(today)
      .then(data => {
          displayImageWithArrows(data.url, data.title);
      });
});

   
