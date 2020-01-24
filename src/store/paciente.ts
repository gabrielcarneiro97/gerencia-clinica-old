import { Reducer } from 'redux';

import Paciente from '../db/models/Paciente';
import Endereco from '../db/models/Endereco';
import Contato from '../db/models/Contato';

type Handlers = { [key: string]: (state?: PacienteStore, action?: Action) => PacienteStore };

export type PacienteStore = {
  infosPessoais: Paciente | null;
  endereco: Endereco | null;
  contato: Contato | null;
  diferenteDoDb: boolean;
};

type Action = {
  type: string;
  infosPessoais?: Paciente;
  endereco?: Endereco;
  contato?: Contato;
};

const initialState: PacienteStore = {
  infosPessoais: null,
  endereco: null,
  contato: null,
  diferenteDoDb: false,
};

const CARREGAR_INFOS_PESSOAIS = 'CARREGAR_INFOS_PESSOAIS';
const CARREGAR_ENDERECO = 'CARREGAR_ENDERECO';
const CARREGAR_CONTATO = 'CARREGAR_CONTATO';
const MUDOU = 'MUDOU';
const PERSISTIDO = 'PERSISITIDO';
const LIMPAR_PACIENTE = 'LIMPAR_PACIENTE';

function carregarInfosPessoaisHandler(state = initialState, action?: Action): PacienteStore {
  if (!action) return { ...state };

  const { infosPessoais = null } = action;

  return {
    ...state,
    infosPessoais,
  };
}

function carregarEnderecoHandler(state = initialState, action?: Action): PacienteStore {
  if (!action) return { ...state };

  const { endereco = null } = action;

  return {
    ...state,
    endereco,
  };
}

function carregarContatoHandler(state = initialState, action?: Action): PacienteStore {
  if (!action) return { ...state };

  const { contato = null } = action;

  return {
    ...state,
    contato,
  };
}

function mudouHandler(state = initialState, action?: Action): PacienteStore {
  if (!action) return { ...state };

  return {
    ...state,
    diferenteDoDb: true,
  };
}

function persistidoHandler(state = initialState, action?: Action): PacienteStore {
  if (!action) return { ...state };

  return {
    ...state,
    diferenteDoDb: false,
  };
}

function limparPacienteHandler(): PacienteStore {
  return { ...initialState };
}

const reducer: Reducer = (state: PacienteStore = initialState, action: Action): PacienteStore => {
  const handlers: Handlers = {
    [CARREGAR_INFOS_PESSOAIS]: carregarInfosPessoaisHandler,
    [CARREGAR_ENDERECO]: carregarEnderecoHandler,
    [CARREGAR_CONTATO]: carregarContatoHandler,
    [MUDOU]: mudouHandler,
    [PERSISTIDO]: persistidoHandler,
    [LIMPAR_PACIENTE]: limparPacienteHandler,
  };

  const newState = (handlers[action.type] || ((): PacienteStore => ({ ...state })))(state, action);

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

export function carregarContato(contato: Contato): Action {
  return {
    type: CARREGAR_CONTATO,
    contato,
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

export function limparPaciente(): Action {
  return {
    type: LIMPAR_PACIENTE,
  };
}

export default reducer;