// Modulos ficam antes de component
import { select, call, put, takeLatest, all } from "redux-saga/effects";
import { addReserveSuccess, updateAmountReserve } from "./actions";
import api from "../../../services/api";

/**
 * O Saga fica entre o actions e o Reducer
 * Serve para fazer requisições na API
 */

// * -> Generator
// Trabalha com funções async / Melhor do que o 'async'
function* addToReserve({ id }) {
  const tripExists = yield select((state) =>
    state.reserve.find((trip) => trip.id === id)
  );

  if (tripExists) {
    const amount = tripExists.amout + 1;
    yield put(updateAmountReserve(id, amount));
  } else {
    // yield = await
    const response = yield call(api.get, `trips/${id}`);

    const data = {
      ...response.data,
      amout: 1,
    };

    // disparar uma action para o reducer
    yield put(addReserveSuccess(data));
  }
}

export default all([takeLatest("ADD_RESERVE_REQUEST", addToReserve)]);
