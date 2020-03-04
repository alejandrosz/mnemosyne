import React from 'react';

import {Treemap} from 'react-vis';

import D3FlareData from '../components/datasets/d3-flare-example.json';


const MODE = [
  // 'circlePack',
  // 'partition',
  // 'partition-pivot',
  'squarify',
  // 'resquarify',
  // 'slice',
  // 'dice',
  // 'slicedice',
  // 'binary'
];

const STYLES = {
  SVG: {
    stroke: '#ddd',
    strokeWidth: '0.25',
    strokeOpacity: 0.5
  },
  DOM: {
    border: 'thin solid #ddd'
  }
};

export default class SimpleTreemapExample extends React.Component {
  state = {
    modeIndex: 0,
    useSVG: true
  };

  updateModeIndex = increment => () => {
    const newIndex = this.state.modeIndex + (increment ? 1 : -1);
    const modeIndex =
      newIndex < 0 ? MODE.length - 1 : newIndex >= MODE.length ? 0 : newIndex;
    this.setState({modeIndex});
  };

  render() {
    const {modeIndex, useSVG} = this.state;

    return (
      <div className="centered-and-flexed">
   
        <Treemap
          {...{
            animation: true,
            className: 'nested-tree-example',
            colorType: 'literal',
            colorRange: ['#88572C'],
            data: D3FlareData,
            mode: MODE[modeIndex],
            renderMode: 'DOM',
            height: 600,
            width: 600,
            margin: 50,
            getSize: d => d.value,
            getColor: d => d.hex,
            style: STYLES[ 'DOM']
          }}
        />
      </div>
    );
  }
}
