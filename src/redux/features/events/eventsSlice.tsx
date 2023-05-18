import {createSlice} from '@reduxjs/toolkit';

export const EventsSlice = createSlice({
  name: 'upcomingEvents',
  initialState: {value: [] as any},
  reducers: {
    clearUpcomingEvents: state => {
      state.value = [];
    },
    setUpcomingEvents: (state, action) => {
      state.value = action.payload;
    },
    addUpcomingEvents: (state, action) => {
      state.value = state.value.concat(action.payload)
    },
  },
});

export const {clearUpcomingEvents, setUpcomingEvents, addUpcomingEvents} = EventsSlice.actions;

export default EventsSlice.reducer;
