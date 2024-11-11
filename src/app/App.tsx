import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { fetchCertificate } from '@/features/certificateListFeature/CertificateListSlice';
import MainPage from '@/pages/MainPage/MainPage';
import OrderPage from '@/pages/OrderPage/OrderPage';
import PaymentPage from '@/pages/PaymentPage/PaymentPage';
import './App.css';
import { useDispatch } from './store/store';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCertificate());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/order/:id" element={<OrderPage />} />
      <Route path="/payment" element={<PaymentPage />} />
    </Routes>
  );
}

export default App;
