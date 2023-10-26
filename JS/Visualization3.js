fetch("https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=rJrm96uIegrcAokW4gwHWXgSFcvGnVHmrxOonrSf")
    .then((r) => r.json())
    .then(data => {
        const neoData = data.near_earth_objects["2015-09-07"];
        const width = 713;
        const height = 520;

        const svg = d3.select("#Viz3")
            .append("svg")
            .attr("height", height)
            .attr("width", width)
            .append("g")
            .attr("transform", "translate(0,0)");

        const cometSpeed = neoData.map(neo => ({
            x: parseFloat(neo.estimated_diameter.meters.estimated_diameter_max),
            y: parseFloat(neo.close_approach_data[0].relative_velocity.kilometers_per_second)
        }));

        let radiusScale = d3.scaleLinear()
            .domain([d3.min(cometSpeed, d => d.x), d3.max(cometSpeed, d => d.x)])
            .range([10, 80]);

        let simulation = d3.forceSimulation()
            .force("x", d3.forceX(width / 2).strength(0.1))
            .force("y", d3.forceY(height / 2).strength(0.1))
            .force("collide", d3.forceCollide(function (d) {
                return radiusScale(d.x);
            }));

        let circles = svg.selectAll(".comets")
            .data(cometSpeed)
            .enter().append("circle")
            .attr("class", "comets")
            .attr("r", function (d) {
                return radiusScale(d.x);
            })
            .attr("fill", "yellow")
            .on("mouseover", function (d) {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr("fill", "purple");
                let tooltip = d3.select("#tooltip");
                tooltip.transition()
                    .duration(200)
                    .style("opacity", 0.9);
                tooltip.html(`Diameter: ${d.x} meters<br>Speed: ${d.y} km/s`);
                tooltip.style("left", (d3.event.pageX + 10) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr("fill", "yellow");
                let tooltip = d3.select("#tooltip");
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

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
            .on('tick', ticked);

        function ticked() {
            circles
                .attr("cx", function (d) {
                    return d.x;
                })
                .attr("cy", function (d) {
                    return d.y;
                });
        }

        // Add the "Highlight Largest" button
d3.select("#Viz3")
.append("button")
.text("Largest Meteor")
.attr("class", "button") // Apply the "button" class
.on("click", highlightLargest);

// Add the "Highlight Smallest" button
d3.select("#Viz3")
.append("button")
.text("Smallest Meteor")
.attr("class", "button") // Apply the "button" class
.on("click", highlightSmallest);

// Add the "Clear" button
d3.select("#Viz3")
.append("button")
.text("Clear")
.attr("class", "button") // Apply the "button" class
.on("click", clearHighlight);

        function highlightLargest() {
            const largestDiameter = d3.max(cometSpeed, d => d.x);
            const largestBubble = cometSpeed.find(d => d.x === largestDiameter);

            circles
                .filter(d => d === largestBubble)
                .transition()
                .duration(200)
                .attr("fill", "red");
        }

        function highlightSmallest() {
            const smallestDiameter = d3.min(cometSpeed, d => d.x);
            const smallestBubble = cometSpeed.find(d => d.x === smallestDiameter);

            circles
                .filter(d => d === smallestBubble)
                .transition()
                .duration(200)
                .attr("fill", "green");
        }

        function clearHighlight() {
            // Reset the fill color of all bubbles to "yellow"
            circles
                .transition()
                .duration(200)
                .attr("fill", "yellow");
        }
    })
    .catch(error => {
        console.error('Can\'t fetch data', error);
    });
