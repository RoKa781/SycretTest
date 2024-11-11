import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '@/config/axiosConfig';
import { OrderData } from '@/types';

interface OrderState {
  name?: string;
  phone?: string;
  email?: string;
  errors: { [key: string]: string | undefined };
  loading: boolean;
  success: boolean;
  errorMessage?: string;
}

const initialState: OrderState = {
  name: '',
  phone: '',
  email: '',
  errors: {},
  loading: false,
  success: false,
  errorMessage: '',
};

export const submitOrder = createAsyncThunk(
  'order/submitOrder',
  async (orderData: OrderData) => {
    const response = await axiosInstance.post('/service/api/api', {
      MethodName: 'OSSale',
      Id: orderData.certificateInfo?.ID,
      TableName: orderData.certificateInfo?.TABLENAME,
      PrimaryKey: orderData.certificateInfo?.PRIMARYKEY,
      Price: orderData.certificateInfo?.PRICE,
      Summa: orderData.certificateInfo?.SUMMA,
      ClientName: orderData.name,
      Phone: orderData.phone?.replace(/\D/g, '').slice(1, 11),
      Email: orderData.email,
      PaymentTypeId: orderData.PaymentTypeId,
      UseDelivery: orderData.UseDelivery,
      IsGift: orderData.IsGift,
      MsgText: orderData.MsgText,
      PName: orderData.PName,
      PPhone: orderData.PPhone,
    });
    return response.data;
  },
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setFieldValue: (
      state,
      action: PayloadAction<{
        field: keyof Omit<OrderState, 'errors'>;
        value: string;
      }>,
    ) => {
      const { field, value } = action.payload;
      (state[field] as string) = value;
    },
    setFieldError: (
      state,
      action: PayloadAction<{ field: string; error: string }>,
    ) => {
      const { field, error } = action.payload;
      state.errors[field] = error;
    },
    clearErrors: (state) => {
      state.errors = {};
    },
    clearSuccess: (state) => {
      state.success = false;
      state.errorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitOrder.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.errorMessage = '';
      })
      .addCase(submitOrder.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitOrder.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.errorMessage = action.error.message || 'Что-то пошло не так';
      });
  },
});

export const { setFieldValue, setFieldError, clearErrors, clearSuccess } =
  orderSlice.actions;

export default orderSlice;
