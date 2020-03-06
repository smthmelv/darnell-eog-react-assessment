import { createSlice, PayloadAction } from 'redux-starter-kit';

export type MetricsForList = {
  getMetrics: string[];
};

export type ApiErrorAction = {
  error: string;
};

const initialState = {
//   temperatureinCelsius: 0,
//   temperatureinFahrenheit: 0,
//   description: '',
//   locationName: '',
  getMetrics: [] as any
};

// const toF = (c: number) => (c * 9) / 5 + 32;

const slice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    metricsDataRecevied: (state, action: PayloadAction<MetricsForList>) => {
      state.getMetrics = action.payload;
    },
    weatherApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
