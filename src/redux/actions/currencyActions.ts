
import axios, { AxiosError } from 'axios';
import { Dispatch } from 'redux';
import { API_URL } from '../../utils/api';

export const FETCH_CURRENCIES_REQUEST = 'FETCH_CURRENCIES_REQUEST';
export const FETCH_CURRENCIES_SUCCESS = 'FETCH_CURRENCIES_SUCCESS';
export const FETCH_CURRENCIES_FAILURE = 'FETCH_CURRENCIES_FAILURE';

interface FetchCurrenciesRequestAction {
  type: typeof FETCH_CURRENCIES_REQUEST;
}

interface FetchCurrenciesSuccessAction {
  type: typeof FETCH_CURRENCIES_SUCCESS;
  payload: any[];
}

interface FetchCurrenciesFailureAction {
  type: typeof FETCH_CURRENCIES_FAILURE;
  payload: string;
}

export type CurrencyActionTypes = 
  | FetchCurrenciesRequestAction 
  | FetchCurrenciesSuccessAction 
  | FetchCurrenciesFailureAction;

  export const fetchCurrencies = () => async (dispatch: Dispatch<CurrencyActionTypes>) => {
    dispatch({ type: FETCH_CURRENCIES_REQUEST });
    try {
      const response = await axios.get(`${API_URL}/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=50&page=1`);
      dispatch({ type: FETCH_CURRENCIES_SUCCESS, payload: response.data });
    } catch (error: any) {
      let errorMessage: string = 'An error occurred';
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          errorMessage = (axiosError.response.data && axiosError.response.data.message) || axiosError.response.statusText || 'An error occurred';
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch({ type: FETCH_CURRENCIES_FAILURE, payload: errorMessage });
    }
  };
  