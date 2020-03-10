import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import * as d3 from "d3";
import "./D3Test2small.scss";
import { withRouter } from "react-router-dom";

// import data from "./Dataset1";
// import data2 from "./Dataset2";
// import data from "./Dataset3";
// import data from "./Dataset4";

// import * as data2 from './Dataset2'

class D3Test2 extends Component {
  constructor(props) {
    super(props);
    this.goDetail = this.goDetail.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    var chart = d3.select("#chart");
    chart.selectAll("*").remove();
  }

  goDetail(d) {
    let url = `/detail/${d.data._id}`;
    return this.props.history.push(url);
    // return <Route render={() => <Redirect to={url} />} />;
  }

  render() {
    let data = this.props.data;
    var width = 80, // % of the parent element
      height = 80,
      x = d3
        .scaleLinear()
        .domain([0, width])
        .range([0, width]),
      y = d3
        .scaleLinear()
        .domain([0, height])
        .range([0, height]),
      color =  d3.rgb
      // d3.scaleOrdinal().range(
      //   // d3.schemeGreys.map(function(c) {
      //   d3.schemeSet1.map(function(c) {
      //     // d3.schemeSet1.map(function(c) {
      //     c = d3.rgb(c);
      //     //c.opacity = 0.5;
      //     return c;
      //   })
      // )
      ,
      treemap = d3
        .treemap()
        .size([width, height])
        //.tile(d3.treemapResquarify) // doesn't work - height & width is 100%
        .paddingInner(0)
        .round(false), //true
      nodes = d3.hierarchy(data).sum(function(d) {
        return d.value ? 1 : 0;
      }),
      //.sort(function(a, b) { return b.height - a.height || b.value - a.value });

      currentDepth;

    treemap(nodes)
    ;

    var chart = d3.select("#chart");
    var cells = chart
    .selectAll(".node")
    .data(nodes.descendants())
    .enter()
    .append("div")
    
    .attr("class", function(d) {
      return "node-small level-small-" + d.depth;
    })
    .attr("title", function(d) {
      return d.data.name ? d.data.name : "null";
    })
    .attr("transform", "translate(90 90)")
    
    ;
    
    cells
    .attr("transform", "translate(90 90)")
    .style("left", function(d) {
      return x(d.x0) + "%";
      })
      .style("top", function(d) {
        return y(d.y0) + "%";
      })
      .style("width", function(d) {
        return x(d.x1) - x(d.x0) + "%";
      })
      .style("height", function(d) {
        return y(d.y1) - y(d.y0) + "%";
      })
      //.style("background-image", function(d) { return d.value ? imgUrl + d.value : ""; })
      .style("background-image", function(d) {
        return d.value ? `url(${d.data.value})` : "none";
      })


      // .style("background-image", function(d) { return d.value ? "url(http://placekitten.com/g/300/300)" : "none"; })
      .style("background-color", function(d) {
        while (d.depth > 2) d = d.parent;
        return color(d.data.name);
      })
      .on("click", zoom)
      .append("p")
      .attr("class", "label")
      .text(function(d) {
        return d.data.name ? d.data.name : "---";
      });

    cells // show this depth + 1 and below
    .filter(function(d) {
      return d.depth >= 5;
    })
    
    .append("button")
    .attr("class", "button-detail")
    .on("click", this.goDetail)
    .style("border", "50px solid #FFFFFF");
    
    var parent = d3
    .select(".up")
    .datum(nodes)
    .on("click", zoom);
    function zoom(d) {
      // http://jsfiddle.net/ramnathv/amszcymq/
      
      // console.log("clicked: " + d.data.name + ", depth: " + d.depth);
      
      currentDepth = d.depth;
      
      parent.datum(d.parent || nodes);
      
      x.domain([d.x0, d.x1]);
      y.domain([d.y0, d.y1]);
      
      var t = d3
      .transition()
      // .duration(Math.floor(Math.random() * 2200) + 1200)
        .duration(1200)

        .ease(d3.easeCubicOut);

      cells
        .transition(t)
        .style("left", function(d) {
          return x(d.x0) + "%";
        })
        .style("top", function(d) {
          return y(d.y0) + "%";
        })
        .style("width", function(d) {
          return x(d.x1) - x(d.x0) + "%";
        })
        .style("height", function(d) {
          return y(d.y1) - y(d.y0) + "%";
        });

      cells // hide this depth and above
        .filter(function(d) {
          return d.ancestors();
        })
        .classed("hide", function(d) {
          return d.children ? true : false;
        });

      cells // show this depth + 1 and below
        .filter(function(d) {
          return d.depth > currentDepth;
        })
        .classed("hide", false);
    }

    return (
      <div className="father-small">
        <nav className="nav-bar-d3-small">
          <div className="up-small">mnemosine</div>
        </nav>
        <div className="feature-small" id="chart-small"></div>
      </div>
    );
  }
}
export default withRouter(D3Test2);
