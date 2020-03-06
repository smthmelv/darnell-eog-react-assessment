const locationQuery = `
query($latLong: WeatherQuery!) {
  getWeatherForLocation(latLong: $latLong) {
    description
    locationName
    temperatureinCelsius
  }
}
`;

const metricsQuery = `
query {
  getMetrics
}
`;

const metricDataQuery = `
query($metrics: MeasurementQuery) {
  getMeasurements(input: $metrics){
    metric
    at
    value
    unit
  }
}
`;

const multipleMetricsDataQuery = `
query($metrics: [MeasurementQuery]) {
  getMultipleMeasurements(latLong: $metrics) {
    measurements{
      metric
      at
      unit
      value
    }
  }
}
`;

export { locationQuery, metricsQuery, metricDataQuery, multipleMetricsDataQuery };