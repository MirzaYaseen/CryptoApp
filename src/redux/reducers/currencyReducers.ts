import {
    FETCH_CURRENCIES_REQUEST,
    FETCH_CURRENCIES_SUCCESS,
    FETCH_CURRENCIES_FAILURE,
  } from '../actions/currencyActions';
  
  interface Currency {
    // Define the structure of a currency object if necessary
  }
  
  interface CurrencyState {
    currencies: Currency[];
    loading: boolean;
    error: string | null;
  }
  
  const initialState: CurrencyState = {
    currencies: [],
    loading: false,
    error: null,
  };
  
  type CurrencyAction =
    | { type: typeof FETCH_CURRENCIES_REQUEST }
    | { type: typeof FETCH_CURRENCIES_SUCCESS, payload: Currency[] }
    | { type: typeof FETCH_CURRENCIES_FAILURE, payload: string };
  
  const currencyReducer = (state: CurrencyState = initialState, action: CurrencyAction): CurrencyState => {
    switch (action.type) {
      case FETCH_CURRENCIES_REQUEST:
        return { ...state, loading: true, error: null };
      case FETCH_CURRENCIES_SUCCESS:
        return { ...state, loading: false, currencies: action.payload };
      case FETCH_CURRENCIES_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default currencyReducer;
  