import ReactGA from 'react-ga';
import Router from './router';

ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID, { standardImplementation: true });
ReactGA.pageview(window.location.pathname + window.location.search);

const App = () => <Router />;

export default App;
