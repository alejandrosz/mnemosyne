import React from 'react';
// import Column from './Column';
import Container from './Container';
class Row extends React.Component{
  render(){
    const style = {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    };
    const styleRow = {
      width: '100%',
      height: '30%',
      backgroundColor: 'red',
      display: 'flex',
      flexDirection: 'row',
      border: '1px solid black'
    };
    const styleWrapper = {
      width: '100%',
      height: '70%'
    };
    const imgStyle={ border: '1px solid yellow',padding: '5px', width: '25%', height: '100%',backgroundSize: 'cover',backgroundPosition: 'center' }
    const rowImages = this.props.imgArray && this.props.imgArray.slice(0, 4);
    const restImages = this.props.imgArray && this.props.imgArray.slice(4, this.props.imgArray.length);
    return (
      <div style={style}>
        <div style={styleRow}>
          {this.props.imgArray &&
            rowImages.map(image => <div style={{...imgStyle,backgroundImage: `url(${image})`}} />
            )}
        </div>
        {this.props.renderMore > 0 && (
          <Container renderMore={this.props.renderMore} style={styleWrapper} imgArray={restImages} />
        )}
      </div>
    );
  }
}
export default Row;












// import React from 'react';
// import Column from './Column';
// import Container from './Container';

// function Row(props) {
//   const style = {
//     width: '100%',
//     height: '100%',
//     display: 'flex',
//     flexDirection: 'column'
//   };
//   const styleRow = {
//     width: '100%',
//     height: '30%',
//     backgroundColor: 'red',
//     display: 'flex',
//     flexDirection: 'row',
//     border: '1px solid black'
//   };

//   const styleWrapper = {
//     width: '100%',
//     height: '70%'
//   };

//   const imgStyle={ border: '1px solid yellow',padding: '5px', width: '25%', height: '100%',backgroundSize: 'cover',backgroundPosition: 'center' }

//   const rowImages = props.imgArray && props.imgArray.slice(0, 4);
//   const restImages = props.imgArray && props.imgArray.slice(4, props.imgArray.length);

//   return (
//     <div style={style}>
//       <div style={styleRow}>
//         {props.imgArray &&
//           rowImages.map(image => <div style={{...imgStyle,backgroundImage: `url(${image})`}} />
//           )}
//       </div>
//       {props.renderMore > 0 && (
//         <Container renderMore={props.renderMore} style={styleWrapper} imgArray={restImages} />
//       )}
//     </div>
//   );
// }

// export default Row;


