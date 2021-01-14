import React , {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import * as d3 from 'd3'

export default class RadarChart extends Component {
    constructor(props){
        super(props)
        this.ref = React.createRef();
    }

    componentDidMount(){
      let element = this.ref.current;
      let MARGIN = { TOP: 40, BOTTOM: 40, LEFT: 40, RIGHT: 40 }
      let width = element.getBoundingClientRect().width - MARGIN.LEFT - MARGIN.RIGHT
      let height = width - MARGIN.TOP - MARGIN.BOTTOM
      let buckets = this.props.buckets;

      let allAxis = Object.keys(buckets),	
        total = allAxis.length,					
        radius = Math.min(width/2, height/2),
        angleSlice = Math.PI * 2 / total,
        levels = 5
      
      //scale
      var rScale = d3.scaleLinear()
        .range([0, radius])
        .domain([0, 1]);
      
      let g = d3.select(element)
        .append("svg")
          .attr("width", width + MARGIN.LEFT + MARGIN.RIGHT)
          .attr("height", height + MARGIN.TOP + MARGIN.BOTTOM)
        .append("g")
                  .attr("transform", `translate(${width/2 + MARGIN.LEFT}, ${height/2 + MARGIN.TOP})`)
                  .attr("class", "bar");

      //axis grid
      let axisGrid = g.append("g")
        .attr("class", "axisWrapper")

      let gridCircles = axisGrid.selectAll(".levels")
        .data(d3.range(1,(levels+1)).reverse())
        .enter()
        .append("circle")
        .attr("class", "gridCircle")
        .attr("r", d => radius/levels*d)
        .style("fill", "none")
        .style("stroke", "#CDCDCD")

      let gridLabels = axisGrid.selectAll(".axisLabel")
        .data(d3.range(1,(levels+1)).reverse())
        .enter()
        .append("text")
        .attr("class", "axisLabel")
        .attr("x", 4)
        .attr("y", d => -d*radius/levels - 6)
        .attr("dy", "0.4em")
        .style("font-size", "10px")
        .attr("fill", "#737373")
        .text(d => d/levels);

      //Axes
      let axis = axisGrid.selectAll(".axis")
        .data(allAxis)
        .enter()
        .append("g")
          .attr("class", "axis")
            .append("line")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", (d, i) => rScale(1.1) * Math.cos(angleSlice*i - Math.PI/2))
            .attr("y2", (d, i) => rScale(1.1) * Math.sin(angleSlice*i - Math.PI/2))
            .attr("class", "line")
            .style("stroke", "#CDCDCD")
            .style("stroke-width", "0.5px");

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