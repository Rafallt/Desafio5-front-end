import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './components/Layout';
import PesquisaTransferencias from './components/PesquisaTransferencias';

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={PesquisaTransferencias} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
