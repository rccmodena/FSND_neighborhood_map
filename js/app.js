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
let map;

// Initial coordinate of the Easter Island
const  initialCoordinate = {lat: -27.113062, lng: -109.349946};

// Callback function of Google Maps API
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: initialCoordinate,
    zoom: 12,
    mapTypeId: 'terrain'
  });
}
// *************** GOOGLE MAPS API ***************
