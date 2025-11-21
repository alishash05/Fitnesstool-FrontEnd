import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { setLoading } from "./otpSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Base URL for backend
const API_BASE_URL = 'http://192.168.0.102:8080/auth'; 

const authSlice = createSlice({
    name: 'auth',
    initialState:{
    loading: false,
    token: null,
    error:null,
    loggedIn: false,
    },
    reducers: {
        setAuthLoading: (state,action) => {
            state.loading = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
            state.loggedIn = !!action.payload;
        },
        setAuthError: (state, action) => {
            state.error = action.payload;
          },
          logout: (state) => {
            state.loading = false;
            state.token = null;
            state.loggedIn = false;
            state.error = null;
            AsyncStorage.removeItem('token');
            AsyncStorage.setItem('isLoggedIn', 'false');
          },
        },
      });
      
      export const { setAuthLoading, setToken, setAuthError, logout } = authSlice.actions;
      
      // for login email & password
       
      export const loginUserAPI = ({ email, password }) => async (dispatch) => {
        try {
            dispatch(setAuthLoading(true));
            dispatch(setAuthError(null));
        
            const response = await axios.post(`${API_BASE_URL}/newlogin`, {
                email,
                password,
            });

            console.log('Login response:', response.data);

            const token = response.data?.token;

            if (token) {
                // token store
                console.log('Token received:',token);
                await AsyncStorage.setItem('token',token);
                await AsyncStorage.setItem('isLoggedIn', 'true');

                dispatch(setToken(token));
            } else {
                console.error('Login error:', error.response?.data || error.message);
                dispatch(setAuthError('Token not received'));
            }
        } catch (error) {
            const errMsg = 
            error.response?.data?.error || error.message || 'Login failed, please try again' ;
            dispatch(setAuthError(errMsg));
        } finally {
            dispatch(setAuthLoading(false));

        }
        };

        // token
         export const loadTokenFromStorage =() => async (dispatch) => {
            try {
                const storedToken = await AsyncStorage.getItem('token');
                if (storedToken) {
                    dispatch(setToken(storedToken));
                }
            } catch (err) {
                console.log('Error loading token from storage:',err);
            }
         };

         export default authSlice.reducer;
