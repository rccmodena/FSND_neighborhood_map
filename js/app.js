let map;

// Initial coordinate of the main island of Fernando de Noronha
const  initialCoordinate = {lat: -3.8547586, lng: -32.4269447};

// Callback function of Google Maps API
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: initialCoordinate,
    zoom: 13.5
  });
}
