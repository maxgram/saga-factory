// MANDATORY
const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

// CUSTOM
const REDUX   = 'REDUX'
const SAGA    = 'SAGA'

// OPTIONAL/CRUD
const CREATE  = 'CREATE'
const READ    = 'READ'
const UPDATE  = 'UPDATE'
const DELETE  = 'DELETE'

// BUILT-IN CASES
const requestCases = [REQUEST, SUCCESS, FAILURE]
const reduxSagaCases = [REDUX, SAGA]
const crudCases = [CREATE, READ, UPDATE, DELETE]


// METHODS
// _actionCreator -> returns standard Redux action object with {type, payload}
const _actionCreator = (type, payload={}) => ({ type, ...payload })

// _createActionTypes -> returns object of each case in format of {[CASE_NAME]: [NAME].[CASE_NAME]}
// For example, _createActionTypes('SAVE', ['REDUX', 'CUSTOM']) will return { REDUX: SAVE.REDUX, CUSTOM: SAVE.CUSTOM }
const _createActionTypes = (base, cases) => cases.reduce((acc, type) => {
  acc[type] = `${String(base).toUpperCase()}.${String(type).toUpperCase()}`
  // acc[type] = `${base}.${type}`
  return acc
}, {})

// _sagaReqObjGenerator -> creates an object with request/success/failure action callbacks
const _sagaReqObjGenerator = TYPES => ({
  request: request => _actionCreator(TYPES[REQUEST], { request }),
  success: (request, response) => _actionCreator(TYPES[SUCCESS], { request, response }),
  failure: (request, error) => _actionCreator(TYPES[FAILURE], { request, error })
})



// createAction -> returns Redux/Saga action set
export const createAction = name => {
  const rsTypes = _createActionTypes(name, reduxSagaCases)

  return {
    SAGA: rsTypes[SAGA],
    REDUX: rsTypes[REDUX],
    callSaga: data => _actionCreator(rsTypes[SAGA], { data }),
    callRedux: data => _actionCreator(rsTypes[REDUX], { data })
  }
}

// createRequestAction -> returns REQUEST/SUCCESS/FAILURE action set
const createRequestAction = name => {
  const reqTypes = _createActionTypes(name, requestCases)
  const rsAction = createAction(name)
  const fetchCallbacks = _sagaReqObjGenerator(reqTypes)

  return {
    REQUEST: reqTypes[REQUEST],
    SUCCESS: reqTypes[SUCCESS],
    FAILURE: reqTypes[FAILURE],
    fetchCallbacks,
    ...rsAction
  }
}

// createCustomRequestActionSet -> returns custom cases action set
export const createCustomRequestActionSet = (name, cases=['CUSTOM1', 'custom2']) => {
  const casesActionTypes = _createActionTypes(name, cases);
  const outObj = {};
  cases.forEach(el => {
    const elKey = String(el).toUpperCase()
    outObj[elKey] = createRequestAction(casesActionTypes[elKey])
  });

  return outObj;
}

// createCrudActionSet -> returns CRUD cases action set
// export const createCrudActionSet = name => createCustomRequestActionSet(name, crudCases);
