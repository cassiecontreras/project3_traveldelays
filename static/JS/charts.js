
// bar chart based on airline and carrier delay

d3.json("/data").then((data) => {
    console.log(data);
    let carrierName = Object.values(data.carrier_name)
    let carrierDelay = Object.values(data.carrier_ct)
    let carrierName_uniq =_.uniq(carrierName)
    console.log(carrierName);
    console.log(carrierName_uniq)

    carrierDelay_sum = []
        let Sum_delay = 0;
        carrierName_uniq.forEach(element1 => {
         Sum_delay = 0
    
              for (let i = 0; i < carrierName.length; i++) {
                if (carrierName[i] == element1 ) {
                    Sum_delay += carrierDelay[i]
                    }
              }
              
    
         carrierDelay_sum.push(Sum_delay)
    
         });
        
         console.log(carrierDelay_sum);


         
 let trace1 = {
        x: carrierName_uniq ,
        y: carrierDelay_sum,
        
        name: "",
        type: "bar",
        };
        // Data array
        // `data` has already been defined, so we must choose a new name here:
        let traceData = [trace1];
        // Apply a title to the layout
        let layout = {
        title: "Airline Delay based on Carrier Delay",
        margin: {
        l: 50,
        r: 50,
        t: 100,
        b: 100
        }
        };
      
        Plotly.newPlot("bar1", traceData, layout);

});
// }





// ****************************************************************************

// bar chart based on season and airline

d3.json("/data").then((data) => {
    // let data = data.filter(item => item !== null)
    
    let season = Object.values(data.month)
    let arrDelay = Object.values(data.arr_del15)
    let season_uniq = (_.uniq(season)).sort((a, b) => a - b)

    console.log(season_uniq)

    arrDelay_sum = []
        let Sum_delay = 0;
        season_uniq.forEach(element1 => {
         Sum_delay = 0
    
              for (let i = 0; i < season.length; i++) {
                if (season[i] == element1 ) {
                    Sum_delay += arrDelay[i]
                    }
              }
              
    
         arrDelay_sum.push(Sum_delay)
    
         });


          


         
 let trace1 = {
        x: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        y: arrDelay_sum,
        type: "bar", 
        };
        // Data array
        // `data` has already been defined, so we must choose a new name here:
        let traceData = [trace1];
        // Apply a title to the layout
        let layout = {
        title: "Airline Delay based on season (3/2022- 3/2023)",
        margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
        }
        };
      
        Plotly.newPlot("bar2", traceData, layout);

});

// *************************************************
// *************************************************
// pie chart 

d3.json("/data").then((data) => {
    let carrierDelay = Object.values(data.carrier_ct)
    let weatherDelay = Object.values(data.weather_ct)
    let heavyAirDelay = Object.values(data.nas_ct)
    let securityDelay = Object.values(data.security_ct)
    let lateAircraftDelay = Object.values(data.late_aircraft_ct)
    console.log(heavyAirDelay)


    var data = [{
        type: "pie",
        values: [mean(carrierDelay),mean(weatherDelay),mean(heavyAirDelay),mean(securityDelay),mean(lateAircraftDelay)],
        labels: ["Carrier Delay", "weather Delay ", "Heavy Air Traffic Delay ", "Security Delay", "Late Aircraft Delay"],
        textinfo: "label+percent",
        textposition: "outside",
        automargin: true
      }]
      
      var layout = {
        height: 500,
        width: 450,
        margin: {"t": 0, "b": 0, "l": 0, "r": 0},
        title: "Cause Of Delays (3/2022-3/2023)",
        showlegend: true
        }
      
      Plotly.newPlot('pie1', data, layout)



    function mean(arr) {
        let total = 0;
        for (let i = 0; i < arr.length; i++) {
            total += arr[i];
        }
        let meanValue = total / arr.length;
        return meanValue;
        }


});




