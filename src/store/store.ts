import { createStore, Reducer } from 'redux';

import Paciente from '../db/models/Paciente';

export type Store = {
  pacientesBusca: Paciente[];
  pacienteSelecionado: Paciente | null;
};
type Action = {
  type: string;
  pacientes?: Paciente[];
  paciente?: Paciente;
};

type Handlers = { [key: string]: (state?: Store, action?: Action) => Store };

const initialState: Store = {
  pacientesBusca: [],
  pacienteSelecionado: null,
};

const CARREGAR_PACIENTE_SELECIONADO = 'CARREGAR_PACIENTE_SELECIONADO';


function carregarPacienteSelecionadoHandler(state = initialState, action?: Action): Store {
  if (!action) return state;

  const { paciente = null } = action;
  return {
    ...state,
    pacienteSelecionado: paciente,
  };
}

const reducer: Reducer = (state: Store = initialState, action: Action): Store => {
  const handlers: Handlers = {
    [CARREGAR_PACIENTE_SELECIONADO]: carregarPacienteSelecionadoHandler,
  };

  return (handlers[action.type] || ((): Store => state))();
};

export function carregarPacienteSelecionado(paciente: Paciente): Action {
  return {
    type: CARREGAR_PACIENTE_SELECIONADO,
    paciente,
  };
}

export default createStore(reducer);
