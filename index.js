// Get references to the tbody element, input field and button
var $tbody = document.querySelector("tbody");

var $dateInput = document.querySelector("#date_time");
var $cityInput = document.querySelector("#city");
var $stateInput = document.querySelector("#state");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");

var $searchBtn = document.querySelector("#search");

// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);

// Set filteredAddresses to addressData initially
var filtersightings = dataSet;

// renderTable renders the filteredAddresses to the tbody
function renderTable() {
  $tbody.innerHTML = "";
  for (var i = 0; i < filtersightings.length; i++) {
    // Get get the current address object and its fields
    var sightings = filtersightings[i];
    var fields = Object.keys(sightings);
    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      // For every field in the address object, create a new cell at set its inner text to be the current value at the current address's field
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = sightings[field];
    }
  }
}

function handleSearchButtonClick() {
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
  var filterdate = $dateInput.value.trim();
  var filtercity = $cityInput.value.trim();
  var filterstate = $stateInput.value.trim();
  var filtercountry = $countryInput.value.trim();
  var filtershape = $shapeInput.value.trim();

  //start with all values
  filtersightings = dataSet

  //Sequentially filter through all requested search items
  if (filterdate != ""){
    filtersightings = dataSet.filter(x=>x.datetime==filterdate)
  }
  if (filtercity != ""){
    filtersightings = filtersightings.filter(x=>x.city==filtercity)
  }
  if (filterstate != ""){
    filtersightings = filtersightings.filter(x=>x.state==filterstate)
  }
  if (filtercountry != ""){
    filtersightings = filtersightings.filter(x=>x.country==filtercountry)
  }
  if (filtershape != ""){
    filtersightings = filtersightings.filter(x=>x.shape==filtershape)
  }
  
  renderTable();
}

// Render the table for the first time on page load
renderTable();
