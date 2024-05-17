// src/redux/reducers/index.ts
import { combineReducers, Reducer } from 'redux';
import currencyReducer, { CurrencyState } from './currencyReducers';

export interface RootState {
  currency: CurrencyState;
}

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  currency: currencyReducer,
});

export default rootReducer;
