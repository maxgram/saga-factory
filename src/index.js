import {
  createAction,
  // createRequestAction,
  createCustomRequestActionSet,
  // createCrudActionSet
} from './actionCreator'
import { bindFetch } from './fetchCycle'


const output = {
  createSimpleAction: createAction,
  createAction: createCustomRequestActionSet,
  bindFetch

  // createRequestAction,
  // createCustomRequestActionSet,
  // createCrudActionSet,
}

export output;
