import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import * as d3 from "d3";
import "./D3Test2.scss";
import { withRouter } from "react-router-dom";
import $ from "jquery";
import "./BackgroundLoader.js";

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
    var width = 100, // % of the parent element
      height = 100,
      x = d3
        .scaleLinear()
        .domain([0, width])
        .range([0, width]),
      y = d3
        .scaleLinear()
        .domain([0, height])
        .range([0, height]),
      color = d3.rgb,

      treemap = d3
        .treemap()
        .size([width, height])
        .paddingInner(0)
        .round(false), //true
      nodes = d3.hierarchy(data).sum(function(d) {
        return d.value ? 1 : 0
      })
      // .sort(function(a, b) { return b.height - a.height || b.value - a.value })
      ,

      currentDepth;

    treemap(nodes);

    var chart = d3.select("#chart");
    var cells = chart
      .selectAll(".node")
      .data(nodes.descendants())
      .enter()
      .append("div")
      .attr("class", function(d) {
        return "node level-" + d.depth;
      })
      .attr("title", function(d) {
        return d.data.name ? d.data.name : "null";
      });

    cells
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
      .style("background-image", function(d) {
        return d.value ? `url(${d.data.value})` : "none";
      })

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
      // .text("")
      .html("&#65291;")
      .attr("class", "button-detail")
      .on("click", this.goDetail);

    var parent = d3
      .select(".up")
      .datum(nodes)
      .on("click", zoom);
    function zoom(d) {
      // http://jsfiddle.net/ramnathv/amszcymq/

      currentDepth = d.depth;
      var button = d3
        .select(".up")
        .text(currentDepth <= 0 ? "nested by museum" : currentDepth <= 1 ? "zoom out - nested by time" : currentDepth <= 2 ? "zoom out - nested by origin" : currentDepth <= 3 ? "zoom out - nested by author" : "zoom out - single piece" );

      parent.datum(d.parent || nodes);

      x.domain([d.x0, d.x1]);
      y.domain([d.y0, d.y1]);

      var t = d3
        .transition()
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
    let loadedCount = 0;

    return (
      <div className="father">
        <nav className="nav-bar-d3">
          <div className="up">nested by museum</div>
        </nav>
        <div className="feature" id="chart"></div>
      </div>
    );
  }
}
export default withRouter(D3Test2);
