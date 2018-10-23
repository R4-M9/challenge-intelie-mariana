function initializeCodeEditor() {
  window.editor = ace.edit("editor");
  editor.setTheme("ace/theme/clouds_midnight");
  editor.session.setMode("ace/mode/javascript");

  editor.setOptions({
    fontFamily: "Source Code Pro",
    fontSize: "12pt",
    showLineNumbers: true,
    vScrollBarAlwaysVisible: true
  });

  $("#editor").resizable({
    handleSelector: ".splitter",
    resizeWidth: false
  });
}

var chart = null; //Global variable to store the chart

//This function will initialize a line chart with empy data.

function initializeChart() {
  Highcharts.setOptions({
    global: {
      useUTC: false
    }
  });

  var $container = $('#line-chart');

  var chartingOptions = {
    chart: {
      renderTo: $container[0],
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
      verticalAlign: 'middle',
      itemStyle: {
        fontFamily: 'Source Sans Pro'
      }
    },
    series: [{
      name: 'Linux Chrome Min Response Time', //select: ['min', 'max'] --> min
      data: [{ //all values from the min category
        x: 1519862400000,
        y: 0.1
      },
      {
        x: 1519862460000,
        y: 0.2
      }
    ]
  }, {
    name: 'Linux Chrome Max Response Time', //select: ['min', 'max'] --> max
    data: [{ //all values from the max category
      x: 1519862400000,
      y: 1.3
    },
    {
      x: 1519862460000,
      y: 0.9
    }
  ]
}],
responsive: {
  rules: [{
    condition: {
      minWidth: 200
    },
    credits: {
      enabled: false
    }
  }]
}
}

chart = new Highcharts.Chart(chartingOptions);
};

//When the document is ready, call the function to initialize the chart.

$( document ).ready(function() {
  initializeChart();
  initializeCodeEditor();
});


//This function will update de extreme values of the Chart on the x axis
//min and max values.

function updateChartBoundaries(min, max) {
  chart.xAxis[0].setExtremes(min,max);
};

//This function will update de extreme values of the Chart on the x axis
//min and max values.

function getTimeSeries(jsonEvent, group, select) {
  timestamp = jsonEvent.timestamp;
  eventGroup = '';
  arrayOfSeries = [];

  for (i = 0; i < group.length; i++) {
    currentGroup = group[i];
    eventGroup += ' ' + jsonEvent[currentGroup];
  }
  eventGroup = eventGroup.replace(/^\s+/,"");

  for (i = 0; i < select.length; i++) {
    currentSelect = select[i];
    series = []
    name = eventGroup + ' ' + select[i];
    point = {x: timestamp, y: jsonEvent[currentSelect]};
    series.push(name, point);
    arrayOfSeries.push(series);
  }

  return arrayOfSeries;

};

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

//This function will read one JSON Event Object at a time and
//treat it according to its type.

function readEvents() {
  var count = 0;
  var currentEvent = null;
  var group = [];
  var select = [];
  var arrayOfEvents = recoverJSONData();

  while(arrayOfEvents[count] != null) { //While there's data, still reading
  currentEvent = arrayOfEvents[count];
  if(currentEvent.type == "start") {
    group = currentEvent.group;
    select = currentEvent.select;
    while(currentEvent.type != "stop") { //If it's a start event, only stops if it's a stop event
    count++;
    currentEvent = arrayOfEvents[count];
    if (currentEvent.type == "span") {
      updateChartBoundaries(currentEvent.begin, currentEvent.end);
    }
  }
}
count++;
}
}
