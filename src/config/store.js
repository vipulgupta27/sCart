import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import reduxSagaMiddleware from 'redux-saga';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import reducers from '../reducers';
import sagas from './sagas';

const sagaMiddleware = reduxSagaMiddleware();
const middleware = [
    sagaMiddleware,
];

/* Always keep logger middleware in end. */
if (process.env.NODE_ENV === 'development') {
    middleware.push(logger);
}

export const persistConfiguration = {
    key: 'root',
    storage,
    timeout: null,
    whitelist: [
        'login',
        'product',
        'filter'
    ],
    stateReconciler: autoMergeLevel2,
};
const persistReducer = persistCombineReducers(
    persistConfiguration,
    reducers,
);

const configureStore = () => {
    const store = createStore(persistReducer, applyMiddleware(...middleware));
    sagaMiddleware.run(sagas);
    const persist = persistStore(store);
    store.persistor = persist;
    return {
        store,
        persist
    };
};

export default configureStore;
