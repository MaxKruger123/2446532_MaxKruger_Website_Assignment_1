fetch("https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=rJrm96uIegrcAokW4gwHWXgSFcvGnVHmrxOonrSf")
    .then((r) => r.json())
    .then(data => {

        const neoData = data.near_earth_objects["2015-09-07"];
        const names = neoData.map((neo) => neo.name);
        const diameter = neoData.map((neo) => neo.estimated_diameter.meters.estimated_diameter_max);
        const speed = neoData.map((neo) => neo.close_approach_data[0].relative_velocity.kilometers_per_second);

        const width = 713;
        const height = 520;

        const svg = d3.select("#Viz3")
            .append("svg")
            .attr("height", height)
            .attr("width", width)
            .append("g")
            .attr("transform", "translate(0,0)")

            
        

        // Initialize the circles at the center
        const cometSpeed = neoData.map(neo => ({
            x: parseFloat(neo.estimated_diameter.meters.estimated_diameter_max), // Parse as a number
            y: parseFloat(neo.close_approach_data[0].relative_velocity.kilometers_per_second) // Parse as a number
        }));

        console.log("Min diameter:", d3.min(cometSpeed, d => d.x));
            console.log("Max diameter:", d3.max(cometSpeed, d => d.x));

            let radiusScale = d3.scaleLinear()
            .domain([d3.min(cometSpeed, d => d.x), d3.max(cometSpeed, d => d.x)])
            .range([10, 80]);

        let simulation = d3.forceSimulation()
            .force("x", d3.forceX(width / 2).strength(0.1))
            .force("y", d3.forceY(height / 2).strength(0.1))
            .force("collide", d3.forceCollide(function (d) {
                return radiusScale(d.x)
            }))

        let circles = svg.selectAll(".comets")
            .data(cometSpeed)
            .enter().append("circle")
            .attr("class", "comets")
            .attr("r", function (d) {
                return radiusScale(d.x);
            })
            .attr("fill", "yellow")
            .on("mouseover", function (d) {
                // Smoothly transition to a different color on mouseover
                d3.select(this)
                    .transition()
                    .duration(200) // Duration of the transition in milliseconds
                    .attr("fill", "purple"); // New color on hover
                // Show tooltip on mouseover
                let tooltip = d3.select("#tooltip");
                tooltip.transition()
                    .duration(200)
                    .style("opacity", 0.9);
                tooltip.html(`Diameter: ${d.x} meters<br>Speed: ${d.y} km/s`);
                tooltip.style("left", (d3.event.pageX + 10) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                // Smoothly transition back to the original color on mouseout
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr("fill", "yellow"); // Original color on mouseout
                // Hide tooltip on mouseout
                let tooltip = d3.select("#tooltip");
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        // Create the tooltip element
        let tooltip = d3.select("body")
            .append("div")
            .attr("id", "tooltip")
            .style("position", "absolute")
            .style("background-color", "white")
            .style("border", "1px solid #ccc")
            .style("padding", "10px")
            .style("border-radius", "5px")
            .style("box-shadow", "2px 2px 5px #888")
            .style("opacity", 0);

        simulation.nodes(cometSpeed)
            .on('tick', ticked)

        function ticked() {
            circles
                .attr("cx", function (d) {
                    return d.x
                })
                .attr("cy", function (d) {
                    return d.y
                })
        }

    })
    .catch(error => {
        console.error('Can\'t fetch data', error);
    });
