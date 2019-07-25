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


// *************** VIEW MODEL ***************
// Create the "Place" that has the name and other informations about the place
const Place = function(data) {
  this.name = ko.observable(data.name);
  this.lat = ko.observable(data.lat);
  this.lng = ko.observable(data.lng);

  this.coordinates = ko.computed(function() {
      return {lat: Number(this.lat()), lng: Number(this.lng())};
  }, this);
}

// The view model
let viewModel = function() {
  let self = this;

  // Text typed by the user in the search bar
  this.filteredText = ko.observable("")

  // Create the list of places based on the initialPlaces Array
  this.placesList = ko.observableArray([]);
  initialPlaces.forEach(function(placeItem){
    self.placesList.push(new Place(placeItem));
  });

  // When change the filteredText trigger this function
  this.filteredText.subscribe(function(){
    // Convert filteredText to lower case
    const lowerText = self.filteredText().toLowerCase();

    // Get all item of the list
    const listLis = document.getElementsByTagName("li");

    // Convert the HTMLCollection to array
    const arrayLis = Array.prototype.slice.call(listLis);

    arrayLis.forEach(function(li){
      // Convert li content to lower case
      const lowerLi = li.innerText.toLowerCase();

      // Verify if the input text is part of the text of
      // the list, if not remove the item from the list
      if (lowerLi.indexOf(lowerText) > -1) {
          li.style.display = "";
      } else {
          li.style.display = "none";
      }
    });
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

    // Push this marker to the array of markers.
    markers.push(marker);

    // Bounce the marker once and open an info window when click on a specific marker.
    marker.addListener('click', function(){
      bounceMarker(this);
      createInfoWindow(this, markerInfoWindow);
    });

    // Bounce the marker once and open an info window when click the item in the list that corresponds to a marker.
    document.getElementsByTagName("li")[index].addEventListener('click', function(){
      map.setCenter(marker.getPosition());
      bounceMarker(marker);
      createInfoWindow(marker, markerInfoWindow);
    });

    // When hover over an marker change it to selectedIcon.
    marker.addListener('mouseover', function(){
      this.setIcon(selectedIcon);
    });

    // When leave out the mouse over an marker change it to normalIcon.
    marker.addListener('mouseout', function(){
      this.setIcon(normalIcon);
    });
  });

  // Show all markers when the app is open
  showMarkers();
}

// Create the icon displayed as a marker, the argument is the color of the marker in hexadecimal.
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

// Create the infowindow with information about the place that the marker represents.
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

// Function to bounce once the selected marker
function bounceMarker(marker) {
  marker.setAnimation(google.maps.Animation.BOUNCE);
  setTimeout(function(){ marker.setAnimation(null); }, 500);
}
// *************** GOOGLE MAPS API ***************
