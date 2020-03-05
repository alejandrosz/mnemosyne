import React, { Component } from "react";
import * as d3 from "d3";
import "./D3Test2.scss";
import data from "./Dataset1";
import data2 from "./Dataset2";
// import * as data2 from './Dataset2'

class D3Test2 extends Component {
  render() {
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
      color = d3.scaleOrdinal().range(
        d3.schemeDark2.map(function(c) {
          c = d3.rgb(c);
          //c.opacity = 0.5;
          return c;
        })
      ),
      treemap = d3
        .treemap()
        .size([width, height])
        //.tile(d3.treemapResquarify) // doesn't work - height & width is 100%
        .paddingInner(0)
        .round(false), //true
      data = {
        name: "Portfolio",
        children: [
          {
            name: "Identity",
            children: [
              {
                name: "Auto Lenart",
                children: [
                  { name: "Photo 1", value: "cgi-1.jpg" },
                  { name: "Photo 2", value: "cgi-2.jpg" },
                  { name: "Photo 3", value: "cgi-3.jpg" }
                ]
              },
              {
                name: "PrintHouse",
                children: [
                  { name: "Photo 1", value: "photo-1.jpg" },
                  { name: "Photo 2", value: "photo-2.jpg" },
                  { name: "Photo 3", value: "photo-3.jpg" },
                  { name: "Photo 4", value: "photo-4.jpg" },
                  { name: "Photo 5", value: "photo-5.jpg" }
                ]
              },
              {
                name: "Mertz",
                children: [
                  { name: "Photo 1", value: "epc-1.jpg" },
                  { name: "Photo 2", value: "epc-2.jpg" },
                  { name: "Photo 3", value: "epc-3.jpg" }
                ]
              },
              {
                name: "Stanford",
                children: [
                  { name: "Photo 1", value: "floorplan-1.jpg" },
                  { name: "Photo 3", value: "floorplan-2.jpg" }
                ]
              }
            ]
          },
          {
            name: "Web",
            children: [
              {
                name: "AEG",
                children: [
                  { name: "Photo 1", value: "litho-1.jpg" },
                  { name: "Photo 2", value: "litho-2.jpg" },
                  { name: "Photo 3", value: "litho-3.jpg" },
                  { name: "Photo 4", value: "litho-4.jpg" },
                  { name: "Photo 5", value: "litho-5.jpg" },
                  { name: "Photo 6", value: "litho-6.jpg" }
                ]
              },
              {
                name: "Brent",
                children: [
                  { name: "Photo 1", value: "digital-1.jpg" },
                  { name: "Photo 2", value: "digital-2.jpg" },
                  { name: "Photo 3", value: "digital-3.jpg" },
                  { name: "Photo 4", value: "digital-4.jpg" }
                ]
              }
            ]
          },
          {
            name: "Print",
            children: [
              {
                name: "BvD",
                children: [
                  { name: "Photo 1", value: "folding-1.jpg" },
                  { name: "Photo 2", value: "folding-2.jpg" },
                  { name: "Photo 3", value: "folding-3.jpg" }
                ]
              },
              {
                name: "Metalplast",
                children: [
                  { name: "Photo 1", value: "stitched-1.jpg" },
                  { name: "Photo 2", value: "stitched-2.jpg" },
                  { name: "Photo 3", value: "stitched-3.jpg" },
                  { name: "Photo 4", value: "stitched-4.jpg" },
                  { name: "Photo 5", value: "stitched-5.jpg" }
                ]
              },
              {
                name: "Skylon",
                children: [
                  { name: "Photo 1", value: "sewn-1.jpg" },
                  { name: "Photo 2", value: "sewn-2.jpg" },
                  { name: "Photo 3", value: "sewn-3.jpg" }
                ]
              },
              {
                name: "The O2",
                children: [
                  { name: "Photo 1", value: "softback-1.jpg" },
                  { name: "Photo 3", value: "softback-2.jpg" }
                ]
              },
              {
                name: "Trendy",
                children: [
                  { name: "Photo 1", value: "hardback-1.jpg" },
                  { name: "Photo 2", value: "hardback-2.jpg" },
                  { name: "Photo 3", value: "hardback-3.jpg" },
                  { name: "Photo 4", value: "hardback-4.jpg" }
                ]
              }
            ]
          }
        ]
      },
      nodes = d3.hierarchy(data).sum(function(d) {
        return d.value ? 1 : 0;
      }),
      //.sort(function(a, b) { return b.height - a.height || b.value - a.value });

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
      //.style("background-image", function(d) { return d.value ? imgUrl + d.value : ""; })
      .style("background-image", function(d) { return d.value ? "url(http://placekitten.com/g/300/300)" : "none"; })
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
    //.style("font-size", "")
    //.style("opacity", function(d) { return isOverflowed( d.parent ) ? 1 : 0; });

    var parent = d3
      .select(".up")
      .datum(nodes)
      .on("click", zoom);

    function zoom(d) {
      // http://jsfiddle.net/ramnathv/amszcymq/

      console.log("clicked: " + d.data.name + ", depth: " + d.depth);

      currentDepth = d.depth;
      parent.datum(d.parent || nodes);

      x.domain([d.x0, d.x1]);
      y.domain([d.y0, d.y1]);

      var t = d3
        .transition()
        .duration(800)
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
      <div className="father">
        <nav>
          <div className="up">&larr; UP</div>
        </nav>
        <div className="feature" id="chart"></div>
      </div>
    );
  }
}
export default D3Test2;
