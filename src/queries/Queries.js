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

export { locationQuery, metricsQuery };