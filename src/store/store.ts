import { createStore } from 'redux';

type Store = any;
type Action = { type: string };

type Handlers = { [key: string]: (state?: Store, action?: Action) => Store };

function reducer(state: Store, action: Action): Store {
  const handlers: Handlers = {};

  return (handlers[action.type] || ((): Store => state))();
}


export default createStore(reducer);
