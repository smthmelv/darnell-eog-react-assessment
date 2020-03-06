import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../Features/Metrics/reducer';
import { Provider, createClient, useQuery } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';
import Chip from './Chip';
import { IState } from '../store';
// Figured the code would look nicer if I placed all the queries in it's own file
import { metricsQuery, metricDataQuery, multipleMetricsDataQuery } from '../queries/Queries';
import Multiselect from 'multiselect-dropdown-react';
// Was going to style the Chip component or even make my own but didn't get to it
// There might have been a reusable component that placed those bubbles above the dropdown already
import styles from './styles.css';
import Graph from './Graph';

const client = createClient({
    url: 'https://react.eogresources.com/graphql',
});
  
const getMetricsList = (state: IState) => {
    const { getMetrics } = state.metrics;

    return {
        getMetrics
    };
};

/* This was to format data in a way the multiselect component could understand the metrics data */
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

/** Being new to hooks and graphQL I would've need to do more research on refetching the queries
 * So that I was continually getting the next newest measurements.
 * I also thought about how I could've just used a timer,
 * that called back out with the getLastKnownMeasurement query.
**/
export default () => {
    return (
        <Provider value={client}>
            <MetricsList />
        </Provider>
    );
};
  
const MetricsList = () => {
    const dispatch = useDispatch();
    const { getMetrics } = useSelector(getMetricsList);
    const [result] = useQuery({
        query: metricsQuery
    });

    /** Ideally all this code would be moved to the graph component **/
    let selectedMetrics: string[] = [];
    let selectedMetricsLength: number = 0;
    let selectedMetricsForQuery: object[] = [];
    const Checked = (chips:string[]) => {
        selectedMetrics = chips.length > 0 ? chips : [""]
        selectedMetricsLength = chips.length
        chips.forEach(element => {
            selectedMetricsForQuery.push({metricName: element});
        })
    }
    const [metricResult] = useQuery({
        query: selectedMetricsLength <= 1 ? metricDataQuery : multipleMetricsDataQuery,
        variables: {
            metrics: selectedMetricsLength <= 1 ? selectedMetricsForQuery[0] : selectedMetricsForQuery
        }
    });
    /* **/
    const { fetching, data, error } = result;
    let metricList: object[] = [];

    useEffect(() => {
        if (error) {
        dispatch(actions.weatherApiErrorReceived({ error: error.message }));
        return;
        }

        if (!data) return;

        const { getMetrics } = data;
        dispatch(actions.metricsDataRecevied(getMetrics));

        /* I was trying to understand hooks and how I could store the selected metrics on the store.
        Unfortunately was unable to accomplish this. */
    }, [dispatch, data, error]);

    if (fetching) return <LinearProgress />;

    getMetrics.length > 0 ? metricList = arrangeData(getMetrics) : metricList = arrangeData(data.getMetrics);

    return (
        <div>
            <Multiselect options={metricList} onSelectOptions={Checked}/>;
            {selectedMetrics.length ? <Chip className={styles.chipStyle} label={selectedMetrics} /> : null}
            <Graph {...metricResult}/>
        </div>
    )
};