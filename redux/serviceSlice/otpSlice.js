import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// ⚙️ Base URL for backend
const API_BASE_URL = 'http://192.168.0.102:8080/auth'; // change to your LAN IP if testing on mobile

const otpSlice = createSlice({
  name: 'otp',
  initialState: {
    loading: false,
    otpSent: false,
    verified: false,
    error: null,
  },
  reducers: {
    // 🔹 Basic reducers for managing state manually
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setOtpSent: (state, action) => {
      state.otpSent = action.payload;
    },
    setVerified: (state, action) => {
      state.verified = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetOtpState: (state) => {
      state.loading = false;
      state.otpSent = false;
      state.verified = false;
      state.error = null;
    },
  },
});

export const { setLoading, setOtpSent, setVerified, setError, resetOtpState } =
  otpSlice.actions;

// 🔸 Async helper functions (no thunk, just plain async functions)
export const sendOtpAPI = (phoneNumber) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));

    const response = await axios.post(`${API_BASE_URL}/otp`, null, {
      params: { phoneNumber },
    });

   await dispatch(setOtpSent(true));
  } catch (error) {
    dispatch(
      setError(
        error.response?.data?.message || error.message || 'Failed to send OTP'
      )
    );
  } finally {
    dispatch(setLoading(false));
  }
};

export const verifyOtpAPI = ({ phoneNumber, otpCode }) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));

    const response = await axios.post(`${API_BASE_URL}/verify-otp`, null, {
      params: { phoneNumber, otp: otpCode },
    });

    dispatch(setVerified(true));
  } catch (error) {
    dispatch(
      setError(
        error.response?.data?.message || error.message || 'OTP verification failed'
      )
    );
  } finally {
    dispatch(setLoading(false));
  }
};

export default otpSlice.reducer;
