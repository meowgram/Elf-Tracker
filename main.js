// main.js
// Your existing JavaScript code goes here

// Initial coordinates (center of the map)
const icelandCoordinates = [64.9631, -19.0208]; // Iceland
const ukCoordinates = [51.509865, -0.118092]; // London, UK

// Set the start date of the journey (December 8th, 2023, UTC)
const startDate = new Date('2023-12-08T00:00:00Z');

// Set the end date of the journey (Christmas morning at 8 am, 2023, UTC)
const endDate = new Date('2023-12-25T08:00:00Z');

// Calculate the total duration in milliseconds
const totalDuration = endDate - startDate;

const map = L.map('map', {
  center: icelandCoordinates,
  zoom: 5,
  zoomControl: false, // Optional: Remove zoom control
  scrollWheelZoom: false, // Optional: Disable scroll wheel zoom
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Create a custom icon for the marker
const customIcon = L.icon({
  iconUrl: 'path/to/custom-marker.png', // Replace with the path to your custom image
  iconSize: [32, 32], // Size of the icon
  iconAnchor: [16, 32], // Point of the icon that corresponds to the marker's location
  popupAnchor: [0, -32] // Point from which the popup should open relative to the iconAnchor
});

// Use the custom icon for the marker
const marker = L.marker(icelandCoordinates, { icon: customIcon }).addTo(map);

// Draw a line from the start to the end
const line = L.polyline([icelandCoordinates, ukCoordinates], { color: 'red' }).addTo(map);

function updateFakeLocation() {
  // Calculate the elapsed time in milliseconds
  const elapsedTime = Date.now() - startDate.getTime();

  // If the elapsed time exceeds the total duration, stop updating
  if (elapsedTime >= totalDuration) {
    clearInterval(intervalId);
    console.log('Journey completed!');
    return;
  }

  // Calculate the progress percentage
  const progress = (elapsedTime / totalDuration) * 100;

  // Update the fake location based on the progress
  const fakeLat = icelandCoordinates[0] + (ukCoordinates[0] - icelandCoordinates[0]) * (progress / 100);
  const fakeLon = icelandCoordinates[1] + (ukCoordinates[1] - icelandCoordinates[1]) * (progress / 100);

  // Update marker position
  marker.setLatLng([fakeLat, fakeLon]);

  // Update the line to reflect the new location
  line.setLatLngs([icelandCoordinates, [fakeLat, fakeLon]]);
}

// Initial update
updateFakeLocation();

// Update fake location every minute
const intervalId = setInterval(updateFakeLocation, 60000); // 1 minute in milliseconds
