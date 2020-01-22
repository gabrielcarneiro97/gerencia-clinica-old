import React from 'react';
import {
  Switch, Route, Redirect,
} from 'react-router-dom';

const Teste1 = () => <div>Teste1</div>;
const Teste2 = () => <div>Teste2</div>;


export default function Router(): JSX.Element {
  return (
    <Switch>
      <Route exact path="/teste1" component={Teste1} />
      <Route exact path="/teste2" component={Teste2} />

      <Redirect from="/" to="/teste1" />
    </Switch>
  );
}
