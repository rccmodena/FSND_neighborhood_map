// Function to show the side menu
function showSideMenu() {
  // Set the width of the side menu
  document.getElementById("sideMenu").style.width = "300px";
  // Add the Bootstrap class container-fluid
  document.getElementById("sideMenu").classList.toggle("container-fluid");
  // Set to visible the list of places
  document.getElementById("placesList").style.visibility = "visible";
  // When open the side menu set the focus to the search bar
  document.getElementById("filterPlaces").focus();
}

// Function to close the side menu
function closeSideMenu() {
  // Set the visibility of the list to hidden
  document.getElementById("placesList").style.visibility = "hidden";
  //  Set the width of the side menu to 0
  document.getElementById("sideMenu").style.width = "0";
  // Remove the Bootstrap class container-fluid
  document.getElementById("sideMenu").classList.toggle("container-fluid");
}

// Add the show side menu function to the hamburger button
document.getElementById("hamburgerButton").addEventListener("click", showSideMenu);

// Add the show side menu function to the hamburger button
document.getElementById("closeButton").addEventListener("click", closeSideMenu);
