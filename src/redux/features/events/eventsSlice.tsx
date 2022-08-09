import {createSlice} from '@reduxjs/toolkit';


export const EventsSlice = createSlice({
  name: 'events',
  initialState: {value: [] as any},
  reducers: {
    clearEvents: state => {
      state.value = [];
    },
    addEvents: (state, action) => {
      state.value.push(action.payload);
    },
  },
});

export const {clearEvents, addEvents} = EventsSlice.actions

export default EventsSlice.reducer