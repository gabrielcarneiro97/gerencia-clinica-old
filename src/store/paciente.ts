import { Reducer } from 'redux';

import Paciente from '../db/models/Paciente';
import Endereco from '../db/models/Endereco';

type Handlers = { [key: string]: (state?: PacienteStore, action?: Action) => PacienteStore };

export type PacienteStore = {
  infosPessoais: Paciente | null;
  endereco: Endereco | null;
  diferenteDoDb: boolean;
};

type Action = {
  type: string;
  infosPessoais?: Paciente;
  endereco?: Endereco;
};

const initialState: PacienteStore = {
  infosPessoais: null,
  endereco: null,
  diferenteDoDb: false,
};

const CARREGAR_INFOS_PESSOAIS = 'CARREGAR_INFOS_PESSOAIS';
const CARREGAR_ENDERECO = 'CARREGAR_ENDERECO';
const MUDOU = 'MUDOU';
const PERSISTIDO = 'PERSISITIDO';

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

function mudouHandler(state = initialState, action?: Action): PacienteStore {
  if (!action) return state;

  return {
    ...state,
    diferenteDoDb: true,
  };
}

function persistidoHandler(state = initialState, action?: Action): PacienteStore {
  if (!action) return state;

  return {
    ...state,
    diferenteDoDb: false,
  };
}

const reducer: Reducer = (state: PacienteStore = initialState, action: Action): PacienteStore => {
  const handlers: Handlers = {
    [CARREGAR_INFOS_PESSOAIS]: carregarInfosPessoaisHandler,
    [CARREGAR_ENDERECO]: carregarEnderecoHandler,
    [MUDOU]: mudouHandler,
    [PERSISTIDO]: persistidoHandler,
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

export function mudou(): Action {
  return {
    type: MUDOU,
  };
}

export function persitido(): Action {
  return {
    type: PERSISTIDO,
  };
}

export default reducer;
