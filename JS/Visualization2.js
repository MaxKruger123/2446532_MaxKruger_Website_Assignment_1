fetch ("https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=rJrm96uIegrcAokW4gwHWXgSFcvGnVHmrxOonrSf")
.then((r) => r.json())
.then(data => {
    

    const neoData = data.near_earth_objects["2015-09-07"];

    const names = neoData.map((neo) => neo.name);
    const diameter = neoData.map((neo) => neo.estimated_diameter.meters.estimated_diameter_max);

    const speed = neoData.map((neo) => neo.close_approach_data[0].relative_velocity.kilometers_per_second);

    console.log(speed);

    let cometSpeed =[
        {x:diameter[0], y: speed[0]},
        {x:diameter[1], y: speed[1]},
        {x:diameter[2], y: speed[2]},
        {x:diameter[3], y: speed[3]},
        {x:diameter[4], y: speed[4]},
        {x:diameter[5], y: speed[5]},
        {x:diameter[6], y: speed[6]},
        {x:diameter[7], y: speed[7]},
        {x:diameter[8], y: speed[8]},
        {x:diameter[9], y: speed[9]},
        {x:diameter[10], y: speed[10]},
        {x:diameter[11], y: speed[11]},
        {x:diameter[12], y: speed[12]}

        

    ]

    console.log(cometSpeed[8]);

    let margin = 0;
    let topMargin = 460;
    let vizArea = d3.select('#Viz2')
    let yScale = d3.scaleLinear().domain([0, 40]).range([500, 0]);
    let xScale = d3.scaleLinear().domain([0, 712]).range([0, 700]);

    


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
    .data(cometSpeed)
    .enter()
    .append("circle")
    .attr("cx", function(d){
        return xScale(d.x);
    })
    .attr("cy", function(d){
        return yScale(d.y);
    })
    .attr ("r", 5)
    


    
})
.catch(error => {
    console.error('Cant fetch data', error);
});
