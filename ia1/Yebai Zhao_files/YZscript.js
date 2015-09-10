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
        console.log(response[0]);
      }
  });
}



//The following adapted from http://smoothiecharts.org/tutorial.html

  var smoothie1 = new SmoothieChart(
    {
      millisPerPixel:1000,
      //interpolation:'linear',  //optional 
      grid: { strokeStyle:'rgb(64, 64, 64)', fillStyle:'rgb(10, 10, 10)',
            lineWidth: 1, millisPerLine: 50000, verticalSections: 6, },
      labels: { fillStyle:'rgb(128, 128, 128)' },
      //timestampFormatter:function(){return timestamp;}//this shows real time , not data sample time!!
    }
  );
    // Data 
  var line1 = new TimeSeries();
  var line2 = new TimeSeries();
  var line3 = new TimeSeries();

 
   setInterval(function() {
    line1.append(new Date().getTime(), (pv_voltage_volts/10));
    line2.append(new Date().getTime(), pv_current_amp);
    line3.append(new Date().getTime(), pv_power_watts);
  }, 10000);


  // Add to SmoothieChart
  //smoothie.addTimeSeries(line1);
  smoothie1.addTimeSeries(line1,{ strokeStyle:'#ff0000', fillStyle:'rgba(128, 0, 0, 0.4)', lineWidth:3 });
  smoothie1.addTimeSeries(line2,{ strokeStyle:'#00ff00', fillStyle:'rgba(0, 128, 0, 0.4)', lineWidth:3 });
  smoothie1.addTimeSeries(line3,{ strokeStyle:'#0000ff', fillStyle:'rgba(0, 0, 128, 0.4)', lineWidth:3 });

  smoothie1.streamTo(document.getElementById("mycanvas_1"));






  var smoothie2 = new SmoothieChart(
    {
      millisPerPixel:1000,
      //interpolation:'linear',  //optional 
      grid: { strokeStyle:'rgb(64, 64, 64)', fillStyle:'rgb(10, 10, 10)',
            lineWidth: 1, millisPerLine: 50000, verticalSections: 6, },
      labels: { fillStyle:'rgb(128, 128, 128)' },
      //timestampFormatter:function(){return timestamp;}//this shows real time , not data sample time!!
    }
  );
    // Data 
  var line4 = new TimeSeries();
  var line5 = new TimeSeries();
  var line6 = new TimeSeries();
   setInterval(function() {
    line4.append(new Date().getTime(), voltage_dc);
    line5.append(new Date().getTime(), 0);
    line6.append(new Date().getTime(), 0);
  }, 10000);
 
  // Add to SmoothieChart
  //smoothie.addTimeSeries(line1);
  smoothie2.addTimeSeries(line4,{ strokeStyle:'#ff0000', fillStyle:'rgba(128, 0, 0, 0.4)', lineWidth:3 });
  smoothie2.addTimeSeries(line5,{ strokeStyle:'#00ff00', fillStyle:'rgba(0, 128, 0, 0.4)', lineWidth:3 });
  smoothie2.addTimeSeries(line6,{ strokeStyle:'#0000ff', fillStyle:'rgba(0, 0, 128, 0.4)', lineWidth:3 });

  smoothie2.streamTo(document.getElementById("mycanvas_2"));



