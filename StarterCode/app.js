// Read in samples.json

function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        var filteredData = metadata.filter(sampleobject => sampleobject.id == sample);
        var Data = filteredData[0];
        var meta_panel = d3.select("#sample-metadata");
        meta_panel.html("");
        Object.entries(Data).forEach(([key, value]) => {
            meta_panel.append("h6").text(`${key}: ${value}`);
            console.log(key, value);
              });
        });
      }
      function buildCharts(sample) {
        d3.json("samples.json").then((data) => {
          var samples = data.samples;
          var filteredData = samples.filter(sampleobject => sampleobject.id == sample);
          var Data = filteredData[0];
          // Plots
          var ids = Data.otu_ids;
          var labels = Data.otu_labels;
          var values = Data.sample_values;
          console.log(ids, labels, values);
      
          //Bar charts
          var barData = [{
            y: ids.slice(0, 5).map(otuID => `OTU ${otuID}`).reverse(),
            x: values.slice(0, 5).reverse(),
            text: labels.slice(0, 5).reverse(),
            //y: ids,
            //x: values,
            //text: labels,
            type: "bar",
            orientation: "h"
          }];
          //Bar chart's layout
          var barlayout = {
            title: "Top 10 OTUs found in that individual",
            margin: { t: 50, l: 200}
          };
          // Plot the chart
          Plotly.newPlot("bar", barData, barlayout);
      
          // Build Bubble chart
          var bubbleData = [{
            x: ids,
            y: values,
            text: labels,
            mode: "markers",
            marker: {
              color: ids,
              size: values,
            }
          }];
          
          var bubblelayout = {
            margin: { t: 0 },
            xaxis: { title: "OTU ID"},
            hovermode: "closest",
          }
      
          Plotly.newPlot("bubble", bubbleData, bubblelayout);
          });
      }
      
      function init() {
          // Grab a reference to the dropdown select element
          var selector = d3.select("#selDataset");
        
          // Use the list of sample names to populate the select options
          d3.json("samples.json").then((data) => {
            var sampleNames = data.names;
            sampleNames.forEach((sample) => {
              selector
                .append("option")
                .text(sample)
                .property("value", sample);
            });
        
            // Build intitial plots
            const firstSample = sampleNames[0];
            buildCharts(firstSample);
            buildMetadata(firstSample);
          });
        }
        
        function optionChanged(newSample) {
          // Fetch new data each time a new sample is selected
          buildCharts(newSample);
          buildMetadata(newSample);
        }
        
        // Initialize the dashboard
        init();function buildCharts(sample) {
  d3.json("samples.json").then((data) => {
    var samples = data.samples;
    var filteredData = samples.filter(sampleobject => sampleobject.id == sample);
    var Data = filteredData[0];
    });
  }
  
  // Initialize the dashboard
  init();