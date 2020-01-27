import { Reducer } from 'redux';

import Consulta from '../db/models/Consulta';
import ConsultaProcedimento from '../db/models/ConsultaProcedimento';

type Handlers = { [key: string]: (state?: ConsultaStore, action?: Action) => ConsultaStore };

export type ConsultaStore = {
  infos: Consulta | null;
  procedimentos: ConsultaProcedimento[];
  diferenteDoDb: boolean;
};

type Action = {
  type: string;
  consulta?: Consulta | null;
  procedimentos?: ConsultaProcedimento[];
};

const initialState: ConsultaStore = {
  infos: null,
  procedimentos: [],
  diferenteDoDb: false,
};

const CARREGAR_INFOS = 'CARREGAR_INFOS';
const CARREGAR_PROCEDIMENTOS = 'CARREGAR_PROCEDIMENTOS';
const MUDOU = 'MUDOU';
const PERSISTIDO = 'PERSISITIDO';
const LIMPAR_CONSULTA = 'LIMPAR_CONSULTA';

function carregarInfosHandler(state = initialState, action?: Action): ConsultaStore {
  if (!action) return { ...state };

  const { consulta = null } = action;

  return {
    ...state,
    infos: consulta,
  };
}

function carregarProcedimentosHandler(state = initialState, action?: Action): ConsultaStore {
  if (!action) return { ...state };

  const { procedimentos = [] } = action;

  return {
    ...state,
    procedimentos,
  };
}

function mudouHandler(state = initialState, action?: Action): ConsultaStore {
  if (!action) return { ...state };

  return {
    ...state,
    diferenteDoDb: true,
  };
}

function persistidoHandler(state = initialState, action?: Action): ConsultaStore {
  if (!action) return { ...state };

  return {
    ...state,
    diferenteDoDb: false,
  };
}

function limparConsultaHandler(): ConsultaStore {
  return { ...initialState };
}

const reducer: Reducer = (state: ConsultaStore = initialState, action: Action): ConsultaStore => {
  const handlers: Handlers = {
    [CARREGAR_INFOS]: carregarInfosHandler,
    [CARREGAR_PROCEDIMENTOS]: carregarProcedimentosHandler,
    [MUDOU]: mudouHandler,
    [PERSISTIDO]: persistidoHandler,
    [LIMPAR_CONSULTA]: limparConsultaHandler,
  };

  const newState = (handlers[action.type] || ((): ConsultaStore => ({ ...state })))(state, action);

  return newState;
};

export function carregarInfos(consulta: Consulta | null): Action {
  return {
    type: CARREGAR_INFOS,
    consulta,
  };
}

export function carregarProcedimentos(procedimentos: ConsultaProcedimento[]): Action {
  return {
    type: CARREGAR_PROCEDIMENTOS,
    procedimentos,
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

export function limparConsulta(): Action {
  return {
    type: LIMPAR_CONSULTA,
  };
}

export default reducer;
