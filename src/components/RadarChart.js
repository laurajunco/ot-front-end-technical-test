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
      let MARGIN = { TOP: 60, BOTTOM: 50, LEFT: 50, RIGHT: 50 }
      let width = element.getBoundingClientRect().width - MARGIN.LEFT - MARGIN.RIGHT
      let height = width - MARGIN.TOP - MARGIN.BOTTOM
      let buckets = this.props.buckets;
      let vis = {};
      let allAxis = Object.keys(buckets);
      let total = allAxis.length;
      let radius = Math.min(width/2, height/2);
      let angleSlice = Math.PI * 2 / total;
      let levels = 5
 
      //scale
      let rScale = d3.scaleLinear()
        .range([0, radius])
        .domain([0, 1]);
      
      vis.g = d3.select(element)
        .append("svg")
          .attr("width", width + MARGIN.LEFT + MARGIN.RIGHT)
          .attr("height", height + MARGIN.TOP + MARGIN.BOTTOM)
        .append("g")
                  .attr("transform", `translate(${width/2 + MARGIN.LEFT}, ${height/2 + MARGIN.TOP})`)
                  .attr("class", "bar");

      //Radar Grid
      vis.radarGrid = vis.g.append("g")
 
      vis.gridCircles = vis.radarGrid.selectAll(".gridCircle")
        .data(d3.range(1,(levels+1)).reverse())
        .enter()
        .append("circle")
        .attr("class", "gridCircle")
        .attr("r", d => radius/levels*d)

      vis.gridLabels = vis.radarGrid.selectAll(".gridLabel")
        .data(d3.range(1,(levels+1)).reverse())
        .enter()
        .append("text")
        .attr("class", "gridLabel")
        .attr("x", 4)
        .attr("dy", "0.4em")
        .attr("y", d => -d*radius/levels - 6)
        .text(d => d/levels);

      //Axes
      vis.axis = vis.radarGrid.selectAll(".axis")
        .data(allAxis)
        .enter()
        .append("g")
          .attr("class", "axis")
      
      //Axes lines
      vis.axisLine = vis.axis.append("axisLine")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", (d, i) => rScale(1.1) * Math.cos(angleSlice*i - Math.PI/2))
            .attr("y2", (d, i) => rScale(1.1) * Math.sin(angleSlice*i - Math.PI/2))
            .attr("class", "axisLine")
      
      //Axes labels
      vis.axisLabel = vis.axis.append("text")
        .attr("class", "legend")
        .attr("dy", "0.35em")
        .attr("x", (d, i) => rScale(1.45) * Math.cos(angleSlice*i - Math.PI/2))
        .attr("y", (d, i) => rScale(1.45) * Math.sin(angleSlice*i - Math.PI/2))
        .text(d => d)


      var radarLine = d3.areaRadial()
        .curve(d3.curveLinearClosed)
        .radius(d => rScale(d[1]))
        .angle((d,i) => i*angleSlice);

      vis.pathWrapper = vis.g.append("g")
        .attr("class", "pathWrapper");
    
      //path
      vis.pathWrapper.append("path")
        .datum(Object.entries(buckets))
        .attr("class", "radarStroke")
        .attr("d", radarLine
          .innerRadius(rScale(0))
          .outerRadius( d => rScale(d[1])))

      //circles
      vis.pathWrapper.selectAll(".radarCircle")
        .data(Object.entries(buckets))
        .enter()
        .append("circle")
        .attr("class", "radarCircle")
        .attr("r",2.5)
        .attr("cx", (d,i) => rScale(d[1]) * Math.cos(angleSlice*i - Math.PI/2))
        .attr("cy", (d,i) => rScale(d[1]) * Math.sin(angleSlice*i - Math.PI/2))

    }

    render(){
        return(
          <>
          <Typography variant="body1" align="center" className="graph-title" >
            Association score vs Data Type
          </Typography>
          <div ref={this.ref} className="radar-chart">
          </div>
          </>
        )
    }
}