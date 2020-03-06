import { createSlice, PayloadAction } from 'redux-starter-kit';

export type MetricsForList = {
  getMetrics: string[];
};

export type ApiErrorAction = {
  error: string;
};

export type SelectedMetrics = {
  selectedMetrics: object[];
}

const initialState = {
  getMetrics: [] as any,
  selectedMetrics: [] as any
};

const slice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    metricsDataRecevied: (state, action: PayloadAction<MetricsForList>) => {
      state.getMetrics = action.payload;
    },
    weatherApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
    //This is my attempt to add the selected metrics to the store
    //Although I think useState might be the proper way to do so
    selectedMetricsReceived: (state, action: PayloadAction<SelectedMetrics>) => {
      console.log(action.payload);
      // state.selectedMetrics = action.payload;
    }
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
