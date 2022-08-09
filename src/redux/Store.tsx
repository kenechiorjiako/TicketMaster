import {configureStore} from '@reduxjs/toolkit';
import locationReducer from'./features/location/locationSlice'
import eventsReducer from './features/events/eventsSlice';
import logger from 'redux-logger';

export const store = configureStore({
  reducer: {
    location: locationReducer,
    events: eventsReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
