# saga-factory
Utility to minimize boilerplate when using redux-saga

## Usage

1. Create actions:
```
import { createAction, createSimpleAction } from 'saga-factory';

const BASE_NAME = '@MY_APP';
export const SIMPLE_ACTION = createSimpleAction(`${BASE_NAME}/SIMPLE_ACTION`);
export const CRUD_ACTION = createAction(`${BASE_NAME}/CRUD_ACTION`, ['CREATE', 'READ', 'UPDATE', 'DELETE']);
```


2. Trigger action call:
```
import { SIMPLE_ACTION, CRUD_ACTION } from './my-app-redux';

SIMPLE_ACTION.callRedux() || SIMPLE_ACTION.callSaga()
CRUD_ACTION.CREATE.callRedux() || CRUD_ACTION.CREATE.callSaga() || CRUD_ACTION.UPDATE.callRedux() || CRUD_ACTION.UPDATE.callSaga() 
```


3. Listen for triggers
- In Saga:
```
import { all, takeLatest } from 'redux-saga/effects';
import { SIMPLE_ACTION, CRUD_ACTION } from './my-app-redux';

export function* watchAppData() {
  yield all([
    takeLatest(SIMPLE_ACTION.SAGA, simpleActionListener),

    takeLatest(CRUD_ACTION.CREATE.SAGA, crudCreateActionListener),
    takeLatest(CRUD_ACTION.READ.SAGA,   crudReadActionListener),
    takeLatest(CRUD_ACTION.UPDATE.SAGA, crudUpdateActionListener),
    takeLatest(CRUD_ACTION.DELETE.SAGA, crudDeleteActionListener)
  ])
}
```

- In Redux:
```
import { SIMPLE_ACTION, CRUD_ACTION } from './my-app-redux';
export function appReducer(state=initialState, action) {
  switch (action.type) {
    case SIMPLE_ACTION.REDUX:
      ...
      break;

    case CRUD_ACTION.CREATE.REDUX:
      ...
      break;

    case CRUD_ACTION.UPDATE.REDUX:
      ...
      break;
  }
}
```


4. Bind request:
```
import { bindFetch } from 'saga-factory';
const loadRemote = bindFetch(CRUD_ACTION.READ, () => api.callApi(...))
```
This will trigger a set of request cycle with `CRUD_ACTION.READ.REQUEST` -> `CRUD_ACTION.READ.SUCCESS` || `CRUD_ACTION.READ.FAILURE`, which can be used in reducer as following:

```
import { CRUD_ACTION } from './my-app-redux';
export function appReducer(state=initialState, action) {
  const newState = {...state}

  switch (action.type) {
    case CRUD_ACTION.READ.REQUEST:
      newState.isLoading = true
      break;

    case CRUD_ACTION.READ.SUCCESS:
      newState.isLoading = false
      break;

    case CRUD_ACTION.READ.FAILURE:
      newState.isLoading = false
      break;
  }

  return newState;
}
```
