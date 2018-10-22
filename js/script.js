//This function will initialize a line chart with empy data.

function initializeChart() {
};

//When the document is ready, call the function to initialize the chart.

$( document ).ready(function() {
    initializeChart();
});

//This function will recover the data from the textArea, line by line, and
//parse each string to a JSON Object.

function recoverJSONData() {
  var textArea = $('.json-data')[0].value;
  var arrayOfEvents = textArea.split("\n"); //Split the content of textarea by line
  for (i = 0; i < arrayOfEvents.length; i++) { //Transform each line in a JSON Object
    arrayOfEvents[i] = JSON.parse(arrayOfEvents[i]);
  }
  return arrayOfEvents;
};
