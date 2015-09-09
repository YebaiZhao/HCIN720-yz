//var date=new Date();
//var current_Date=date.getMonth()+"-"+date.getDate()+"-"+date.getFullYear();
//var public_key_filter = "?gte[timestamp]="+"09-07-2015";
var public_key = 'RM1xmbzxarFlR7b065jV';
var API_Url= 'https://data.sparkfun.com/output/' + public_key +'.json';
//var $ = require("jquery");/
var Rec_data;


//for testing
var data1;
var data2;
var array1=[1,2,3,3,4,4,5,6,7,8,8,1,3.4,5,6];
var array2=[3,4,5,6,7,8,3,4,5,6,7.7,8,9,7];
var arrayIndex=0;

//Adapted from http://phant.io/docs/output/http/
 $.ajax({
      url: API_Url,  //Using updated time and date!
   //url: 'https://data.sparkfun.com/output/RM1xmbzxarFlR7b065jV.json',
      jsonp: 'callback',
      cache: true,
      dataType: 'jsonp',
      data: {
        page: 1
      },
      success: function(response) {
     // response will be a javascript
     // array of objects
     //console.log(response);

      }
  });


//console.log(Rec_data);


//Timer creater
setInterval(refreshData,10000)


function refreshData(){
  data1=array1[arrayIndex];
  data2=array2[arrayIndex];
  arrayIndex++;
}


//The following adapted from http://smoothiecharts.org/tutorial.html
var smoothie = new SmoothieChart(
    {
      millisPerPixel:100,
      //interpolation:'step',  //potional 
      grid: { strokeStyle:'rgb(64, 64, 64)', fillStyle:'rgb(10, 10, 10)',
            lineWidth: 1, millisPerLine: 750, verticalSections: 6, },
      labels: { fillStyle:'rgb(128, 128, 128)' },
      timestampFormatter:SmoothieChart.timeFormatter//this shows real time , not data sample time!!
    }
  );
smoothie.streamTo(document.getElementById("mycanvas"));
// Data
var line1 = new TimeSeries();
var line2 = new TimeSeries();

// Add a random value to each line every second
setInterval(function() {
  line1.append(new Date().getTime(), data1);
  line2.append(new Date().getTime(), data2);
}, 10000);

// Add to SmoothieChart
smoothie.addTimeSeries(line1);
//smoothie.addTimeSeries(line1,{ strokeStyle:'rgb(0, 255, 0)', fillStyle:'rgba(0, 255, 0, 0.4)', lineWidth:3 });
smoothie.addTimeSeries(line2);
//smoothie.addTimeSeries(line2,{ strokeStyle:'rgb(255, 0, 255)', fillStyle:'rgba(255, 0, 255, 0.3)', lineWidth:3 });

var smoothie = new SmoothieChart();

