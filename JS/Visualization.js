 // Fetch data from the API
 fetch('https://api.nasa.gov/insight_weather/?api_key=rJrm96uIegrcAokW4gwHWXgSFcvGnVHmrxOonrSf&feedtype=json&ver=1.0')
 .then(response => response.json())
 .then(data => {
     // Extract sol (day) and temperature data
     const solData = data.sol_keys;
     const tempData = solData.map(sol => data[sol].AT.av); // AT.av is the average temperature

     const areNumerical = tempData.every(value => !isNaN(value));

     // Create the scatter plot
     const margin = { top: 20, right: 20, bottom: 30, left: 40 };
     const width = 400 - margin.left - margin.right;
     const height = 300 - margin.top - margin.bottom;

     const svg = d3.select("#chart")
         .append("svg")
         .attr("width", width + margin.left + margin.right)
         .attr("height", height + margin.top + margin.bottom)
         .append("g")
         .attr("transform", `translate(${margin.left},${margin.top})`);

     // Define scales for X and Y axes
     const x = d3.scaleLinear()
         .domain([0, solData.length - 1])
         .range([0, width]);

     const y = d3.scaleLinear()
         .domain([Math.min(...tempData), Math.max(...tempData)])
         .range([height, 0]);

     // Create X and Y axes
     svg.append("g")
         .attr("class", "x-axis")
         .attr("transform", `translate(0,${height})`)
         .call(d3.axisBottom(x));

     svg.append("g")
         .attr("class", "y-axis")
         .call(d3.axisLeft(y));

     // Create circles for the scatter plot
     svg.selectAll("circle")
         .data(tempData)
         .enter()
         .append("circle")
         .attr("cx", (d, i) => x(i))
         .attr("cy", d => y(d))
         .attr("r", 5); // Radius of circles

         // Create Y axis with labels


 })
