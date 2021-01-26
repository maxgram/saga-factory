import {
  createAction as createSimpleAction,
  // createRequestAction,
  createCustomRequestActionSet as createAction,
  // createCrudActionSet
} from './actionCreator'
import { bindFetch } from './fetchCycle'


// const output = {
//   createSimpleAction: createAction,
//   createAction: createCustomRequestActionSet,
//   bindFetch

//   // createRequestAction,
//   // createCustomRequestActionSet,
//   // createCrudActionSet,
// }

// export default output;
export {
  createSimpleAction,
  createAction,
  bindFetch
}
