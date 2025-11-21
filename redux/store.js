import { configureStore } from '@reduxjs/toolkit';
import otpReducer from './serviceSlice/otpSlice';
import authReducer from './serviceSlice/authSlice';

const store = configureStore({
  reducer: {
    otp: otpReducer,
    auth: authReducer,
  },
});

export default store;
