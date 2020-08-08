import { call, put } from 'redux-saga/effects'

function* fetchEntity(fetchCallback, apiFn, data) {
  yield put(fetchCallback.request(data))

  const { response, error } = yield call(apiFn, data)

  if (response) yield put(fetchCallback.success(data, response))
  else yield put(fetchCallback.failure(data, error))
}

export function bindFetch(actionObj, data) {
  const fetchCallbacks = actionObj.fetchCallbacks
  return fetchEntity.bind(null, fetchCallbacks, data)
}
