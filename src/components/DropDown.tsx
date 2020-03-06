import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../Features/Metrics/reducer';
import { Provider, createClient, useQuery } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';
import Chip from './Chip';
import { IState } from '../store';
import { metricsQuery } from '../queries/Queries';
import Multiselect from 'multiselect-dropdown-react';

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const getMetricsList = (state: IState) => {
  const { getMetrics } = state.metrics;

  return {
    getMetrics
  };
};

const arrangeData = (data:string[]) => {
  let tempArray: object[] = [];

  data.forEach(element => {
    let tempObject: object;

    tempObject = {
      name: element,
      value: element
    }

    tempArray.push(tempObject);
  });

  return tempArray;
}

export default () => {
  return (
    <Provider value={client}>
      <MetricsList />
    </Provider>
  );
};

const checked = (chips:string[]) => {
  const chipStyles = {
    height: '30px !important',
    'min-width': '55px',
    width: 'auto',
    'background-color': '#2196f3',
    color: '#ffffff',
    padding: '5px',
    'text-align': 'center',
    'border-radius': '.25rem',
    display: 'inline-block',
    'margin-left': '3px',
    'margin-bottom': '3px'
  }

  return <Chip className={`${chipStyles}`} label={`${chips}`} />
}

const MetricsList = () => {
  const dispatch = useDispatch();
  const { getMetrics } = useSelector(getMetricsList);
  const [result] = useQuery({
    query: metricsQuery
  });
  const { fetching, data, error } = result;

  useEffect(() => {
    if (error) {
      dispatch(actions.weatherApiErrorReceived({ error: error.message }));
      return;
    }

    if (!data) return;

    const { getMetrics } = data;
    dispatch(actions.metricsDataRecevied(getMetrics));

  }, [dispatch, data, error]);

  if (fetching) return <LinearProgress />;

  let metricList: object[] = [];
  if (getMetrics.length > 0) {
    metricList = arrangeData(getMetrics);
  }

  return <Multiselect options={metricList} onSelectOptions={checked}/>;
};
