// Function to show the side menu
function showSideMenu() {
  document.getElementById("sideMenu").style.width = "300px";
  document.getElementById("sideMenu").classList.toggle("container-fluid");
  document.getElementById("placesList").style.visibility = "visible";
}

// Function to close the side menu
function closeSideMenu() {
  document.getElementById("placesList").style.visibility = "hidden";
  document.getElementById("sideMenu").style.width = "0";
  document.getElementById("sideMenu").classList.toggle("container-fluid");
}

// Add the show side menu function to the hamburger button
document.getElementById("hamburgerButton").addEventListener("click", showSideMenu);

// Add the show side menu function to the hamburger button
document.getElementById("closeButton").addEventListener("click", closeSideMenu);
