import { createSlice } from "@reduxjs/toolkit";
import {statesList} from '../../../util/Constants';

export const LocationSlice = createSlice({
  name: 'location',
  initialState: {value: statesList[0]},
  reducers: {
    setLocation: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {setLocation} = LocationSlice.actions

export default LocationSlice.reducer