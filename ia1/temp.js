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