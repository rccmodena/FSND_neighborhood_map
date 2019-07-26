// Object with the initial places names and location.
const initialPlaces = [
  {
    name: "Orongo",
    coordinates: {lat: -27.1895251, lng: -109.442625}
  },
  {
    name: "Ahu Akivi",
    coordinates: {lat: -27.1150148, lng: -109.3950319}
  },
  {
    name: "Ahu Tahai",
    coordinates:{lat: -27.1398937, lng: -109.4273331}
  },
  {
    name: "Ahu Tongariki",
    coordinates: {lat: -27.125772, lng: -109.2769343}
  },
  {
    name: "Ahu Vinapu",
    coordinates: {lat: -27.176488,lng: -109.406316}
  },
  {
    name: "Anakena",
    coordinates: {lat: -27.0732887, lng: -109.3232359}
  },
  {
    name: "Puna Pau",
    coordinates: {lat: -27.147542, lng: -109.403493}
  },
  {
    name: "Rano Raraku",
    coordinates: {lat: -27.1220658, lng: -109.2890082}
  }
]

// *************** GOOGLE MAPS API ***************

// Display an erro message if the Google Maps API do not
// Respond after 3 seconds
setTimeout(function(){
  const errorElement = document.getElementById("errorMap");
  if (errorElement !== null){
    errorElement.innerHTML = "This page didn't load Google Maps correctly!";
  }
}, 3000);

// Create the variable for the map
let map;

// Create the array of markers
let markers = [];

// Initial coordinate of the Easter Island
const  initialCoordinate = {lat: -27.113062, lng: -109.349946};

// Callback function of Google Maps API
function initMap() {
  // Create a new Map and its configuration
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

  // Create all markers from initialPlaces array
  initialPlaces.forEach(function(place, index){
    const marker = new google.maps.Marker({
      position: place.coordinates,
      title: place.name,
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
      // When select the marker from the list center map Window
      //on the marker.
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
  markers.forEach(function(marker, index){
    marker.setMap(map);
  });
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

// Create the infowindow with information about the place that the marker represents.
function createInfoWindow(marker, infowindow) {
  // Verify if the info window is already open
  if (infowindow.marker != marker) {
    // Set the current infowindow to the marker
    infowindow.marker = marker;

    // Create a basic content with the title of the marker
    infowindow.setContent('<div class="text-dark font-weight-bold">'+ marker.title +'</div>');

    // Get a photo of the marker from Foursquare API and
    // set info window content
    getFoursquareContent(marker, infowindow);

    // Add a function to the close button on the info window
    infowindow.addListener('closeclick', function(){
      infowindow.marker = null;
    })

    // Open the info windows
    infowindow.open(map, marker);
  }
}

function getFoursquareContent(marker, infoWindow) {
  // Foursquare Cliente ID
  const foursquareClientId = 'AOYDE1MNGPIKV04KLIIKAL4CO5OSSWQGQADR4ADVJNAFJWWR';
  // Foursquare Cliente Secret
  const foursquareClientSecret = '0CFQYLQCL22HENZWQ1JDDRUISZS3TTPCVINP4VXZSFY02F0C';

  let photoAddress;

  // Search for the Venue ID
  getIDFoursquareUrl = 'https://api.foursquare.com/v2/venues/search?ll=' + marker.position.lat() + ',' + marker.position.lng() + '&client_id=' + foursquareClientId + '&client_secret=' + foursquareClientSecret + '&v=20190725';
  $.getJSON(getIDFoursquareUrl).done(function(data){
    // Get the Venue ID
    let id = data.response.venues[0].id;
    // Search for one photo of the Venue
    getPhotoFoursquareUrl = 'https://api.foursquare.com/v2/venues/'+id+'/photos?/&client_id=' + foursquareClientId + '&client_secret=' + foursquareClientSecret + '&v=20190725';
    $.getJSON(getPhotoFoursquareUrl).done(function(data){
      // Get the Photo
      const photo = data.response.photos.items[0];
      // Small photo from Foursquare (100x100)
      smallphotoAddress = photo.prefix+'100x100'+photo.suffix;
      // Photor from Foursquare with original size
      originalphotoAddress = photo.prefix+'original'+photo.suffix;

      infoWindow.setContent('<div class="text-dark font-weight-bold">'+ marker.title +'</div><br><div><img src="' + smallphotoAddress + '"></div><div class="text-dark">Source: <a target="_blank" href="' + originalphotoAddress + '">Foursquare</a></div>');
    }).fail(function(error){
      // Display error message, unable to get the photo
      infoWindow.setContent('<div class="text-dark font-weight-bold">'+ marker.title +'</div><br><div class="text-dark">Fail to get Foursquare Photo!</div>');
    });
  }).fail(function(error){
    // Display error message, unable to connect to Foursquare
    infoWindow.setContent('<div class="text-dark font-weight-bold">'+ marker.title +'</div><br><div class="text-dark">Fail to connect to Foursquare!</div>');
  });
}

// Function to bounce once the selected marker
function bounceMarker(marker) {
  // Set animation to Bounce
  marker.setAnimation(google.maps.Animation.BOUNCE);
  // Set the animation to 500 ms
  setTimeout(function(){
    marker.setAnimation(null);
  }, 500);
}

// *************** GOOGLE MAPS API ***************

// *************** VIEW MODEL ***************
// Create the "Place" that has the name and other informations about the place
const Place = function(data) {
  this.name = data.name;
  this.coordinates = data.coordinate;
}

// The view model
let viewModel = function() {
  let self = this;
  // Text typed by the user in the search bar
  this.filteredText = ko.observable("")
  // Create the list of places
  this.placesList = ko.observableArray([]);

  initialPlaces.forEach(function(placeItem){
    // Push a new place to the placeList
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

    arrayLis.forEach(function(li, index){
      // Convert li content to lower case
      const lowerLi = li.innerText.toLowerCase();

      // Verify if the input text is part of the text of
      // the list
      if (lowerLi.indexOf(lowerText) > -1) {
          // Display in the list
          li.style.display = "";
          // Display on the map
          markers[index].setMap(map);
      } else {
          // Remove from the list
          li.style.display = "none";
          // Remove from the map
          markers[index].setMap(null);
      }
    });
  });
};

ko.applyBindings(new viewModel());
// *************** VIEW MODEL ***************
