//var date=new Date();
//var current_Date=date.getMonth()+"-"+date.getDate()+"-"+date.getFullYear();
//var public_key_filter = "?gte[timestamp]="+"09-07-2015";
var public_key = 'RM1xmbzxarFlR7b065jV';
var API_Url= 'https://data.sparkfun.com/output/' + public_key +'.json';
//var $ = require("jquery");/
//var Rec_data;


//for testing


//variables for actrual data 
var current_dc;
var flow_rate_gpm;
var irradiance_w_per_m2;
var pv_current_amp;
var pv_power_watts;
var pv_voltage_volts;
var timestamp;
var voltage_dc;




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
  var smoothie = new SmoothieChart(
    {
      millisPerPixel:2500,
      maxValue:170,
      minValue:0,
      interpolation:'linear',  //optional 
      grid: { strokeStyle:'rgb(64, 64, 64)', fillStyle:'rgb(10, 10, 10)',
            lineWidth: 1, millisPerLine: 100000, verticalSections: 6, },
      labels: { fillStyle:'rgb(128, 128, 128)' },
      //timestampFormatter:function(){return timestamp;}//this shows real time , not data sample time!!
    }
  );
   setInterval(function() {
    line1.append(new Date().getTime(), pv_voltage_volts);
    line2.append(new Date().getTime(), voltage_dc);
    line3.append(new Date().getTime(), pv_power_watts);
  	var newLabel1=document.getElementById("legendred");
  	newLabel1.innerHTML="PV Voltage: "+pv_voltage_volts+" Volts";

    var newLabel1=document.getElementById("legendgreen");
    newLabel1.innerHTML="DC Voltage: "+voltage_dc+" Volts";

    var newLabel1=document.getElementById("legendblue");
    newLabel1.innerHTML="PV Power: "+pv_power_watts+" Watts";

    var newLabel1=document.getElementById("time");
    newLabel1.innerHTML="Current Time: "+timestamp;

  }, 10000);

  // Data 
  var line1 = new TimeSeries();
  var line2 = new TimeSeries();
  var line3 = new TimeSeries();

 
  // Add to SmoothieChart
  //smoothie.addTimeSeries(line1);
  smoothie.addTimeSeries(line1,{ strokeStyle:'#ff0000', fillStyle:'rgba(128, 0, 0, 0.4)', lineWidth:3 });
  smoothie.addTimeSeries(line2,{ strokeStyle:'#00ff00', fillStyle:'rgba(0, 128, 0, 0.4)', lineWidth:3 });
  smoothie.addTimeSeries(line3,{ strokeStyle:'#2020ff', fillStyle:'rgba(0, 0, 128, 0.4)', lineWidth:3 });

  smoothie.streamTo(document.getElementById("mycanvas_1"));



//The following adapted from http://smoothiecharts.org/tutorial.html


  var smoothie2 = new SmoothieChart(
    {
      millisPerPixel:2500,
      minValue:0,
      interpolation:'linear',  //optional 
      grid: { strokeStyle:'rgb(64, 64, 64)', fillStyle:'rgb(10, 10, 10)',
            lineWidth: 1, millisPerLine: 100000, verticalSections: 6, },
      labels: { fillStyle:'rgb(128, 128, 128)' },
      //timestampFormatter:function(){return timestamp;}//this shows real time , not data sample time!!
    }
  );
   setInterval(function() {
    line4.append(new Date().getTime(), pv_current_amp);
    line5.append(new Date().getTime(), current_dc);
    line6.append(new Date().getTime(), flow_rate_gpm);
    var newLabel1=document.getElementById("legendred2");
    newLabel1.innerHTML="PV Current: "+pv_current_amp+" Amp";

    var newLabel1=document.getElementById("legendgreen2");
    newLabel1.innerHTML="DC Current : "+current_dc+" Amp";

    var newLabel1=document.getElementById("legendblue2");
    newLabel1.innerHTML="Flow Rate : "+flow_rate_gpm+" RPM";
  }, 10000);

  // Data 
  var line4 = new TimeSeries();
  var line5 = new TimeSeries();
  var line6 = new TimeSeries();

 
  // Add to SmoothieChart
  //smoothie.addTimeSeries(line1);
  smoothie2.addTimeSeries(line4,{ strokeStyle:'#ff0000', fillStyle:'rgba(128, 0, 0, 0.4)', lineWidth:3 });
  smoothie2.addTimeSeries(line5,{ strokeStyle:'#00ff00', fillStyle:'rgba(0, 128, 0, 0.4)', lineWidth:3 });
  smoothie2.addTimeSeries(line6,{ strokeStyle:'#2020ff', fillStyle:'rgba(0, 0, 128, 0.4)', lineWidth:3 });

  smoothie2.streamTo(document.getElementById("mycanvas_2"));

var smoothie3 = new SmoothieChart(
    {
      millisPerPixel:2500,
      minValue:0,
      interpolation:'linear',  //optional 
      grid: { strokeStyle:'rgb(64, 64, 64)', fillStyle:'rgb(10, 10, 10)',
            lineWidth: 1, millisPerLine: 100000, verticalSections: 6, },
      labels: { fillStyle:'rgb(128, 128, 128)' },
      //timestampFormatter:function(){return timestamp;}//this shows real time , not data sample time!!
    }
  );
   setInterval(function() {
    line7.append(new Date().getTime(), irradiance_w_per_m2);

    var newLabel1=document.getElementById("legendred3");
    newLabel1.innerHTML="Irradiance: "+irradiance_w_per_m2+" W/M<sup>2</sup>";

  }, 10000);

  // Data 
  var line7 = new TimeSeries();


 
  // Add to SmoothieChart
  //smoothie.addTimeSeries(line1);
  smoothie3.addTimeSeries(line7,{ strokeStyle:'#ff0000', fillStyle:'rgba(128, 0, 0, 0.4)', lineWidth:3 });
  
  smoothie3.streamTo(document.getElementById("mycanvas_3"));

