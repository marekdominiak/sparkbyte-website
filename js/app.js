// Initialize Google Map
function initMap() {
      // Create the map and set its view to the specified coordinates and zoom level
    const map = L.map('map').setView([35.1739, 33.3647], 15); // Example coordinates for Nicosia, Cyprus

    // Add a tile layer (from OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add a marker at the specified location
    const marker = L.marker([35.1739, 33.3647]).addTo(map);
    marker.bindPopup("<b>Sparkbyte Solutions</b><br>Piraeus 30, Floor 1, Nicosia").openPopup();
}


// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Load Google Maps API
const script = document.createElement('script');
script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
script.async = true;
document.head.appendChild(script);
