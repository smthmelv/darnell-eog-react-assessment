// import React, { useEffect, PureComponent } from 'react';
import { PureComponent } from 'react';
// import { LineChar, Line, XAxis, YAxis } from 'recharts';
// import { useDispatch, useSelector } from 'react-redux';
// import { actions } from '../Features/Metrics/reducer';


/** This is where I would take the data and import recharts.
 * After importing I would then arrange the data in a way that will allow the component to render the graph.
 * Ideally I would want the query call in here for the metrics data,
 * but I didn't find a way to store the selected metrics on the store.
  **/
class Graph extends PureComponent {
  constructor(props: any) {
    super(props);
  }

  render(){
    console.log(this.props);
    return null;
  }
}

export default Graph;