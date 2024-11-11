import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '@/config/axiosConfig';
import { CertificateData } from '@/types';

type CertificateState = {
  certificates: CertificateData[];
  loading: boolean;
  error: string | null;
};

const initialState: CertificateState = {
  certificates: [],
  loading: false,
  error: null,
};

export const fetchCertificate = createAsyncThunk(
  'goods/fetchCertificate',
  async () => {
    const response = await axiosInstance.post('/service/api/api', {
      MethodName: 'OSGetGoodList',
    });
    return response.data;
  },
);

const certificateSlice = createSlice({
  name: 'certificateSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCertificate.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchCertificate.fulfilled,
        (state, action: PayloadAction<CertificateData[]>) => {
          state.loading = false;
          state.certificates = action.payload;
        },
      )
      .addCase(fetchCertificate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Что-то пошло не так';
      });
  },
});

export default certificateSlice;
