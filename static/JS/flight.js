
function buildCharts (Sample){
  // render data from API/Flask App
    d3.json("/data").then((data) => {
        console.log(data);

        // coverting object to array

        let carriercarName = Object.values(data.carrier_name);
        let carriercarName_uniq =_.uniq(carriercarName);
        let airportName = Object.values(data.airport);
        let airportName_uniq =_.uniq(airportName);
        let totalDelay = Object.values(data.arr_del15);
        let carrierCT = Object.values(data.carrier_ct);
        let WeatherCT = Object.values(data.weather_ct);
        let heavyAirDelay = Object.values(data.nas_ct)
        let securityDelay = Object.values(data.security_ct)
        let lateAircraftDelay = Object.values(data.late_aircraft_ct)
        let season = Object.values(data.month)
        

        // filter data based on the first selection for dropdown menu
        let filteredairport=[];
        let filteredtotalDelay=[];
        let filteredcarrierCT=[];
        let filteredWeatherCT=[];
        let filteredheavyAirDelay=[];
        let filteredsecurityDelay=[];
        let filteredlateAircraftDelay=[];
        let filteredseason=[];
        
        for (let i = 0; i < carriercarName.length; i++) {

            if (carriercarName[i] == Sample){
                filteredairport.push(airportName[i])
                filteredtotalDelay.push(totalDelay[i])
                filteredcarrierCT.push(carrierCT[i])
                filteredWeatherCT.push(WeatherCT[i])
                filteredheavyAirDelay.push(heavyAirDelay[i])
                filteredsecurityDelay.push(securityDelay[i])
                filteredlateAircraftDelay.push(lateAircraftDelay[i])
                filteredseason.push(season[i])
            }

        }
   
// *****************************************************************
// *****************************************************************
// Bar Chart Based on airport and total delay on selected airline
// *****************************************************************
// *****************************************************************
        let filteredairport_uniq =_.uniq(filteredairport);
       
        carrierDelay_sum = []
        let Sum_delay = 0;
        filteredairport_uniq.forEach(element => {
         Sum_delay = 0
    
              for (let i = 0; i < filteredairport.length; i++) {
                if (filteredairport[i] == element ) {
                    Sum_delay += filteredcarrierCT[i]
                    }
              }
              
    
         carrierDelay_sum.push(Sum_delay)
    
         });
        
         console.log(carrierDelay_sum);

               
     let trace1 = {
        x: filteredairport_uniq ,
        y: carrierDelay_sum,
        
        name: "",
        type: "bar",
        };
        // Data array
        // `data` has already been defined, so we must choose a new name here:
        let traceData = [trace1];
        // Apply a title to the layout
        let layout1 = {
        title: "Airport sum Delay based on Carrier Delay for the selected Airline(3/2022-3/2023)",
        margin: {
        l: 50,
        r: 50,
        t: 100,
        b: 100
        }
        };
      
        Plotly.newPlot("bar", traceData, layout1);



// ****************************************************************************
// ****************************************************************************
        // pie Chart based on selected airline for different cause pf delays

// ****************************************************************************
// ****************************************************************************


      var data = [{
        type: "pie",
        values: [mean(filteredcarrierCT),mean(filteredWeatherCT),mean(filteredheavyAirDelay),mean(filteredsecurityDelay),mean(filteredlateAircraftDelay)],
        labels: ["Carrier Delay", "weather Delay ", "Heavy Air Traffic Delay ", "Security Delay", "Late Aircraft Delay"],
        textinfo: "label+percent",
        textposition: "outside",
        automargin: true
      }]
      
       var layout = {
        height: 700,
        width: 500,
        margin: {"t": 0, "b": 0, "l": 0, "r": 0},
        title: "Cause Of Delays On Selected Airport(3/2022-3/2023)",
        showlegend: true
        }
      
      Plotly.newPlot('pie', data, layout)



    function mean(arr) {
        let total = 0;
        for (let i = 0; i < arr.length; i++) {
            total += arr[i];
        }
        let meanValue = total / arr.length;
        return meanValue;
        }

// **********************************************************************
// **********************************************************************
        // bar chart based on season and total delay on selected Airline

// **********************************************************************
// **********************************************************************
        let filteredseason_uniq =(_.uniq(filteredseason)).sort((a, b) => a - b)
        console.log(filteredseason_uniq);



        totalDelay_sum = []
        let Sum_delaytotal = 0;
        filteredseason_uniq.forEach(element => {
         Sum_delaytotal = 0
    
              for (let i = 0; i < filteredseason.length; i++) {
                if (filteredseason[i] == element ) {
                    Sum_delaytotal += filteredtotalDelay[i]
                    }
              }
              
    
         totalDelay_sum.push(Sum_delaytotal)
    
         });
        
      

               
     let trace2 = {
      
        x: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        y: totalDelay_sum,
        
        name: "",
        type: "bar",
        };
        // Data array
        // `data` has already been defined, so we must choose a new name here:
        let traceData2 = [trace2];
        // Apply a title to the layout
        let layout2 = {
        title: "Delay based on Season (3/2022-3/2023)",
        margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
        }
        };
      
        Plotly.newPlot("bar1", traceData2, layout2);

});


}


// create function for dropdown menu

function init() {
    // Grab a reference to the dropdown select element
    let dropdownMenu = d3.select("#selDataset");
    
    // build the dropdown menu


    d3.json("/data").then((data) => {
        console.log(data);
        let carriercarName = Object.values(data.carrier_name);
        let carriercarName_uniq =_.uniq(carriercarName);

     
        carriercarName_uniq.forEach((sample) => {
           dropdownMenu
          .append("option")
          .text(sample)
          .property("value", sample);
      });

      // Use the first sample from the list to build the initial plots
      const firstSample = carriercarName_uniq[0];
      buildCharts(firstSample);
    //   buildMetadata(firstSample);
    
});
}

function optionChanged(newSample) {
// Fetch new data each time a new sample is selected
buildCharts(newSample);
}


init();

