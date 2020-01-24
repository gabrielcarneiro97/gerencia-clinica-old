import { Reducer } from 'redux';

import Paciente from '../db/models/Paciente';
import Endereco from '../db/models/Endereco';

type Handlers = { [key: string]: (state?: PacienteStore, action?: Action) => PacienteStore };

export type PacienteStore = {
  infosPessoais: Paciente | null;
  endereco: Endereco | null;
};

type Action = {
  type: string;
  infosPessoais?: Paciente;
  endereco?: Endereco;
};

const initialState: PacienteStore = {
  infosPessoais: null,
  endereco: null,
};

const CARREGAR_INFOS_PESSOAIS = 'CARREGAR_INFOS_PESSOAIS';
const CARREGAR_ENDERECO = 'CARREGAR_ENDERECO';


function carregarInfosPessoaisHandler(state = initialState, action?: Action): PacienteStore {
  if (!action) return state;

  const { infosPessoais = null } = action;

  return {
    ...state,
    infosPessoais,
  };
}

function carregarEnderecoHandler(state = initialState, action?: Action): PacienteStore {
  if (!action) return state;

  const { endereco = null } = action;

  return {
    ...state,
    endereco,
  };
}

const reducer: Reducer = (state: PacienteStore = initialState, action: Action): PacienteStore => {
  const handlers: Handlers = {
    [CARREGAR_INFOS_PESSOAIS]: carregarInfosPessoaisHandler,
    [CARREGAR_ENDERECO]: carregarEnderecoHandler,
  };

  const newState = (handlers[action.type] || ((): PacienteStore => state))(state, action);

  return newState;
};

export function carregarInfosPessoais(infosPessoais: Paciente): Action {
  return {
    type: CARREGAR_INFOS_PESSOAIS,
    infosPessoais,
  };
}

export function carregarEndereco(endereco: Endereco): Action {
  return {
    type: CARREGAR_ENDERECO,
    endereco,
  };
}

export default reducer;
