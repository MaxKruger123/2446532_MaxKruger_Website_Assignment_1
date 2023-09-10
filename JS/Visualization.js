fetch ("https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=rJrm96uIegrcAokW4gwHWXgSFcvGnVHmrxOonrSf")
.then((r) => r.json())
.then(data => {
    console.log(data); // logs the data file

    const neoData = data.near_earth_objects["2015-09-07"];

    const names = neoData.map((neo) => neo.name);
    const diameter = neoData.map((neo) => neo.estimated_diameter.meters.estimated_diameter_max);

    let cometYear =[
        {x: 2002, y: diameter[0]},
        {x: 2015, y: diameter[1]},
        {x: 2015, y: diameter[2]},
        {x: 2015, y: diameter[3]},
        {x: 2015, y: diameter[4]},
        {x: 2015, y: diameter[5]},
        {x: 2015, y: diameter[6]},
        {x: 2016, y: diameter[7]},
        {x: 2016, y: diameter[8]},
        {x: 2018, y: diameter[9]},
        {x: 2019, y: diameter[10]},
        {x: 2020, y: diameter[11]},
        {x: 2020, y: diameter[12]},

    ]

    console.log(cometYear[8]);

    let margin = 0;
    let topMargin = 460;
    let vizArea = d3.select('#Viz')
    let xScale = d3.scaleLinear().domain([2002, 2020]).range([0, 700]);
    let yScale = d3.scaleLinear().domain([0, 712]).range([500, 0]);

    


    vizArea
    .append('g')
    .attr("transform", `translate( ${margin} , ${460-topMargin} )`)
    .call(d3.axisRight(yScale));
    
    
    vizArea
    .append('g')
    .attr("transform", `translate( ${margin} , 500 )`)
    .call(d3.axisBottom(xScale));

    vizArea
    .selectAll('dots')
    .data(cometYear)
    .enter()
    .append("circle")
    .attr("cx", function(d){
        return xScale(d.x);
    })
    .attr("cy", function(d){
        return yScale(d.y);
    })
    .attr ("r", 5)
    


    console.log(names);
    console.log(diameter);
})
.catch(error => {
    console.error('Cant fetch data', error);
});

