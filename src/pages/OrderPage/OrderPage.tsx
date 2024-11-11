import { useParams } from 'react-router-dom';
import AppLayout from '@/app/AppLayout';
import { RootState, useSelector } from '@/app/store/store';
import OrderForm from '@/features/orderFeature/OrderForm';

const OrderPage = () => {
  const { id } = useParams();
  const certificate = useSelector(
    (state: RootState) => state.certificateSlice.certificates,
  ).find((item) => item.ID === id);

  return (
    <AppLayout>
      <h2>Страница покупки {certificate?.NAME}</h2>
      <OrderForm certificateInfo={certificate || null} />
    </AppLayout>
  );
};

export default OrderPage;
