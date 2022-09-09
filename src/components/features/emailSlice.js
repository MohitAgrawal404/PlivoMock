import { createSlice } from '@reduxjs/toolkit';

export const emailSlice = createSlice({
  name: 'email',
  initialState: {
    emailId: null,
  },
  reducers: {
    setEmail: (state, action) => {
      state.emailId = action.payload.emailId;
  },
},
});

export const { setEmail } = emailSlice.actions;
export const selectEmailId = (state) => state.email.emailId
export default emailSlice.reducer;