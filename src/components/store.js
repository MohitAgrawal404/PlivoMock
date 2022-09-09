import { configureStore } from '@reduxjs/toolkit';
import useReducer from './features/userSlice'
import chatreducer from './features/chatSlice'
import emailreducer from './features/emailSlice'

export default configureStore({
  reducer: {
    user: useReducer,
    chat: chatreducer,
    email: emailreducer
  },
});

