import React from 'react';
import createStore from './store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Wrapper from './components/Wrapper';
import VisualizationContainer from './components/VisualizationContainer';
// import NowWhat from './components/NowWhat';

const store = createStore();
const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(39,49,66)',
    },
    secondary: {
      main: 'rgb(197,208,222)',
    },
    background: {
      default: 'rgb(226,231,238)',
    },
  },
});

/** Overall I had to do a lot of research,
 * beacuse I haven't had any experience with graphQL or reactHooks.
 * I had fun learning all these new libraries but was frustrated with the slowness of my laptop.
 * I hope this gives some insight to my programming drive and ethusiasm to lern more.
 * Thanks for the opportunity to display my skills and ability to learn on the fly. **/

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <Wrapper>
        <Header />
        <ToastContainer />
        <VisualizationContainer />
        {/* <NowWhat /> */}
      </Wrapper>
    </Provider>
  </MuiThemeProvider>
);

export default App;
