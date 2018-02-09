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
var new_filtersightings;
var entries_per_page = 1000;

var start = 0;
var end = entries_per_page;

// renderTable renders the filteredAddresses to the tbody
function renderTable() {
  $tbody.innerHTML = "";

  console.log("in render table");
  console.log(new_filtersightings.length);

  for (var i = 0; i < new_filtersightings.length; i++) {
    // Get get the current address object and its fields
    var sightings = new_filtersightings[i];
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

function renderPage(){

  var num_pages = filtersightings.length/entries_per_page;

  console.log(filtersightings.length);

  var page_list = d3.select(".pagination")

  for (var i=0; i<num_pages; i++){
    page_list.append("li")
    .append("a")
    .attr("href","#")
    .text(i+1)
    .on("click", function(data, index) {
        var pg_num = +this.innerText;
        var new_start = (pg_num - 1) * entries_per_page;
        var new_end = new_start + entries_per_page;
        new_filtersightings = filtersightings.slice(new_start, new_end);
        console.log(new_start, new_end)
        renderTable();
    })
  }

  new_filtersightings = filtersightings.slice(start, end);

  renderTable();
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
  
  renderPage();
}

// Render the table for the first time on page load
renderPage();
