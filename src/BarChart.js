import React , {Component} from 'react';
import * as d3 from 'd3'

export default class D3Component extends Component {
    constructor(props){
        super(props)
        this.ref = React.createRef();
    }

    componentDidMount(){
      let element = this.ref.current;
      let MARGIN = { TOP: 30, BOTTOM: 50, LEFT: 50, RIGHT: 30 }
      let width = element.getBoundingClientRect().width - MARGIN.LEFT - MARGIN.RIGHT
      let height = width - MARGIN.TOP - MARGIN.BOTTOM
      let buckets = this.props.buckets;

      console.log(buckets);
      
      let g = d3.select(element)
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

      //rects
      let rects = g.selectAll("rect")
        .data(Object.entries(this.props.buckets))
        .enter()
        .append("rect")
        .attr("x", d => x(d[0]))
        .attr("width", x.bandwidth)
        .attr("fill", "#3f51b5")
        .attr("y", d => y(d[1]))
        .attr("height", d => height - y(d[1]))

      //axis
      let xAxisCall = d3.axisBottom(x);
      let yAxisCall = d3.axisLeft(y);

      let xAxisGroup = g.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxisCall); 

      let yAxisGroup = g.append("g")
        .call(yAxisCall)

    }

    render(){
        return(
          <div ref={this.ref} className="bar-chart">
          </div>
        )
    }
}