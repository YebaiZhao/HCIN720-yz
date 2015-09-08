//var date=new Date();
//var current_Date=date.getMonth()+"-"+date.getDate()+"-"+date.getFullYear();
//var public_key_filter = "?gte[timestamp]="+"09-07-2015";
var public_key = 'RM1xmbzxarFlR7b065jV';
var API_Url= 'https://data.sparkfun.com/output/' + public_key +'.json';
//var $ = require("jquery");/
var Rec_data;
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
 })
  .done(function(data){
    if(console&&console.log){
      console.log(data.slice(0,10));
      //Rec_data=$.parseJSON(data);
      console.log(data.length);//works
      console.info(data[1].timestamp);//works
      for(i=0;i<data.length;i++){

        var path =new Path.Circle({
          center: [data[i].pv_power_watts,i*10],
          radius: 5,
          fillColor: "white"
        });
      }
    }
  }
 );

//console.log(Rec_data);