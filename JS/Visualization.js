fetch("https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=rJrm96uIegrcAokW4gwHWXgSFcvGnVHmrxOonrSf")
    .then((r) => r.json())
    .then(data => {
        console.log(data); // logs the data file

        const neoData = data.near_earth_objects["2015-09-07"];
        const diameter = neoData.map((neo) => neo.estimated_diameter.meters.estimated_diameter_max);

        let cometYear = [
            { x: 2002, y: diameter[0] },
            { x: 2015, y: diameter[1] },
            { x: 2015, y: diameter[2] },
            { x: 2015, y: diameter[3] },
            { x: 2015, y: diameter[4] },
            { x: 2015, y: diameter[5] },
            { x: 2015, y: diameter[6] },
            { x: 2016, y: diameter[7] },
            { x: 2016, y: diameter[8] },
            { x: 2018, y: diameter[9] },
            { x: 2019, y: diameter[10] },
            { x: 2020, y: diameter[11] },
            { x: 2020, y: diameter[12] },
        ];

        // Sort the cometYear array by year (x property) in ascending order
        cometYear.sort((a, b) => a.x - b.x);

        const width = 800;
        const height = 400;
        const margin = { top: 50, bottom: 50, left: 50, right: 50 };

        const svg = d3.select('#Viz')
            .append('svg')
            .attr('height', height + margin.top + margin.bottom)
            .attr('width', width + margin.left + margin.right);

        const x = d3.scaleBand()
            .domain(cometYear.map(d => d.x))
            .range([margin.left, width + margin.left])
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([0, d3.max(cometYear, d => d.y)])
            .range([height - margin.bottom, margin.top]);

        svg
            .append('g')
            .attr('fill', 'yellow')
            .selectAll('rect')
            .data(cometYear)
            .join('rect')
            .attr('x', (d) => x(d.x))
            .attr('y', (d) => y(d.y))
            .attr('height', (d) => y(0) - y(d.y))
            .attr('width', x.bandwidth());

        function xAxis(g) {
            g.attr('transform', `translate(0, ${height - margin.bottom})`)
                .call(d3.axisBottom(x).tickFormat(d3.format("d"))); 
        }

        function yAxis(g){
            g.attr('transform', `translate(${margin.left}, 0)`)
                .call(d3.axisLeft(y).tickFormat(d3.format("d"))); 
        }
            
        svg.append('g').call(yAxis);
        svg.append('g').call(xAxis);

        // Add x-axis title
        svg.append('text')
            .attr('x', width / 2 + margin.left-80)
            .attr('y', height + margin.top-40)
            .style('text-anchor', 'middle')
            .style('fill', 'white')
            .text('Year');

        // Add y-axis title
        svg.append('text')
            .attr('transform', `translate(${margin.left - 40}, ${height / 2 + margin.top-50}) rotate(-90)`)
            .style('text-anchor', 'middle')
            .style('fill', 'white')
            .text('Diameter (m)');

        svg.node();
    });
