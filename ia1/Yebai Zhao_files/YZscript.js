//var date=new Date();
//var current_Date=date.getMonth()+"-"+date.getDate()+"-"+date.getFullYear();
//var public_key_filter = "?gte[timestamp]="+"09-07-2015";
var public_key = 'RM1xmbzxarFlR7b065jV';
var API_Url= 'https://data.sparkfun.com/output/' + public_key +'.json';
//var $ = require("jquery");/
var Rec_data;


//for testing


//variables for actrual data 
var current_dc;
var flow_rate_gpm;
var irradiance_w_per_m2;
var pv_current_amp;
var pv_power_watts;
var pv_voltage_volts;
var timestamp;
var voltage_dc




//console.log(Rec_data);


//Timer creater
setInterval(getData,5000);

function getData(){
  //Adapted from http://phant.io/docs/output/http/
 $.ajax({
      url: API_Url,  //Using updated time and date!
   //url: 'https://data.sparkfun.com/output/RM1xmbzxarFlR7b065jV.json',
      jsonp: 'callback',
      cache: true,
      dataType: 'jsonp',
      data: {page: 1},
      success: function(response) {
     // response will be a javascript
     // array of objects
        current_dc=response[0].current_dc;
        flow_rate_gpm=response[0].flow_rate_gpm;
        irradiance_w_per_m2=response[0].irradiance_w_per_m2;
        pv_current_amp=response[0].pv_current_amp;
        pv_power_watts=response[0].pv_power_watts;
        pv_voltage_volts=response[0].pv_voltage_volts;
        timestamp=response[0].timestamp;
        voltage_dc=response[0].voltage_dc;
        console.log(current_dc);

      }
  });
}
makeChart("mycanvas_1",(pv_voltage_volts/10),pv_current_amp,pv_power_watts);


//The following adapted from http://smoothiecharts.org/tutorial.html
function makeChart(mycanvasID,data1,data2,data3){
  // Data 
  var line1 = new TimeSeries();
  var line2 = new TimeSeries();
  var line3 = new TimeSeries();

  // Add a random value to each line every 10 second
  setInterval(function() {
    line1.append(new Date().getTime(), data1);
    line2.append(new Date().getTime(), data2);
    line3.append(new Date().getTime(), data3);
  }, 10000);

  var smoothie = new SmoothieChart(
    {
      millisPerPixel:1000,
      interpolation:'linear',  //optional 
      grid: { strokeStyle:'rgb(64, 64, 64)', fillStyle:'rgb(10, 10, 10)',
            lineWidth: 1, millisPerLine: 50000, verticalSections: 6, },
      labels: { fillStyle:'rgb(128, 128, 128)' },
      //timestampFormatter:function(){return timestamp;}//this shows real time , not data sample time!!
    }
  );
  
  
// Add to SmoothieChart
//smoothie.addTimeSeries(line1);
  smoothie.addTimeSeries(line1,{ strokeStyle:'rgb(0, 255, 0)', fillStyle:'rgba(0, 255, 0, 0.4)', lineWidth:3 });
  smoothie.addTimeSeries(line2,{ strokeStyle:'rgb(0, 0, 255)', fillStyle:'rgba(0, 0, 255, 0.4)', lineWidth:3 });
  smoothie.addTimeSeries(line3,{ strokeStyle:'rgb(255, 0, 0)', fillStyle:'rgba(255, 0, 0, 0.4)', lineWidth:3 });

  smoothie.streamTo(document.getElementById(mycanvasID));
}



