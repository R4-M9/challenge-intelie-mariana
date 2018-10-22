//This function will initialize a line chart with empy data.

function initializeChart() {
  var $container = $('#line-chart'); //JQuery object that the chart will be ploted

  Highcharts.setOptions({
    global: {
      useUTC: false //Set the time to local
    }
  });

  var chartingOptions = {
    chart: {
      renderTo: $container[0],
      margin: 0,
      height: 400,
      type: 'line'
    },
    title: {
      text: ''
    },
    xAxis: {
      type: 'datetime',
      labels: {
        format: "{value:%H:%M}"
      }
    },
    yAxis: {
      title: {
        text: ''
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },
    series: []
  }

  var chart = new Highcharts.Chart(chartingOptions);
};

//When the document is ready, call the function to initialize the chart.

$( document ).ready(function() {
  initializeChart();
});

//This function will recover the data from the textArea, line by line, and
//parse each string to a JSON Object.

function recoverJSONData() {
  var textArea = $('#json-data')[0].value;
  var arrayOfEvents = textArea.split("\n"); //Split the content of textarea by line
  for (i = 0; i < arrayOfEvents.length; i++) { //Transform each line in a JSON Object
    arrayOfEvents[i] = JSON.parse(arrayOfEvents[i]);
  }
  return arrayOfEvents;
};

function readEvents() {
  var count = 0;
  var currentEvent = null;
  var arrayOfEvents = recoverJSONData();

  while(arrayOfEvents[count] != null) { //While there's data, still reading
    currentEvent = arrayOfEvents[count];
    if(currentEvent.type == "start") {
      while(currentEvent.type != "stop") { //If it's a start event, only stops if it's a stop event
        count++;
        currentEvent = arrayOfEvents[count];
        console.log(currentEvent);
      }
    }
    count++;
  }
}
