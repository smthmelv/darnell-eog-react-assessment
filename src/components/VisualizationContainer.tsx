import React, { PureComponent } from 'react';
import MetricsList from './MetricsList';
import Graph from './Graph';

//Assumed breaking the dropdown and graph components into seperate files
//This way the App.tsx file would need to make two calls
class VisualizationContainer extends PureComponent {
  render() {
    return (
      <div>
        <MetricsList />
        <Graph />
      </div>
    );
  }
}

export default VisualizationContainer;
