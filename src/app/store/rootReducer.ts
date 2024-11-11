import { combineReducers } from '@reduxjs/toolkit';
import certificateSlice from '@/features/certificateListFeature/CertificateListSlice';
import orderSlice from '@/features/orderFeature/OrderSlice';

const rootReducer = combineReducers({
  [certificateSlice.name]: certificateSlice.reducer,
  [orderSlice.name]: orderSlice.reducer,
});

export default rootReducer;
