// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
let map, infoWindow;

let labelIndex = 0;
let markersList = [];

function initMap() {
	var pos = {lat: 37.4, lng: -122.2};
	// if (navigator.geolocation) {
 //      navigator.geolocation.getCurrentPosition(
 //        (position) => {
 //          	pos = {
 //            	lat: position.coords.latitude,
 //            	lng: position.coords.longitude,
 //        	};
 //    	}
 //    	)
	// }
	map = new google.maps.Map(document.getElementById("map"), {
	center: pos,
	zoom: 6,
	mapTypeId: 'satellite'
	});
	infoWindow = new google.maps.InfoWindow();

  // const locationButton = document.createElement("button");

  // locationButton.textContent = "Pan to Current Location";
  // locationButton.classList.add("custom-map-control-button");
  // map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  // locationButton.addEventListener("click", () => {
  //   // Try HTML5 geolocation.
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const pos = {
  //           lat: position.coords.latitude,
  //           lng: position.coords.longitude,
  //         };

  //         infoWindow.setPosition(pos);
  //         infoWindow.setContent("Location found.");
  //         infoWindow.open(map);
  //         map.setCenter(pos);
  //       },
  //       () => {
  //         handleLocationError(true, infoWindow, map.getCenter());
  //       }
  //     );
  //   } else {
  //     // Browser doesn't support Geolocation
  //     handleLocationError(false, infoWindow, map.getCenter());
  //   }
  //   eqfeed_callback()
  // });

    // This event listener calls addMarker() when the map is clicked.
  google.maps.event.addListener(map, "click", (event) => {
    addMarker(event.latLng);
  });

  function addSensor(sens) {
  	str = "https://fe131boz00.execute-api.us-west-1.amazonaws.com/sensors/" + sens + "/latest"
  	fetchAsync(str).then((res) => {
  		lat = parseFloat(res['lat']['N'])
  		lon = parseFloat(res['lon']['N'])
		const latLng = new google.maps.LatLng(lat, lon);


	    marker = new google.maps.Marker({
	      position: latLng,
	      map: map,
    	  icon: "OffsetMarker.png"
	    });
	    markersList.push(marker)
	    var markerIndex = markersList.length - 1
	    var infowindow = new google.maps.InfoWindow({
		  content: " "
		});

        google.maps.event.addListener(marker, 'click', (function() {
          infowindow.setContent(
          	"<h3>" + sens + "</h3>" + 
          	"<b>Temp: </b>" + res['M']['temp']['S'] +
          	"<br><b>Humidity: </b>" + res['M']['humidity']['S'] +
          	"<br><b>Soil Moisture: </b>" + res['M']['last_soil_moisture']['S']

          	);
          infowindow.open(map, markersList[markerIndex]);
        })
        );

  	})

  	var select1 = document.getElementById('leftDrop');
  	var select2 = document.getElementById('rightDrop');
  	var opt1 = document.createElement('option');
    opt1.value = sens;
    opt1.innerHTML = sens;
    select1.appendChild(opt1);
  	var opt2 = document.createElement('option');
    opt2.value = sens;
    opt2.innerHTML = sens;
    select2.appendChild(opt2);

  }

   google.maps.event.addDomListener(document.getElementById("GetButton"), "click", () => {
   	str = "https://fe131boz00.execute-api.us-west-1.amazonaws.com/farms/" + document.getElementById("fname").value
   	console.log(str)
   	document.getElementById("bottomSection").hidden = false
	fetchAsync(str).then((res) => {
		var sensArr = res.toString().split(",") 
		sensArr.forEach(addSensor)
	})
    // window.alert(res);
  });

}
console.log("helo")
// Loop through the results array and place a marker for each
// set of coordinates.
const eqfeed_callback = function (results) {

    const coords = [40.779502, -73.967857];
    const latLng = new google.maps.LatLng(coords[1], coords[0]);

    new google.maps.Marker({
      position: latLng,
      map: map,
    });
    console.log("hello")
};

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}


// // Adds a marker to the map.
// function addMarker(location, map) {
// 	console.log("lo")
//   // Add the marker at the clicked location, and add the next-available label
//   // from the array of alphabetical characters.
//   new google.maps.Marker({
//     position: location,
//     label: labels[labelIndex++ % labels.length],
//     map: map,
//   });
// }



function addMarker(location) {
  marker = new google.maps.Marker({
    position: location,
    map: map,
    icon: "OffsetMarker.png"
  });
}

// async
// marker = new google.maps.Marker({
// 	map,
// 	draggable: true,
// 	animation: google.maps.Animation.DROP,
// 	position: { lat: 59.327, lng: 18.067 },
// });

// Testing the addMarker function
function TestMarker() {
  CentralPark = new google.maps.LatLng(40.779502, -73.967857);
  addMarker(CentralPark);
}

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    console.log(xmlHttp.responseText)
    return xmlHttp.responseText;
}

str = "https://fe131boz00.execute-api.us-west-1.amazonaws.com/farms/farm1"

// httpGet(str)

async function fetchAsync (url) {
  let response = await fetch(url);
  let data = await response.json();
  console.log(data)
  return data;
}

// fetchAsync(str)


Chart.defaults.font.family = "Verdana";
Chart.defaults.font.weight = "bold";

// const label = [
// 'January',
// 'February',
// 'March',
// 'April',
// 'May',
// 'June',
// ];

// const data = {
// labels: label,
// datasets: [{
//   label: 'My First dataset',
//   backgroundColor: 'rgb(255, 99, 132)',
//   borderColor: 'rgb(255, 99, 132)',
//   data: [0, 10, 5, 2, 20, 30, 45],
// }]
// };

// const config = {
// type: 'line',
// data: data,
// options: {}
// };

// var scatterChartData = {
//   datasets: [{
//     label: "Temp",
//     backgroundColor: "#6ceae9",
//     borderColor: "#6ceae9",
//     showLine: true,
//     data: [{
//       x: 1499516102000,
//       y: 40,
//     }, {
//       x: 1499516402000,
//       y: 41,
//     }, {
//       x: 1499516702000,
//       y: 42.5,
//     }, {
//       x: 1499516902000,
//       y: 50,
//     }],
//   }, {
//     label: "Humidity",
//     backgroundColor: "#e2dfcc",
//     borderColor: "#e2dfcc",
//     showLine: true,
//     data: [{
//       x: 1499516102000,
//       y: 65,
//     }, {
//       x: 1499516402000,
//       y: 63,
//     }, {
//       x: 1499516702000,
//       y: 60,
//     }, {
//       x: 1499516902000,
//       y: 55,
//     }]
//   }]
// };


var scatterChartData = {
  datasets: [{
    label: "Temp",
    backgroundColor: "#6ceae9",
    borderColor: "#6ceae9",
    showLine: true,
    data: [],
  }, {
    label: "Humidity",
    backgroundColor: "#e2dfcc",
    borderColor: "#e2dfcc",
    showLine: true,
    data: []
  }]
};

    

const config = {
  type: 'scatter',
  data: scatterChartData,
  options: {
  	plugins: {  // 'legend' now within object 'plugins {}'
      legend: {
        labels: {
          color: "white",  // not 'fontColor:' anymore
          // fontSize: 18  // not 'fontSize:' anymore
          font: {
            size: 14 // 'size' now within object 'font {}'
          }
        }
      }
    },
      scales: {
        xAxes: {
            type: 'time',
            time: {
              parser: 'MM/DD/YYYY HH:mm',
              tooltipFormat: 'll HH:mm',
              // unit: 'day',
              unitStepSize: 1,
              displayFormats: {
           		'minute': 'MM/dd/yyyy HH:mm',
                'day': 'MM/dd/yyyy HH:mm'
              }
            },
            // time: {
            //   unit: 'day',
            //   tooltipFormat: 'MMM DD'
            // }
            grid: {
			  color: "#c4c4c4",

			},
			ticks: {
          		color: "white",
          	}
          },
        yAxes: {
            grid: {
			  color: "#c4c4c4",

			},
			ticks: {
          		color: "white",
          	}
        }
      },
    }
};

const leftChart = new Chart(
	document.getElementById('leftChart'),
	config
);


const rightChart = new Chart(
	document.getElementById('rightChart'),
	config
);


function createDataSets(awsResult) {

	var dataSet = []

	let dataPoints1 = []

	times = awsResult.times["S"].split(",")
	temps = awsResult.temps["S"].split(",")
	// console.log(times)
	for (var i = 0; i < times.length; i++) {
		// console.log(dataPoints1)
		dataPoints1.push({x:parseFloat(times[i])*1000, y:parseFloat(temps[i])})

	}

	dataSet.push({
		label: "Temp",
	    backgroundColor: "#6ceae9",
    	borderColor: "#6ceae9",
	    showLine: true,
	    data: dataPoints1
	})

	return dataSet
}



document.getElementById('leftDrop').onchange = function () {
    var val = document.getElementById('leftDrop').value;
    str = "https://fe131boz00.execute-api.us-west-1.amazonaws.com/sensors/" + val + "/timeseries"
   	console.log(str)
	fetchAsync(str).then((res) => {
		console.log(res)
		var dataSet = createDataSets(res)
		console.log(leftChart.data.datasets)

    	leftChart.data.datasets = dataSet
    	leftChart.update();

		console.log(leftChart.data.datasets)
		})

};




document.getElementById('rightDrop').onchange = function () {
    var val = document.getElementById('rightDrop').value;
    str = "https://fe131boz00.execute-api.us-west-1.amazonaws.com/sensors/" + val + "/timeseries"
   	console.log(str)
	fetchAsync(str).then((res) => {
		console.log(res)
		var dataSet = createDataSets(res)
		console.log(rightChart.data.datasets)

    	rightChart.data.datasets = dataSet
    	rightChart.update();

		console.log(rightChart.data.datasets)
		})

};









// jQuery.each(scatterChartData.datasets, function(i, dataset) {
//   dataset.borderColor = 'blue';
//   dataset.backgroundColor = 'blue';
//   dataset.pointBorderColor = 'blue';
//   dataset.pointBackgroundColor = 'blue';
//   dataset.pointBorderWidth = 1;
// });

// var ctx = document.getElementById("leftChart").getContext("2d");
// window.myScatter = new Chart(ctx, {
//   type: 'scatter',
//   data: scatterChartData,
//   options: {
//     scales: {
//         xAxes: {
//         type: 'time',
//         time: {
//           unit: 'day',
//           tooltipFormat: 'MMM DD'
//         },
//         ticks: {
//             callback: function(value, index, values){
                
//                 return moment(value).format("DD/MM/YY");
//             }
//         }
//       }
//      }
//  }
// });

// const leftChart = new Chart(
// 	document.getElementById('leftChart'),
// 	config
// );

// const rightChart = new Chart(
// 	document.getElementById('rightChart'),
// 	config
// );

// const myChart = new Chart(
// 	document.getElementById('myChart'),
// 	config
// );









