import { createStore, combineReducers } from 'redux';

import paciente, { PacienteStore } from './paciente';

export type Store = {
  paciente: PacienteStore;
}

const reducer = combineReducers({
  paciente,
});

export default createStore(reducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__
  && (window as any).__REDUX_DEVTOOLS_EXTENSION__());
