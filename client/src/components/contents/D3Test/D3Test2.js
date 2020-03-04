import React, { Component } from "react";
import * as d3 from "d3";
class D3Test2 extends Component {
  render() {
    console.log("D3test");
    const temperatureData = [8, 5, 13, 9, 12];


    // esto asigna a cada linea el valor del datapoint
    d3.select(this.refs.temperatures)
      .selectAll("h2")
      .data(temperatureData)
      .enter()
      .append("h2")
      .text(datapoint => datapoint + " degrees");

    //asigna un color aleatorio a cada texto
    d3.selectAll("h2").style("color", function() {
      return "hsl(" + Math.random() * 360 + ",100%,50%)";
    });

    //esto asigna un color condicionalmente segun el dato a veces no va
    // d3.select(this.refs.temperatures)
    //   .selectAll("h2")
    //   .data(temperatureData)
    //   .enter()
    //   .append("h2")
    //   .text(datapoint => `${datapoint} degrees`)
    //   .style(datapoint => {
    //     if (datapoint > 10) {
    //       return "red";
    //     } else {
    //       return "blue";
    //     }
    //   });

    //hace una transicion del background a rojo
    d3.select(this.refs.temperatures)
      .transition()
      .duration(1000)
      .style("background-color", "red");


      

      return <div ref="temperatures"></div>;
    

  }
}
export default D3Test2;
