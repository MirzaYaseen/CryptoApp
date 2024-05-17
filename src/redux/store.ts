import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import rootReducer, {RootState} from './reducers';

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware<RootState>({
      thunk: true,
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
