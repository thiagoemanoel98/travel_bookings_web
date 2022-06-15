// Modulos ficam antes de component
import {call, put, takeLatest, all} from 'redux-saga/effects'
import {addReserveSuccess} from './actions';
import api from '../../../services/api';

/**
 * O Saga fica entre o actions e o Reducer
 * Serve para fazer requisições na API 
 */

// * -> Generator
// Trabalha com funções async / Melhor do que o 'async'
function* addToReserve({id}){
    // yield = await
    const response = yield call(api.get, `trips/${id}`);
    
    // disparar uma action para o reducer
    yield put(addReserveSuccess(response.data))
}

export default all([
    takeLatest('ADD_RESERVE_REQUEST', addToReserve)
]);