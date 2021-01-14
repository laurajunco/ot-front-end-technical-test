import React , {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import * as d3 from 'd3'

export default class BarChart extends Component {
    constructor(props){
        super(props)
        this.ref = React.createRef();
    }

    componentDidMount(){
      let element = this.ref.current;
      let MARGIN = { TOP: 5, BOTTOM: 110, LEFT: 60, RIGHT: 30 }
      let width = element.getBoundingClientRect().width - MARGIN.LEFT - MARGIN.RIGHT
      let height = width - MARGIN.TOP - MARGIN.BOTTOM
      let buckets = this.props.buckets;
      let vis = {}

      vis.g = d3.select(element)
        .append("svg")
          .attr("width", width + MARGIN.LEFT + MARGIN.RIGHT)
          .attr("height", height + MARGIN.TOP + MARGIN.BOTTOM)
        .append("g")
                  .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)
                  .attr("class", "bar");

      // //scales
      let y = d3.scaleLinear()
        .range([height, 0])
        .domain([0,1])

      let x = d3.scaleBand()
        .range([0, width])
        .domain(Object.keys(buckets))
        .padding(0.2);

      //axis
      let xAxisCall = d3.axisBottom(x);
      let yAxisCall = d3.axisLeft(y)
        .ticks(5)
        .tickSize(-width, 0, 0)

      vis.xAxisGroup = vis.g.append("g")
        .attr("transform", `translate(0, ${height})`)
        .attr("class", "xAxis")
        .call(xAxisCall)
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .attr("y", 10)
        .style("text-anchor", "end");

      vis.yAxisGroup = vis.g.append("g")
        .attr("class", "yAxis")
        .call(yAxisCall)
       
      //rects
      vis.rects = vis.g.selectAll("rect")
        .data(Object.entries(buckets))
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d[0]))
        .attr("width", x.bandwidth)
        .attr("y", d => y(d[1]))
        .attr("height", d => height - y(d[1]))

      //labels
      vis.labelY = vis.g.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -40)
        .attr("x", 0 - (height / 2))
        .attr("dy", "0.5rem")
        .attr("class", "axis-label")
        .style("text-anchor", "middle")
        .text("Score");  

      vis.labelX = vis.g.append("text")
        .attr("y", height + MARGIN.BOTTOM - 25)
        .attr("x", (width / 2))
        .attr("dy", "0.5rem")
        .attr("class", "axis-label")
        .style("text-anchor", "middle")
        .text("Data Type");  
    }

    render(){
        return(
          <>
          <Typography variant="body1" align="center" className="graph-title" >
            Association score vs Data Type
          </Typography>
          <div ref={this.ref} className="bar-chart">
          </div>
          </>
        )
    }
}