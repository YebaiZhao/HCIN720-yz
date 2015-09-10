  .done(function(data){
    if(console&&console.log){
      console.log(data.slice(0,5));
      //Rec_data=$.parseJSON(data);
      console.log(data.length);//works
      console.info(data[1].timestamp);//works
      );
      }
    }
  }
 );



  var chart = new SmoothieChart(
    {millisPerPixel:100,
      interpolation:'linear',
      grid:{millisPerLine:6000}}),
    canvas = document.getElementById('smoothie-chart'),
    series = new TimeSeries();

chart.addTimeSeries(series, {lineWidth:2,strokeStyle:'#00ff00'});
chart.streamTo(canvas, 500);