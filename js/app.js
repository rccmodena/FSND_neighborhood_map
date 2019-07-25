// *************** VIEW MODEL ***************

// Object with the initial places names and location.
const initialPlaces = [
  {
    name: "Orongo",
    lat: -27.1895251,
    lng: -109.442625,
  },
  {
    name: "Ahu Akivi",
    lat: -27.1150148,
    lng: -109.3950319,
  },
  {
    name: "Ahu Tahai",
    lat: -27.1398937,
    lng: -109.4273331,
  },
  {
    name: "Ahu Tongariki",
    lat: -27.125772,
    lng: -109.2769343,
  },
  {
    name: "Ahu Vinapu",
    lat: -27.176488,
    lng: -109.406316,
  },
  {
    name: "Anakena",
    lat: -27.0732887,
    lng: -109.3232359,
  },
  {
    name: "Puna Pau",
    lat: -27.147542,
    lng: -109.403493,
  },
  {
    name: "Rano Raraku",
    lat: -27.1220658,
    lng: -109.2890082,
  }
]
// Create the "Place" that has the name and other informations about the place
const Place = function(data) {
  this.name = ko.observable(data.name);
  this.lat = ko.observable(data.lat);
  this.lng = ko.observable(data.lng);

  this.coordinates = ko.computed(function() {
      return {lat: Number(this.lat()), lng: Number(this.lng())};
  }, this);
}

let viewModel = function() {
  let self = this;
  this.placesList = ko.observableArray([]);
  initialPlaces.forEach(function(placeItem){
    self.placesList.push(new Place(placeItem));
  });
};

ko.applyBindings(new viewModel());
// *************** VIEW MODEL ***************


// *************** GOOGLE MAPS API ***************
// Create the variable for the map
let map;

// Create the array of markers
let markers = [];

// Initial coordinate of the Easter Island
const  initialCoordinate = {lat: -27.113062, lng: -109.349946};

// Callback function of Google Maps API
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: initialCoordinate,
    zoom: 12,
    mapTypeId: 'terrain',
    mapTypeControl: true,
    mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.RIGHT_CENTER
    }
  });

  // Create an Info Window
  const markerInfoWindow = new google.maps.InfoWindow();

  // Create an normal icon
  const normalIcon = makeMarkerIcon('ff0000');

  // Create an selected icon, when clicked or hover over it
  const selectedIcon = makeMarkerIcon('00ff00');

  // Create all markers from initialPlaces
  initialPlaces.forEach(function(place, index){
    const position = {lat: Number(place.lat), lng: Number(place.lng)};
    const name = place.name;

    const marker = new google.maps.Marker({
      position: position,
      title: name,
      animation: google.maps.Animation.DROP,
      icon: normalIcon,
      id: index
    });

    // Push the marker to our array of markers.
    markers.push(marker);

    // Create an onclick event to open an infowindow at each marker.
    marker.addListener('click', function(){
      createInfoWindow(this, markerInfoWindow);
    });

    // Two event listeners - one for mouseover, one for mouseout, to change the colors back and forth.
    marker.addListener('mouseover', function(){
      this.setIcon(selectedIcon);
    });

    marker.addListener('mouseout', function(){
      this.setIcon(normalIcon);
    });
  });

  showMarkers();
}

// Function
function makeMarkerIcon(markerColor){
  const markerImage = new google.maps.MarkerImage(
  'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1|0|' + markerColor + '|40|_|%E2%80%A2',
    new google.maps.Size(21,34),
    new google.maps.Point(0, 0),
    new google.maps.Point(10, 34),
    new google.maps.Size(21, 34)
  );
  return markerImage;
}

// Show all markers
function showMarkers() {
  markers.forEach(function(marker, index){
    marker.setMap(map);
  });
}

// This function will loop through the listings and hide them all.
function hideMarkers(markers) {
  markers.forEach(function(marker, index){
    marker.setMap(null);
  });
}

// Function
function createInfoWindow(marker, infowindow) {
  if (infowindow.marker != marker) {
    console.log(marker.title);
    infowindow.marker = marker;
    infowindow.setContent('<div class="text-dark font-weight-bold">' + marker.title + '</div>');

    infowindow.addListener('closeclick', function(){
      infowindow.marker = null;
    })

    infowindow.open(map, marker);
  }
}
// *************** GOOGLE MAPS API ***************
