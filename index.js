'use strict';

// put your own value below!
const apiKey = 'd8s2KWMR7KzApbynVTlkws6jSuoyowtCWl8pYheR'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function findNationalParks(query, maxResults = 10) {
  const params = {
    api_key: apiKey,
    q: query,
    maxResults
  };
  const queryString = formatQueryParams(params);
  const url = searchURL + "?" + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $("#js-error-message").text(`Something went wrong: ${err.message}`);
    });
}


function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the items array
  for (let i = 0; i < responseJson.data.length; i++){
  
    //add a list item to the results corresponding to each park 
    //list with the name, description, link, image, cost, and directions link
    //and thumbnail
    $("#results-list").append(
      `<li><a href="${responseJson.data[i].url}" target="_blank"><h3>${
        responseJson.data[i].fullName
      }</h3></a>
      <p>${responseJson.data[i].description}</p>
      <a href="${responseJson.data[i].directionsUrl}">Directions</a>
      </li>`
    );
  }
  //display the results section
  $("#results").removeClass("hidden");
}



function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    findNationalParks(searchTerm, maxResults);
    $(".insertState").text(`Search results for ${searchTerm}`);
  });
}

$(watchForm);
