// Get references to the tbody element, input field and button
var $tbody = document.querySelector("tbody");
var $dateInput = document.querySelector("#date_time");
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
  console.log(filterdate);

  // Set filteredAddresses to an array of all addresses whose "state" matches the filter
  filtersightings = dataSet.filter(function(data) {
  var date_time = data.datetime.trim();

    // If true, add the address to the filteredAddresses, otherwise don't add it to filteredAddresses
    return date_time === filterdate;
  });
  renderTable();
}

// Render the table for the first time on page load
renderTable();
