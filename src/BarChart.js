import React , {Component} from 'react';
import * as d3 from 'd3'

export default class D3Component extends Component {
    constructor(props){
        super(props)
        this.ref = React.createRef();
    }

    componentDidMount(){
      let element = this.ref.current;
      let width = element.getBoundingClientRect().width
      let height = width/1.5
      let MARGIN = { TOP: 10, BOTTOM: 10, LEFT: 10, RIGHT: 10 }
      let buckets = this.props.buckets;
      
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
        .attr("fill", "grey")
        .attr("y", d => y(d[1]))
        .attr("height", d => height - y(d[1]))

      console.log(buckets);
      console.log(rects)
    
    }

    render(){
        return(
          <div ref={this.ref} className="bar-chart">
          </div>
        )
    }
}