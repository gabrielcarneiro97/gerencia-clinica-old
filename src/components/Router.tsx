import React from 'react';
import {
  Switch, Route, Redirect,
} from 'react-router-dom';

import PacientesMain from './PacientesMain';


const Teste2 = () => <div>Teste2</div>;


export default function Router(): JSX.Element {
  return (
    <Switch>
      <Route exact path="/pacientes" component={PacientesMain} />
      <Route exact path="/teste2" component={Teste2} />

      <Redirect from="/" to="/pacientes" />
    </Switch>
  );
}
